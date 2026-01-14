import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Label, Input, Form, FormGroup, Table, Spinner } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import axios from 'axios';
import config from '../../config';

const SEOSettings = () => {
    const [seoData, setSeoData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<any>({});

    const fetchSeoData = async () => {
        try {
            const response = await axios.get(`${config.api.API_URL}/cms/seo`);
            setSeoData(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching SEO data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSeoData();
    }, []);

    const handleEdit = (item: any) => {
        setEditingId(item.id);
        setEditForm(item);
    };

    const handleSave = async () => {
        try {
            await axios.post(`${config.api.API_URL}/cms/seo`, editForm);
            setEditingId(null);
            fetchSeoData();
            alert("Başarıyla güncellendi!");
        } catch (error) {
            console.error("Error saving SEO data:", error);
            alert("Kaydedilemedi!");
        }
    };

    if (loading) return <div className="page-content text-center"><Spinner /></div>;

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="SEO Ayarları" pageTitle="Web Sitesi Yönetimi" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Sayfa Bazlı SEO Yönetimi</h4>
                                </CardHeader>
                                <CardBody>
                                    <div className="table-responsive">
                                        <Table className="align-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Sayfa</th>
                                                    <th>Meta Title (TR)</th>
                                                    <th>Meta Description (TR)</th>
                                                    <th>İşlem</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(!seoData || seoData.length === 0) && (
                                                    <tr>
                                                        <td colSpan={4} className="text-center text-muted">Henüz kayıt bulunamadı.</td>
                                                    </tr>
                                                )}
                                                {(seoData || []).map((item: any) => (
                                                    <tr key={item.id}>
                                                        {editingId === item.id ? (
                                                            <>
                                                                <td><strong>{item.page_name}</strong></td>
                                                                <td>
                                                                    <Input
                                                                        type="text"
                                                                        value={editForm.title_tr}
                                                                        onChange={(e) => setEditForm({ ...editForm, title_tr: e.target.value })}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Input
                                                                        type="textarea"
                                                                        rows={2}
                                                                        value={editForm.description_tr}
                                                                        onChange={(e) => setEditForm({ ...editForm, description_tr: e.target.value })}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Button color="success" size="sm" className="me-2" onClick={handleSave}>Kaydet</Button>
                                                                    <Button color="secondary" size="sm" onClick={() => setEditingId(null)}>İptal</Button>
                                                                </td>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <td>{item.page_name}</td>
                                                                <td>{item.title_tr}</td>
                                                                <td>{item.description_tr && item.description_tr.length > 50 ? item.description_tr.substring(0, 50) + "..." : item.description_tr}</td>
                                                                <td>
                                                                    <Button color="primary" size="sm" onClick={() => handleEdit(item)}>Düzenle</Button>
                                                                </td>
                                                            </>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>

                                    <div className="mt-4 p-3 bg-light rounded">
                                        <h5>Hızlı Ekle (Yeni Sayfa)</h5>
                                        <Row className="g-3">
                                            <Col md={3}>
                                                <Input
                                                    placeholder="Sayfa Adı (örn: anasayfa)"
                                                    onChange={(e) => setEditForm({ ...editForm, page_name: e.target.value, id: undefined })}
                                                />
                                            </Col>
                                            <Col md={3}>
                                                <Input
                                                    placeholder="Meta Title"
                                                    onChange={(e) => setEditForm({ ...editForm, title_tr: e.target.value })}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Input
                                                    placeholder="Meta Description"
                                                    onChange={(e) => setEditForm({ ...editForm, description_tr: e.target.value })}
                                                />
                                            </Col>
                                            <Col md={2}>
                                                <Button color="success" className="w-100" onClick={handleSave}>Ekle</Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default SEOSettings;
