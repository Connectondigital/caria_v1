import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Input, Table } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import axios from 'axios';
import config from '../../config';

const AdvisorManagement = () => {
    const [advisors, setAdvisors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAdvisors = async () => {
        try {
            const response = await axios.get(`${config.api.API_URL}/advisors`);
            setAdvisors(response.data || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching advisors:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdvisors();
    }, []);

    const handleChange = (id: number, field: string, value: any) => {
        setAdvisors(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
    };

    const handleSave = async (advisor: any) => {
        try {
            await axios.post(`${config.api.API_URL}/advisors`, advisor);
            alert("Danışman başarıyla güncellendi!");
        } catch (error) {
            console.error("Error saving advisor:", error);
            alert("Kaydedilemedi!");
        }
    };

    if (loading) return <div className="page-content">Yükleniyor...</div>;

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Danışman Yönetimi" pageTitle="Web Sitesi Yönetimi" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader>
                                    <h4 className="card-title mb-0">Sistemdeki Danışmanlar</h4>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th>Ad Soyad</th>
                                                <th>Ünvan</th>
                                                <th>E-Posta</th>
                                                <th>Telefon</th>
                                                <th>İşlem</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {advisors.map((advisor) => (
                                                <tr key={advisor.id}>
                                                    <td>
                                                        <Input
                                                            type="text"
                                                            value={advisor.name || ""}
                                                            onChange={(e) => handleChange(advisor.id, 'name', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            type="text"
                                                            value={advisor.title || ""}
                                                            onChange={(e) => handleChange(advisor.id, 'title', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            type="email"
                                                            value={advisor.email || ""}
                                                            onChange={(e) => handleChange(advisor.id, 'email', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Input
                                                            type="text"
                                                            value={advisor.phone || ""}
                                                            onChange={(e) => handleChange(advisor.id, 'phone', e.target.value)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Button color="success" size="sm" onClick={() => handleSave(advisor)}>
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

export default AdvisorManagement;
