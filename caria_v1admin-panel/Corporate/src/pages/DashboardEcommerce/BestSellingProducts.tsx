import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { bestSellingProducts } from "../../common/data";

const BestSellingProducts = () => {
    return (
        <React.Fragment>
            <Col xl={6}>
                <Card>
                    <CardHeader className="align-items-center d-flex">
                        <h4 className="card-title mb-0 flex-grow-1">En Çok Satan Ürünler</h4>
                        <div className="flex-shrink-0">
                            <UncontrolledDropdown className="card-header-dropdown">
                                <DropdownToggle tag="a" className="text-reset" role="button">
                                    <span className="fw-semibold text-uppercase fs-12">Sırala: </span><span className="text-muted">Bugün<i className="mdi mdi-chevron-down ms-1"></i></span>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-end" end>
                                    <DropdownItem>Bugün</DropdownItem>
                                    <DropdownItem>Dün</DropdownItem>
                                    <DropdownItem>Son 7 Gün</DropdownItem>
                                    <DropdownItem>Son 30 Gün</DropdownItem>
                                    <DropdownItem>Bu Ay</DropdownItem>
                                    <DropdownItem>Geçen Ay</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </CardHeader>

                    <CardBody>
                        <div className="table-responsive table-card">
                            <table className="table table-hover table-centered align-middle table-nowrap mb-0">
                                <tbody>
                                    {(bestSellingProducts || []).map((item, key) => (
                                        <tr key={key}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-sm bg-light rounded p-1 me-2">
                                                        <img src={item.img} alt="" className="img-fluid d-block" />
                                                    </div>
                                                    <div>
                                                        <h5 className="fs-14 my-1"><Link to="/apps-ecommerce-product-details" className="text-reset">{item.label}</Link></h5>
                                                        <span className="text-muted">{item.date}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <h5 className="fs-14 my-1 fw-normal">${(item.price).toFixed(2)}</h5>
                                                <span className="text-muted">Fiyat</span>
                                            </td>
                                            <td>
                                                <h5 className="fs-14 my-1 fw-normal">{item.orders}</h5>
                                                <span className="text-muted">Siparişler</span>
                                            </td>
                                            <td>
                                                <h5 className="fs-14 my-1 fw-normal">{item.stock ? item.stock : <span className="badge bg-danger-subtle text-danger">Stokta yok</span>} </h5>
                                                <span className="text-muted">Stok</span>
                                            </td>
                                            <td>
                                                <h5 className="fs-14 my-1 fw-normal">${item.amount}</h5>
                                                <span className="text-muted">Tutar</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="align-items-center mt-4 pt-2 justify-content-between row text-center text-sm-start">
                            <div className="col-sm">
                                <div className="text-muted"><span className="fw-semibold">5</span> / <span className="fw-semibold">25</span> Sonuç Gösteriliyor
                                </div>
                            </div>
                            <div className="col-sm-auto mt-3 mt-sm-0">
                                <ul className="pagination pagination-separated pagination-sm mb-0 justify-content-center">
                                    <li className="page-item disabled">
                                        <Link to="#" className="page-link">←</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link to="#" className="page-link">1</Link>
                                    </li>
                                    <li className="page-item active">
                                        <Link to="#" className="page-link">2</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link to="#" className="page-link">3</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link to="#" className="page-link">→</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default BestSellingProducts;
