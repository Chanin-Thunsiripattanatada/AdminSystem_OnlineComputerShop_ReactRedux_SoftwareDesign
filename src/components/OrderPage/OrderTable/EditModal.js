import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateOrder } from '../../../actions/orders';
import { useAuth } from '../../../auth/AuthContext';

const EditModal = ({ show, handleClose, modaldata }) => {
    const dispatch = useDispatch();
    const { token } = useAuth();

    const [formData, setFormData] = useState({
        status: '',
        shippingStatus: '',
        adminNote: '',
    });

    useEffect(() => {
        if (modaldata) {
            setFormData({
                status: modaldata.status || '',
                shippingStatus: modaldata.shippingStatus || '',
                adminNote: modaldata.adminNote || '',
            });
        }
    }, [modaldata]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const updatedData = {
            ...modaldata,
            ...formData,
            // Ensure other properties remain unchanged if necessary
        };

        try {
            const response = dispatch(updateOrder(token, modaldata.orderId, updatedData));
            console.log(response.data)
            handleClose();
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {modaldata?.privateImage?.id && (
                        <center>
                            <img
                                src={`http://localhost:8080/api/privateimage/${modaldata.privateImage.id}`}
                                className='img-fluid mt-2'
                                alt="Preview"
                            />
                        </center>
                    )}
                    <Form.Group as={Row} controlId="formOrderStatus">
                        <Form.Label column sm={3}>สถานะการสั่งซื้อ</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                as="select"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="รอการยืนยัน">รอการยืนยัน</option>
                                <option value="กำลังตรวจสอบ">กำลังตรวจสอบ</option>
                                <option value="ชำระเงินแล้ว">ชำระเงินแล้ว</option>
                                <option value="ยกเลิกการสั่งซื้อ">ยกเลิกการสั่งซื้อ</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formShippingStatus">
                        <Form.Label column sm={3}>สถานะการขนส่ง</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                as="select"
                                name="shippingStatus"
                                value={formData.shippingStatus}
                                onChange={handleChange}
                            >
                                <option value="ยังไม่จัดส่ง">ยังไม่จัดส่ง</option>
                                <option value="ส่งสินค้าแล้ว">ส่งสินค้าแล้ว</option>
                                <option value="จัดส่งถึงที่แล้ว">จัดส่งถึงที่แล้ว</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formAdminNote">
                        <Form.Label column sm={3}>โน็ตแอดมิน</Form.Label>
                        <Col md={6} pd={2}>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="adminNote"
                                value={formData.adminNote}
                                onChange={handleChange}
                                placeholder="Enter adminNote status"
                            />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditModal;
