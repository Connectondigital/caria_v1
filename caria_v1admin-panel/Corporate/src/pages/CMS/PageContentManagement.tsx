import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, Modal, ModalHeader, ModalBody, Label, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import axios from 'axios';
import config from '../../config';
import classnames from 'classnames';

const contentSections = [
    { key: 'hakkimizda_metni', label: 'Hakkımızda', section: 'About' },
    { key: 'vizyonumuz_metni', label: 'Vizyonumuz', section: 'Vision' },
    { key: 'misyonumuz_metni', label: 'Misyonumuz', section: 'Mission' },
    { key: 'hizmetler_ust_metin', label: 'Hizmetler (Üst Metin)', section: 'Services' },
];

const WebsiteSettings = () => {
    const [allContent, setAllContent] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState(contentSections[0].key);
    const [currentContent, setCurrentContent] = useState<any>({
        content_key: '',
        value_tr: '',
        section: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [previewModal, setPreviewModal] = useState(false);

    const togglePreview = () => setPreviewModal(!previewModal);

    const { quill, quillRef } = useQuill();

    const fetchAllContent = async () => {
        try {
            console.log("Fetching content from:", `${config.api.API_URL}/cms/content`);
            const response = await axios.get(`${config.api.API_URL}/cms/content`);
            const data = (response as any) || []; // Axios interceptor unwraps response.data
            console.log("CMS Content Fetched:", data);
            setAllContent(data);

            const active = data.find((item: any) => item.content_key === activeTab);
            console.log("Initial Active Content:", active);
            if (active) {
                setCurrentContent(active);
            } else {
                const sectionDef = contentSections.find(s => s.key === activeTab);
                setCurrentContent({
                    content_key: activeTab,
                    value_tr: `<p>${sectionDef?.label} içeriği buraya gelecek...</p>`,
                    section: sectionDef?.section
                });
            }
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching content:", error);
            setIsLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchAllContent();
    }, []);

    // Effect for handling text changes in the editor
    useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setCurrentContent((prev: any) => ({ ...prev, value_tr: quill.root.innerHTML }));
            });
        }
    }, [quill]);

    // Update currentContent when activeTab or allContent changes
    useEffect(() => {
        if (allContent.length > 0) {
            const active = allContent.find((item: any) => item.content_key === activeTab);
            console.log("Tab Switch - ActiveTab:", activeTab, "Found:", active);
            if (active) {
                setCurrentContent(active);
            } else {
                const sectionDef = contentSections.find(s => s.key === activeTab);
                setCurrentContent({
                    content_key: activeTab,
                    value_tr: `<p>${sectionDef?.label} içeriği buraya gelecek...</p>`,
                    section: sectionDef?.section
                });
            }
        }
    }, [activeTab, allContent]);

    // Sync Quill editor with currentContent
    useEffect(() => {
        if (quill && currentContent.value_tr !== undefined) {
            if (quill.root.innerHTML !== currentContent.value_tr) {
                console.log("Syncing Quill with:", currentContent.content_key);
                quill.root.innerHTML = currentContent.value_tr;
            }
        }
    }, [quill, currentContent.value_tr]);

    const handleSave = async () => {
        try {
            await axios.post(`${config.api.API_URL}/cms/content`, currentContent);
            alert("Başarıyla kaydedildi!");
            // Refresh local list
            const index = allContent.findIndex(c => c.content_key === currentContent.content_key);
            if (index > -1) {
                const updated = [...allContent];
                updated[index] = currentContent;
                setAllContent(updated);
            } else {
                setAllContent([...allContent, currentContent]);
            }
        } catch (error) {
            console.error("Error updating content:", error);
            alert("Kaydedilemedi!");
        }
    };

    if (isLoading) return <div className="page-content">Yükleniyor...</div>;

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Web Sitesi Ayarları" pageTitle="Web Sitesi Yönetimi" />
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardHeader className="d-flex align-items-center">
                                    <h4 className="card-title mb-0 flex-grow-1">Statik Sayfa İçerikleri</h4>
                                    <div className="flex-shrink-0">
                                        <Button color="info" className="me-2" onClick={togglePreview}>
                                            <i className="ri-eye-line align-bottom me-1"></i> Önizleme
                                        </Button>
                                        <Button color="success" onClick={handleSave}>
                                            <i className="ri-save-line align-bottom me-1"></i> Kaydet
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Nav tabs className="nav-tabs-custom nav-success mb-3">
                                        {contentSections.map(section => (
                                            <NavItem key={section.key}>
                                                <NavLink
                                                    style={{ cursor: "pointer" }}
                                                    className={classnames({ active: activeTab === section.key })}
                                                    onClick={() => setActiveTab(section.key)}
                                                >
                                                    {section.label}
                                                </NavLink>
                                            </NavItem>
                                        ))}
                                    </Nav>

                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId={activeTab}>
                                            <div className="mb-3">
                                                <Label className="form-label">{contentSections.find(s => s.key === activeTab)?.label} İçeriği (Türkçe)</Label>
                                                <div style={{ width: '100%', height: 400 }}>
                                                    <div ref={quillRef} />
                                                </div>
                                            </div>
                                        </TabPane>
                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Modal isOpen={previewModal} toggle={togglePreview} size="lg">
                <ModalHeader toggle={togglePreview}>Web Sitesi Önizleme - {contentSections.find(s => s.key === activeTab)?.label}</ModalHeader>
                <ModalBody>
                    <div className="p-3 border rounded bg-light">
                        <h2 className="mb-4">{contentSections.find(s => s.key === activeTab)?.label}</h2>
                        <div dangerouslySetInnerHTML={{ __html: currentContent.value_tr }} />
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default WebsiteSettings;
