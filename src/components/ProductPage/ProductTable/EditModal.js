import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../auth/AuthContext';
import { updateProduct } from '../../../actions/products';
const EditModal = ({ show, handleClose, modaldata ,refreshProducts}) => {
    const dispatch = useDispatch();
    const { token } = useAuth();
    const [productId, setProductId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        categoryId: '',
        description: '',
        imageUrl: '',
        manufacturer: '',
        price: '',
        rating: '',
        stockQuantity: '',
        warrantyPeriod: ''
    });

    useEffect(() => {
        if (modaldata) {
            setFormData({
                name: modaldata.name || '',
                categoryId: modaldata.category.categoryId || '',
                description: modaldata.description || '',
                imageUrl: modaldata.imageUrl || '',
                manufacturer: modaldata.manufacturer || '',
                price: modaldata.price || '',
                rating: modaldata.rating || '',
                stockQuantity: modaldata.stockQuantity || '',
                warrantyPeriod: modaldata.warrantyPeriod || ''
            });
            setProductId(modaldata.productId);
        }
    }, [modaldata]);

    const handleResetForm = () => {
        setFormData({
            name: modaldata.name || '',
            categoryId: modaldata.category.categoryId || '',
            description: modaldata.description || '',
            imageUrl: modaldata.imageUrl || '',
            manufacturer: modaldata.manufacturer || '',
            price: modaldata.price || '',
            rating: modaldata.rating || '',
            stockQuantity: modaldata.stockQuantity || '',
            warrantyPeriod: modaldata.warrantyPeriod || ''
        });
    }
    // ฟังก์ชันสำหรับจัดการการบันทึกข้อมูล
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        try {
            await dispatch(updateProduct(token, productId, productData));
            refreshProducts(); // Refresh the table data
            handleClose(); // Close the modal
        } catch (error) {
            console.error("Failed to update product:", error);
        }

    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                                    name="category"
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
                        <Button variant="secondary" className="me-2" onClick={handleResetForm}>
                            Reset
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;
