import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Input, Label, Table } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import axios from 'axios';
import config from '../../config';

const HomepageManagement = () => {
    const [blocks, setBlocks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBlocks = async () => {
        try {
            const response = await axios.get(`${config.api.API_URL}/cms/homepage`);
            setBlocks(response.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching blocks:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlocks();
    }, []);

    const handleChange = (id: number, field: string, value: any) => {
        setBlocks(prev => prev.map(b => b.id === id ? { ...b, [field]: value } : b));
    };

    const handleSave = async (block: any) => {
        try {
            await axios.post(`${config.api.API_URL}/cms/homepage`, block);
            alert("Blok başarıyla güncellendi!");
        } catch (error) {
            console.error("Error saving block:", error);
            alert("Kaydedilemedi!");
        }
    };

    if (loading) return <div className="page-content">Yükleniyor...</div>;

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Anasayfa Blok Yönetimi" pageTitle="Web Sitesi Yönetimi" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Blok İçerikleri (Giriş, İstatistikler, Hizmetler)</h4>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Blok Adı</th>
                                                <th>Başlık (TR)</th>
                                                <th>Alt Başlık / Metin (TR)</th>
                                                <th>Sıra</th>
                                                <th>İşlem</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {blocks.map((block) => (
                                                <tr key={block.id}>
                                                    <td><strong>{(block.block_type || block.block_key || "").toUpperCase()}</strong></td>
                                                    <td>
                                                        <Input
                                                            type="text"
                                                            value={block.title || block.title_tr || ""}
                                                            onChange={(e) => handleChange(block.id, 'title', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            type="textarea"
                                                            value={block.content || block.content_tr || ""}
                                                            onChange={(e) => handleChange(block.id, 'content', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            type="number"
                                                            style={{ width: '70px' }}
                                                            value={block.display_order || 0}
                                                            onChange={(e) => handleChange(block.id, 'display_order', parseInt(e.target.value))}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Button color="success" size="sm" onClick={() => handleSave(block)}>
                                                            <i className="ri-save-line"></i>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default HomepageManagement;
