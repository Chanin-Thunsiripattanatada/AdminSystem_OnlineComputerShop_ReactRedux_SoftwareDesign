import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const EditModal = ({ show, handleClose, modaldata, onSave }) => {
    const [productData, setProductData] = useState({
        name: modaldata?.name || '',
        // กำหนดค่าเริ่มต้นของฟิลด์อื่นๆ ตามต้องการ
    });

    // ฟังก์ชันสำหรับจัดการการเปลี่ยนแปลงของฟิลด์ในฟอร์ม
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // ฟังก์ชันสำหรับจัดการการบันทึกข้อมูล
    const handleSave = () => {
        // ส่งข้อมูลที่อัปเดตไปยังฟังก์ชัน onSave
        onSave(productData);
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                        />
                    </div>
                    {/* เพิ่มฟิลด์อื่นๆ ตามที่ต้องการ */}
                </form>
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
