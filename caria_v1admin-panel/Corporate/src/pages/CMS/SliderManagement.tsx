import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import axios from 'axios';

const SliderManagement = () => {
    const [sliders, setSliders] = useState<any[]>([]);
    const [modal, setModal] = useState(false);
    const [newSlider, setNewSlider] = useState({ title: '', image_url: '', link: '#', display_order: 0 });

    const toggle = () => setModal(!modal);

    const fetchSliders = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5001/api/cms/sliders');
            setSliders(response.data);
        } catch (error) {
            console.error("Error fetching sliders:", error);
        }
    };

    useEffect(() => {
        fetchSliders();
    }, []);

    const handleAddSlider = async () => {
        try {
            await axios.post('http://127.0.0.1:5001/api/cms/sliders', newSlider);
            toggle();
            fetchSliders();
        } catch (error) {
            console.error("Error adding slider:", error);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Slider Yönetimi" pageTitle="Web Sitesi Yönetimi" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">Slider Listesi</h4>
                                    <div className="flex-shrink-0">
                                        <Button color="success" onClick={toggle}>Yeni Slider Ekle</Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className="table-responsive">
                                        <Table className="table-striped table-nowrap align-middle mb-0">
                                            <thead>
                                                <tr>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Görsel</th>
                                                    <th scope="col">Başlık</th>
                                                    <th scope="col">Sıra</th>
                                                    <th scope="col">Durum</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {(sliders || []).map((slider: any) => (
                                                    <tr key={slider.id}>
                                                        <td>{slider.id}</td>
                                                        <td><img src={slider.image_url} alt="" height="50" className="rounded" /></td>
                                                        <td>{slider.title}</td>
                                                        <td>{slider.display_order}</td>
                                                        <td>{slider.active ? 'Aktif' : 'Pasif'}</td>
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

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Yeni Slider Ekle</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Başlık</Label>
                            <Input type="text" name="title" id="title" placeholder="Slider başlığı" onChange={(e) => setNewSlider({ ...newSlider, title: e.target.value })} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="image_url">Görsel URL</Label>
                            <Input type="text" name="image_url" id="image_url" placeholder="Görsel linki" onChange={(e) => setNewSlider({ ...newSlider, image_url: e.target.value })} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="display_order">Sıra</Label>
                            <Input type="number" name="display_order" id="display_order" defaultValue="0" onChange={(e: any) => setNewSlider({ ...newSlider, display_order: parseInt(e.target.value) })} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleAddSlider}>Kaydet</Button>
                    <Button color="secondary" onClick={toggle}>İptal</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
};

export default SliderManagement;
