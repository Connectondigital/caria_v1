import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Modal, ModalHeader, ModalBody, Label, Input, Form, FormGroup, Table } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from 'axios';
import config from '../../config';

const CountryGuideManagement = () => {
    const [guides, setGuides] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [currentGuide, setCurrentGuide] = useState<any>({
        country_name_tr: '',
        country_name_en: '',
        content_tr: '',
        content_en: '',
        image_url: '',
        slug: ''
    });

    const toggle = () => setModal(!modal);

    const fetchGuides = async () => {
        try {
            const response = await axios.get(`${config.api.API_URL}/cms/country-guides`);
            setGuides(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching guides:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuides();
    }, []);

    const handleEdit = (guide: any) => {
        setCurrentGuide(guide);
        setModal(true);
    };

    const handleAddNew = () => {
        setCurrentGuide({
            country_name_tr: '',
            country_name_en: '',
            content_tr: '',
            content_en: '',
            image_url: '',
            slug: ''
        });
        setModal(true);
    };

    const handleSave = async () => {
        try {
            await axios.post(`${config.api.API_URL}/cms/country-guides`, currentGuide);
            setModal(false);
            fetchGuides();
            alert("Başarıyla kaydedildi!");
        } catch (error) {
            console.error("Error saving guide:", error);
            alert("Kaydedilemedi!");
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Ülke Rehberleri" pageTitle="Web Sitesi Yönetimi" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="d-flex align-items-center">
                                    <h4 className="card-title mb-0 flex-grow-1">Bölge ve Ülke Rehberleri</h4>
                                    <div className="flex-shrink-0">
                                        <Button color="success" onClick={handleAddNew}>
                                            <i className="ri-add-line align-bottom me-1"></i> Yeni Ekle
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className="table-responsive">
                                        <Table className="align-middle table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Ülke/Bölge (TR)</th>
                                                    <th>Slug</th>
                                                    <th>Son Güncelleme</th>
                                                    <th>İşlemler</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(guides || []).map((guide: any) => (
                                                    <tr key={guide.id}>
                                                        <td>{guide.country_name_tr}</td>
                                                        <td>{guide.slug}</td>
                                                        <td>{guide.updated_at ? new Date(guide.updated_at).toLocaleDateString() : 'N/A'}</td>
                                                        <td>
                                                            <Button color="primary" size="sm" onClick={() => handleEdit(guide)}>
                                                                Düzenle
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Modal isOpen={modal} toggle={toggle} size="xl">
                <ModalHeader toggle={toggle}>Rehber Düzenle / Ekle</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Ülke/Bölge Adı (Türkçe)</Label>
                                    <Input
                                        type="text"
                                        value={currentGuide.country_name_tr}
                                        onChange={(e) => setCurrentGuide({ ...currentGuide, country_name_tr: e.target.value })}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Slug (Link)</Label>
                                    <Input
                                        type="text"
                                        value={currentGuide.slug}
                                        onChange={(e) => setCurrentGuide({ ...currentGuide, slug: e.target.value })}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label>Görsel URL</Label>
                                    <Input
                                        type="text"
                                        value={currentGuide.image_url}
                                        onChange={(e) => setCurrentGuide({ ...currentGuide, image_url: e.target.value })}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="mb-4">
                                <Label>İçerik (Türkçe) - Profesyonel Editör</Label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={currentGuide.content_tr}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        setCurrentGuide({ ...currentGuide, content_tr: data });
                                    }}
                                />
                            </Col>
                        </Row>
                        <div className="text-end">
                            <Button color="secondary" className="me-2" onClick={toggle}>İptal</Button>
                            <Button color="primary" onClick={handleSave}>Kaydet</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default CountryGuideManagement;
