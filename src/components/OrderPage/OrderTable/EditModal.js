import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateOrder } from '../../../actions/orders';
import { useAuth } from '../../../auth/AuthContext';

const EditModal = ({ show, handleClose, modaldata }) => {
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
                                <option value="Pending Payment">รอชำระเงิน (Pending Payment)</option>
                                <option value="Paid">ชำระเงินแล้ว (Paid)</option>
                                <option value="Processing">กำลังดำเนินการ (Processing)</option>
                                <option value="Shipped">ส่งสินค้าแล้ว (Shipped)</option>
                                <option value="Completed">สำเร็จ (Completed)</option>
                                <option value="Cancelled">ยกเลิก (Cancelled)</option>
                                <option value="Refunded">คืนเงิน (Refunded)</option>
                                <option value="Failed">ล้มเหลว (Failed)</option>
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
                                <option value="Preparing Shipment">กำลังเตรียมสินค้า (Preparing Shipment)</option>
                                <option value="In Transit">กำลังจัดส่ง (In Transit)</option>
                                <option value="Out for Delivery">ถึงปลายทางแล้ว (Out for Delivery)</option>
                                <option value="Delivered">จัดส่งสำเร็จ (Delivered)</option>
                                <option value="Returned">ส่งคืนผู้ขาย (Returned)</option>
                                <option value="Undeliverable">ไม่สามารถจัดส่งได้ (Undeliverable)</option>
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
