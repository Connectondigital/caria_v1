import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Input, Table } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import axios from 'axios';
import config from '../../config';

const MenuManagement = () => {
    const [menus, setMenus] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMenus = async () => {
        try {
            const response = await axios.get(`${config.api.API_URL}/cms/menus`);
            setMenus(response.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching menus:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    const handleChange = (id: number, field: string, value: any) => {
        setMenus(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
    };

    const handleSave = async (menu: any) => {
        try {
            await axios.post(`${config.api.API_URL}/cms/menus`, menu);
            alert("Menü başarıyla güncellendi!");
        } catch (error) {
            console.error("Error saving menu:", error);
            alert("Kaydedilemedi!");
        }
    };

    if (loading) return <div className="page-content">Yükleniyor...</div>;

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Menü Yönetimi" pageTitle="Web Sitesi Yönetimi" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Üst Menü Yapısı</h4>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Başlık (TR)</th>
                                                <th>URL</th>
                                                <th>Sıra</th>
                                                <th>İşlem</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {menus.map((menu) => (
                                                <tr key={menu.id}>
                                                    <td>
                                                        <Input
                                                            type="text"
                                                            value={menu.title || ""}
                                                            onChange={(e) => handleChange(menu.id, 'title', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            type="text"
                                                            value={menu.url || ""}
                                                            onChange={(e) => handleChange(menu.id, 'url', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            type="number"
                                                            value={menu.display_order || 0}
                                                            onChange={(e) => handleChange(menu.id, 'display_order', parseInt(e.target.value))}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Button color="success" size="sm" onClick={() => handleSave(menu)}>
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

export default MenuManagement;
