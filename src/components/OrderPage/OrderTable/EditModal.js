import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateOrder } from '../../../actions/orders';
import { useAuth } from '../../../auth/AuthContext';
const EditModal = ({ show, handleClose, modaldata, refreshOrders }) => {
    // Initialize state with modaldata or default values
    const dispatch = useDispatch();
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        status: modaldata?.status || '',
        shippingStatus: modaldata?.shippingStatus || '',
        adminNote: modaldata?.adminNote || '',
    });
    useEffect(() => {
        if (modaldata) {
            setFormData({
                status: modaldata?.status || '',
                shippingStatus: modaldata?.shippingStatus || '',
                adminNote: modaldata?.adminNote || '',
            });
        }
    }, [modaldata]);
    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // Handle save button click
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const data = {
                customer: {
                    customerId: modaldata?.customer.customerId || ''
                },
                orderDate: modaldata?.orderDate || '',
                totalAmount: modaldata?.totalAmount || '',
                shippingStatus: formData.shippingStatus || '',
                status: formData.status || '',
                privateImage: modaldata?.privateImage?.id ? { id: modaldata.privateImage.id } : null,
                adminNote: formData.adminNote,
                orderItems: modaldata?.orderItems || []
            };
            console.log(data);
            await dispatch(updateOrder(token, modaldata.orderId, data));
            refreshOrders();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {modaldata?.privateImage && modaldata.privateImage.id ? (
                        <>
                            <center><img src={`http://localhost:8080/api/privateimage/${modaldata.privateImage.id}`} className='img-fluid mt-2' alt="Preview" /></center>
                        </>
                    ) : (<><center><h2>ยังไม่ยืนยัน</h2></center></>)
                    }
                    <Form.Group as={Row} controlId="formOrderStatus">
                        <Form.Label column sm={3}>สถานะการสั่งซื้อ</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                as="select"
                                name="status"
                                value={formData.status}  // กำหนดค่าเริ่มต้น
                                onChange={handleChange}  // ฟังก์ชันเมื่อมีการเปลี่ยนแปลง
                            >
                                <option value="pending-confirmation">รอการยืนยัน (pending-confirmation)</option>
                                <option value="under-review">กำลังตรวจสอบ (under-review)</option>
                                <option value="paid">ชำระเงินแล้ว (paid)</option>
                                <option value="order-cancelled">ยกเลิกการสั่งซื้อ (order-cancelled)</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formShippingStatus">
                        <Form.Label column sm={3}>สถานะการขนส่ง</Form.Label>
                        <Col sm={9}>
                            <Form.Control
                                as="select"
                                name="shippingStatus"
                                value={formData.shippingStatus}  // กำหนดค่าเริ่มต้น
                                onChange={handleChange}  // ฟังก์ชันเมื่อมีการเปลี่ยนแปลง
                            >
                                <option value="not-shipped">ยังไม่จัดส่ง (not-shipped)</option>
                                <option value="shipped">ส่งสินค้าแล้ว (shipped)</option>
                                <option value="delivered">จัดส่งถึงที่แล้ว (delivered)</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formAdminNote">
                        <Form.Label column sm={3}>โน็ตแอดมิน</Form.Label>
                        <Col md={6} pd={2}>
                            <Form.Control
                                as="textarea" rows={3}
                                name="adminNote"
                                value={formData.adminNote}
                                onChange={handleChange}
                                placeholder="Enter adminNote status"
                            />
                        </Col>
                    </Form.Group>
                    {/* Add more form fields as needed */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default EditModal;