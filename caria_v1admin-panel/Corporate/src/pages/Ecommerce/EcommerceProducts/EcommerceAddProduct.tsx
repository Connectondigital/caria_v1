import React, { useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Input,
  Label,
  FormFeedback,
  Form,
} from "reactstrap";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Redux
import { useDispatch } from "react-redux";
import { addNewProduct as onAddNewProduct } from "../../../slices/thunks";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import classnames from "classnames";
import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";

//formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Import React FilePond
import { registerPlugin } from "react-filepond";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EcommerceAddProduct = (props: any) => {
  document.title = "İlan Oluştur | Caria Estates - Yönetim Paneli";

  const history = useNavigate();
  const dispatch: any = useDispatch();

  const [customActiveTab, setcustomActiveTab] = useState<any>("1");
  const toggleCustom = (tab: any) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  const [selectedFiles, setselectedFiles] = useState<any>([]);
  const [selectedVisibility, setselectedVisibility] = useState<any>(null);


  function handleAcceptedFiles(files: any) {
    files.map((file: any) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setselectedFiles(files);
  }


  function handleSelectVisibility(selectedVisibility: any) {
    setselectedVisibility(selectedVisibility);
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const productCategory = [
    {
      options: [
        { label: "Konut", value: "Konut" },
        { label: "Ticari", value: "Ticari" },
        { label: "Arsa", value: "Arsa" },
        { label: "Yeni Projeler", value: "Yeni Projeler" },
      ],
    },
  ];

  const dateFormat = () => {
    let d = new Date(),
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let h = (d.getHours() % 12) || 12;
    let ampm = d.getHours() < 12 ? "AM" : "PM";
    return ((d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear() + ", " + h + ":" + d.getMinutes() + " " + ampm).toString());
  };

  const [date, setDate] = useState<any>(dateFormat());

  const dateformate = (e: any) => {
    const dateString = e.toString().split(" ");
    let time = dateString[4];
    let H = +time.substr(0, 2);
    let h: any = (H % 12) || 12;
    h = (h <= 9) ? h = ("0" + h) : h;
    let ampm = H < 12 ? "AM" : "PM";
    time = h + time.substr(2, 3) + " " + ampm;

    const date = dateString[2] + " " + dateString[1] + ", " + dateString[3];
    const orderDate = (date + ", " + time).toString();
    setDate(orderDate);
  };

  const productStatus = [
    {
      options: [
        { label: "Taslak", value: "draft" },
        { label: "Yayınlandı", value: "published" },
        { label: "Planlandı", value: "scheduled" },
      ],
    },
  ];

  const productVisibility = [
    {
      options: [
        { label: "Gizli", value: "Hidden" },
        { label: "Açık", value: "Public" },
      ],
    },
  ];

  // image
  const [selectedImage, setSelectedImage] = useState<any>();

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      validation.setFieldValue('image', e.target.result);
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      price: "",
      stock: "",
      orders: "",
      category: "",
      publishedDate: "",
      status: "",
      rating: 4.5,
      manufacturer_name: "",
      manufacturer_brand: "",
      product_discount: "",
      product_tags: "",
      image: "",
      kocan_tipi: "",
      kapali_alan: "",
      arsa_alani: "",
      oda_sayisi: "",
      banyo_sayisi: "",
      bolge: "",
      ozellikler_ic: [],
      ozellikler_dis: [],
      pdf_brosur: "",
      danisman_id: "",
      lat: "35.126",
      lng: "33.938"
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Product Title"),
      price: Yup.string().required("Please Enter a Product Price"),
      stock: Yup.string().required("Please Enter a Product stock"),
      orders: Yup.string().required("Please Enter a Product orders"),
      category: Yup.string().required("Please Enter a Product category"),
      // status: Yup.string().required("Please Enter a Product status"),
      manufacturer_name: Yup.string().required("Please Enter a Manufacturer Name"),
      manufacturer_brand: Yup.string().required("Please Enter a Manufacturer Brand"),
      product_discount: Yup.string().required("Please Enter a Product Discount"),
      product_tags: Yup.string().required("Please Enter a Product Tags"),
      image: Yup.string().required("Please add an image")
    }),
    onSubmit: (values) => {
      const newProduct = {
        id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        name: values.name,
        price: values.price,
        stock: values.stock,
        orders: values.orders,
        category: values.category,
        publishedDate: date,
        status: values.status,
        rating: 4.5,
        image: selectedImage
      };
      // save new product
      dispatch(onAddNewProduct(newProduct));
      history("/apps-ecommerce-products");
      validation.resetForm();
    }
  });
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="İlan Oluştur" pageTitle="Gayrimenkul Yönetimi" />

        <Row>
          <Col lg={8}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}>
              <Card>
                <CardBody>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      İlan Başlığı
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="İlan başlığını giriniz"
                      name="name"
                      value={validation.values.name || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={validation.errors.name && validation.touched.name ? true : false}
                    />
                    {validation.errors.name && validation.touched.name ? (
                      <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                    ) : null}
                  </div>
                  <div>
                    <Label>İlan Açıklaması</Label>

                    <CKEditor
                      editor={ClassicEditor as any}
                      data="<p>
                      Tommy Hilfiger men striped pink sweatshirt. Crafted with
                      cotton. Material composition is 100% organic cotton.
                      This is one of the world’s leading designer lifestyle
                      brands and is internationally recognized for celebrating
                      the essence of classic American cool style, featuring
                      preppy with a twist designs.
                    </p>
                    <ul>
                      <li>Full Sleeve</li>
                      <li>Cotton</li>
                      <li>All Sizes available</li>
                      <li>4 Different Color</li>
                    </ul>"
                      onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                      }}
                    />
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">İlan Galerisi</h5>
                </CardHeader>
                <CardBody>
                  <div className="mb-4">
                    <h5 className="fs-14 mb-1">İlan Resmi</h5>
                    <p className="text-muted">İlanın ana resmini ekleyin.</p>
                    <div className="text-center">
                      <div className="position-relative d-inline-block">
                        <div className="position-absolute top-100 start-100 translate-middle">
                          <Label htmlFor="customer-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Select Image">
                            <div className="avatar-xs cursor-pointer">
                              <div className="avatar-title bg-light border rounded-circle text-muted">
                                <i className="ri-image-fill"></i>
                              </div>
                            </div>
                          </Label>
                          <Input className="form-control d-none" id="customer-image-input" type="file" accept="image/png, image/gif, image/jpeg" onChange={handleImageChange}
                            invalid={
                              validation.touched.image && validation.errors.image ? true : false
                            }
                          />
                        </div>
                        <div className="avatar-lg">
                          <div className="avatar-title bg-light rounded">
                            <img src={selectedImage} id="product-img" alt="" className="avatar-md h-auto" />
                          </div>
                        </div>
                      </div>
                      {validation.errors.image && validation.touched.image ? (
                        <FormFeedback type="invalid"> {validation.errors.image} </FormFeedback>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <h5 className="fs-14 mb-1">İlan Galerisi</h5>
                    <p className="text-muted">İlan Galerisi Resimlerini Ekleyin.</p>

                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        handleAcceptedFiles(acceptedFiles);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone dz-clickable">
                          <div
                            className="dz-message needsclick"
                            {...getRootProps()}
                          >
                            <h5>Dosyaları buraya bırakın veya yüklemek için tıklayın.</h5>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    <div className="list-unstyled mb-0" id="file-previews">
                      {selectedFiles.map((f: any, i: any) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-custom card-header-tabs border-bottom-0">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: customActiveTab === "1",
                        })}
                        onClick={() => {
                          toggleCustom("1");
                        }}
                      >
                        Genel Bilgiler
                      </NavLink>
                    </NavItem>

                  </Nav>
                </CardHeader>

                <CardBody>
                  <TabContent activeTab={customActiveTab}>
                    <TabPane id="addproduct-general-info" tabId="1">
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="manufacturer-name-input"
                            >
                              İlan Sahibi / Firma
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              id="manufacturer-name-input"
                              name="manufacturer_name"
                              placeholder="İlan Sahibi / Firma adını giriniz"
                              value={validation.values.manufacturer_name || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              invalid={validation.errors.manufacturer_name && validation.touched.manufacturer_name ? true : false}
                            />
                            {validation.errors.manufacturer_name && validation.touched.manufacturer_name ? (
                              <FormFeedback type="invalid">Lütfen ilan sahibi/firma adını giriniz</FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="manufacturer-brand-input"
                            >
                              Marka / Şube
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              id="manufacturer-brand-input"
                              name="manufacturer_brand"
                              placeholder="Marka veya şube adını giriniz"
                              value={validation.values.manufacturer_brand || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              invalid={validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? true : false}
                            />
                            {validation.errors.manufacturer_brand && validation.touched.manufacturer_brand ? (
                              <FormFeedback type="invalid">Lütfen marka/şube adını giriniz</FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={3}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="product-stock-input"
                            >
                              Stok / Adet
                            </label>
                            <div className="input-group mb-3">
                              <Input
                                type="text"
                                className="form-control"
                                id="product-stock-input"
                                placeholder="Stok adedi"
                                name="stock"
                                value={validation.values.stock || ""}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                                invalid={validation.errors.stock && validation.touched.stock ? true : false}
                              />
                              {validation.errors.stock && validation.touched.stock ? (
                                <FormFeedback type="invalid">Lütfen stok adedi giriniz</FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>

                        <Col sm={3}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="product-price-input"
                            >
                              Fiyat
                            </label>
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="product-price-addon"
                              >
                                £
                              </span>
                              <Input
                                type="text"
                                className="form-control"
                                id="product-price-input"
                                placeholder="Enter price"
                                name="price"
                                aria-label="Price"
                                aria-describedby="product-price-addon"
                                value={validation.values.price || ""}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                                invalid={validation.errors.price && validation.touched.price ? true : false}
                              />
                              {validation.errors.price && validation.touched.price ? (
                                <FormFeedback type="invalid">{validation.errors.price}</FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>

                        <Col sm={3}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="product-Discount-input"
                            >
                              İndirim (%)
                            </label>
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="product-Discount-addon"
                              >
                                %
                              </span>
                              <Input
                                type="text"
                                className="form-control"
                                id="product-Discount-input"
                                placeholder="İndirim oranı"
                                name="product_discount"
                                value={validation.values.product_discount || ""}
                                onBlur={validation.handleBlur}
                                onChange={validation.handleChange}
                                invalid={validation.errors.product_discount && validation.touched.product_discount ? true : false}
                              />
                              {validation.errors.product_discount && validation.touched.product_discount ? (
                                <FormFeedback type="invalid">Lütfen indirim oranı giriniz</FormFeedback>
                              ) : null}
                            </div>
                          </div>
                        </Col>

                        <Col sm={3}>
                          <div className="mb-3">
                            <label
                              className="form-label"
                              htmlFor="product-orders-input"
                            >
                              Sıralama / Sipariş
                            </label>
                            <Input
                              type="text"
                              className="form-control"
                              id="product-orders-input"
                              placeholder="Sıralama numarası"
                              name="orders"
                              value={validation.values.orders || ""}
                              onBlur={validation.handleBlur}
                              onChange={validation.handleChange}
                              invalid={validation.errors.orders && validation.touched.orders ? true : false}
                            />
                            {validation.errors.orders && validation.touched.orders ? (
                              <FormFeedback type="invalid">Lütfen sıralama numarası giriniz</FormFeedback>
                            ) : null}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="kocan-tipi-input">Tapu Türü</Label>
                            <Input
                              type="select"
                              className="form-control"
                              id="kocan-tipi-input"
                              name="kocan_tipi"
                              value={validation.values.kocan_tipi || ""}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                            >
                              <option value="">Seçiniz</option>
                              <option value="Eşdeğer">Eşdeğer</option>
                              <option value="Türk Koçanı">Türk Koçanı</option>
                              <option value="Tahsis">Tahsis</option>
                            </Input>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="kapali-alan-input">Kapalı Alan (m2)</Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="kapali-alan-input"
                              name="kapali_alan"
                              placeholder="Örn: 120"
                              value={validation.values.kapali_alan || ""}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                            />
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="arsa-alani-input">Arsa Alanı (m2)</Label>
                            <Input
                              type="text"
                              className="form-control"
                              id="arsa-alani-input"
                              name="arsa_alani"
                              placeholder="Örn: 500"
                              value={validation.values.arsa_alani || ""}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="oda-sayisi-input">Oda Sayısı</Label>
                            <Input
                              type="select"
                              className="form-control"
                              id="oda-sayisi-input"
                              name="oda_sayisi"
                              value={validation.values.oda_sayisi || ""}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                            >
                              <option value="">Seçiniz</option>
                              {["1+0", "1+1", "2+1", "3+1", "4+1", "4+2", "5+1", "5+2", "6+1", "6+2"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </Input>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="banyo-sayisi-input">Banyo Sayısı</Label>
                            <Input
                              type="select"
                              className="form-control"
                              id="banyo-sayisi-input"
                              name="banyo_sayisi"
                              value={validation.values.banyo_sayisi || ""}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                            >
                              <option value="">Seçiniz</option>
                              {["1", "2", "3", "4", "5+"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </Input>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="bolge-input">Bölge</Label>
                            <Input
                              type="select"
                              className="form-control"
                              id="bolge-input"
                              name="bolge"
                              value={validation.values.bolge || ""}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                            >
                              <option value="">Seçiniz</option>
                              {["Girne", "İskele", "Gazimağusa", "Lefkoşa", "Esentepe", "Tatlısu"].map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </Input>
                          </div>
                        </Col>
                      </Row>

                      <hr />
                      <h5 className="fs-14 mb-3">Özellik Havuzu</h5>
                      <Row>
                        <Col lg={6}>
                          <Label className="form-label">Dış Özellikler</Label>
                          <div className="d-flex flex-wrap gap-3 mb-3">
                            {["Özel Havuz", "Ortak Havuz", "Deniz/Dağ Manzaralı", "Otopark", "Bahçeli"].map(feat => (
                              <div className="form-check" key={feat}>
                                <Input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`feat-ext-${feat}`}
                                  value={feat}
                                  onChange={(e: any) => {
                                    const { checked, value } = e.target;
                                    const currentFeats = [...validation.values.ozellikler_dis];
                                    if (checked) {
                                      validation.setFieldValue("ozellikler_dis", [...currentFeats, value]);
                                    } else {
                                      validation.setFieldValue("ozellikler_dis", currentFeats.filter(f => f !== value));
                                    }
                                  }}
                                />
                                <Label className="form-check-label" htmlFor={`feat-ext-${feat}`}>{feat}</Label>
                              </div>
                            ))}
                          </div>
                        </Col>
                        <Col lg={6}>
                          <Label className="form-label">İç Özellikler</Label>
                          <div className="d-flex flex-wrap gap-3 mb-3">
                            {["Akıllı Ev", "Yerden Isıtma", "Klima", "Ankastre", "Ebeveyn Banyosu"].map(feat => (
                              <div className="form-check" key={feat}>
                                <Input
                                  type="checkbox"
                                  className="form-check-input"
                                  id={`feat-int-${feat}`}
                                  value={feat}
                                  onChange={(e: any) => {
                                    const { checked, value } = e.target;
                                    const currentFeats = [...validation.values.ozellikler_ic];
                                    if (checked) {
                                      validation.setFieldValue("ozellikler_ic", [...currentFeats, value]);
                                    } else {
                                      validation.setFieldValue("ozellikler_ic", currentFeats.filter(f => f !== value));
                                    }
                                  }}
                                />
                                <Label className="form-check-label" htmlFor={`feat-int-${feat}`}>{feat}</Label>
                              </div>
                            ))}
                          </div>
                        </Col>
                      </Row>

                      <hr />
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="pdf-brosur-input">PDF Broşür</Label>
                            <Input
                              type="file"
                              className="form-control"
                              id="pdf-brosur-input"
                              accept="application/pdf"
                              onChange={(e: any) => {
                                // Handle file upload logic if needed, for now just setting a placeholder
                                validation.setFieldValue("pdf_brosur", e.target.files[0]?.name || "");
                              }}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="danisman-input">Danışman Ata</Label>
                            <Input
                              type="select"
                              className="form-control"
                              id="danisman-input"
                              name="danisman_id"
                              value={validation.values.danisman_id || ""}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                            >
                              <option value="">Danışman Seçiniz</option>
                              <option value="1">Admin User</option>
                              <option value="2">Ali Veli</option>
                              <option value="3">Ayşe Fatma</option>
                            </Input>
                          </div>
                        </Col>
                      </Row>

                      <hr />
                      <h5 className="fs-14 mb-3">Konum ve Harita (Canlı)</h5>
                      <Row>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">Enlem (Latitude)</Label>
                            <Input
                              type="text"
                              name="lat"
                              value={validation.values.lat || ""}
                              onChange={validation.handleChange}
                            />
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="mb-3">
                            <Label className="form-label">Boylam (Longitude)</Label>
                            <Input
                              type="text"
                              name="lng"
                              value={validation.values.lng || ""}
                              onChange={validation.handleChange}
                            />
                          </div>
                        </Col>
                      </Row>
                      <div className="mb-3" style={{ height: "300px", position: "relative" }}>
                        <LoadScript googleMapsApiKey="AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE">
                          <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '100%' }}
                            center={{ lat: parseFloat(validation.values.lat) || 35.126, lng: parseFloat(validation.values.lng) || 33.938 }}
                            zoom={13}
                          >
                            <Marker position={{ lat: parseFloat(validation.values.lat) || 35.126, lng: parseFloat(validation.values.lng) || 33.938 }} />
                          </GoogleMap>
                        </LoadScript>
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>

              <div className="text-end mb-3">
                <button type="submit" className="btn btn-success w-sm">
                  Kaydet
                </button>
              </div>
            </Form>
          </Col>

          <Col lg={4}>
            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Yayınla</h5>
              </CardHeader>
              <CardBody>
                <div className="mb-3">
                  <Label
                    htmlFor="choices-publish-status-input"
                    className="form-label"
                  >
                    Durum
                  </Label>
                  <Input
                    name="status"
                    type="select"
                    className="form-select"
                    id="choices-publish-status-input"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={
                      validation.values.status || ""
                    }
                  >
                    {productStatus.map((item, key) => (
                      <React.Fragment key={key}>
                        {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                      </React.Fragment>
                    ))}
                  </Input>
                  {validation.touched.status &&
                    validation.errors.status ? (
                    <FormFeedback type="invalid">
                      {validation.errors.status}
                    </FormFeedback>
                  ) : null}
                </div>

                <div>
                  <Label
                    htmlFor="choices-publish-visibility-input"
                    className="form-label"
                  >
                    Görünürlük
                  </Label>

                  <Select
                    value={selectedVisibility}
                    onChange={(selectedVisibility: any) => {
                      handleSelectVisibility(selectedVisibility);
                    }}
                    options={productVisibility}
                    name="choices-publish-visibility-input"
                    classNamePrefix="select2-selection form-select"
                  />
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Yayınlama Planı</h5>
              </CardHeader>

              <CardBody>
                <div>
                  <label
                    htmlFor="datepicker-publish-input"
                    className="form-label"
                  >
                    Yayın Tarihi ve Saati
                  </label>
                  <Flatpickr
                    name="publishedDate"
                    id="publishedDate-field"
                    className="form-control"
                    placeholder="Tarih seçiniz"
                    options={{
                      enableTime: true,
                      altInput: true,
                      altFormat: "d M, Y, G:i K",
                      dateFormat: "d M, Y, G:i K",
                    }}
                    onChange={(e: any) =>
                      dateformate(e)
                    }
                    value={validation.values.publishedDate || ""}
                  />
                  {validation.touched.publishedDate && validation.errors.publishedDate ? (
                    <FormFeedback type="invalid">{validation.errors.publishedDate}</FormFeedback>
                  ) : null}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">İlan Kategorileri</h5>
              </CardHeader>
              <CardBody>
                <p className="text-muted mb-2">
                  {" "}
                  <Link to="#" className="float-end text-decoration-underline">
                    Yeni Ekle
                  </Link>
                  İlan kategorisi seçin
                </p>



                <Input
                  name="category"
                  type="select"
                  className="form-select"
                  id="category-field"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={
                    validation.values.category || ""
                  }
                >
                  {productCategory.map((item, key) => (
                    <React.Fragment key={key}>
                      {item.options.map((item, key) => (<option value={item.value} key={key}>{item.label}</option>))}
                    </React.Fragment>
                  ))}
                </Input>
                {validation.touched.category &&
                  validation.errors.category ? (
                  <FormFeedback type="invalid">
                    {validation.errors.category}
                  </FormFeedback>
                ) : null}
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Product Tags</h5>
              </CardHeader>
              <CardBody>
                <div className="hstack gap-3 align-items-start">
                  <div className="flex-grow-1">
                    <Input
                      className="form-control"
                      placeholder="Enter tags"
                      type="text"
                      name="product_tags"
                      value={validation.values.product_tags || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={validation.errors.product_tags && validation.touched.product_tags ? true : false}
                    />
                    {validation.errors.product_tags && validation.touched.product_tags ? (
                      <FormFeedback type="invalid">{validation.errors.product_tags}</FormFeedback>
                    ) : null}
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="card-title mb-0">Product Short Description</h5>
              </CardHeader>
              <CardBody>
                <p className="text-muted mb-2">
                  Add short description for product
                </p>
                <textarea
                  className="form-control"
                  placeholder="Must enter minimum of a 100 characters"
                  rows={3}
                ></textarea>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container >
    </div >
  );
};

export default EcommerceAddProduct;
