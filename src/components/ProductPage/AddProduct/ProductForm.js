import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { createProduct } from '../../../actions/products';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../auth/AuthContext';
const ProductForm = () => {
    const dispatch = useDispatch();
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        categoryId: '',
        description: '',
        manufacturer: '',
        price: '',
        rating: '',
        stockQuantity: '',
        warrantyPeriod: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        const productData = {
            name: formData.name,
            category: {
                categoryId: formData.categoryId
            },
            description: formData.description,
            manufacturer: formData.manufacturer,
            price: formData.price,
            rating: formData.rating,
            stockQuantity: formData.stockQuantity,
            warrantyPeriod: formData.warrantyPeriod,
            imageUrl: formData.imageUrl
        };
        dispatch(createProduct(token, productData));
        setFormData({
            name: '',
            categoryId: '',
            description: '',
            manufacturer: '',
            price: '',
            rating: '',
            stockQuantity: '',
            warrantyPeriod: ''
        });
    };

    return (
        <div className="card  shadow-lg bg-body rounded">
            <h4 className="card-header">เพิ่มรายการสินค้า</h4>
            <div className="card-body">
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formProductName">
                                <Form.Label>ชื่อสินค้า</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter product name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formCategory">
                                <Form.Label>ประเภทสินค้า</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter category"
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formDescription">
                                <Form.Label>รายละเอียด</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formImageUrl">
                                <Form.Label>รูปภาพ</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter image URL"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}

                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formManufacturer">
                                <Form.Label>ผู้ผลิต</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter manufacturer"
                                    name="manufacturer"
                                    value={formData.manufacturer}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group controlId="formPrice">
                                <Form.Label>ราคาสินค้า</Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="formStockQuantity">
                                <Form.Label>จำนวนสินค้าคงคลัง</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter stock quantity"
                                    name="stockQuantity"
                                    value={formData.stockQuantity}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col mb={4}>
                            <Form.Group controlId="formWarrantyPeriod">
                                <Form.Label>เวลารับประกัน (เดือน)</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter warranty period"
                                    name="warrantyPeriod"
                                    value={formData.warrantyPeriod}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <br />
                    <div className="d-flex justify-content-center">
                        <Button variant="secondary" type="reset" className="me-2">
                            Reset
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ProductForm;
