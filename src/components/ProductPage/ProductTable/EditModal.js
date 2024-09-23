import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../auth/AuthContext';
import { updateProduct } from '../../../actions/products';
import { retrieveCategorys } from '../../../actions/categories';
// import { createImage, deleteImage } from '../../../actions/images';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const EditModal = ({ show, handleClose, modaldata, refreshProducts }) => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const { token } = useAuth();

    const [productId, setProductId] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        categoryId: '',
        description: '',
        manufacturer: '',
        price: '',
        rating: '',
        stockQuantity: '',
        warrantyPeriod: '',
    });

    const [file, setFile] = useState(null);
    const [fileupload, setFileupload] = useState(null);
    const [imageId, setImageId] = useState(null);

    useEffect(() => {
        dispatch(retrieveCategorys());
        if (modaldata) {
            setFormData({
                name: modaldata.name || '',
                categoryId: modaldata.category.categoryId || '',
                description: modaldata.description || '',
                manufacturer: modaldata.manufacturer || '',
                price: modaldata.price || '',
                rating: modaldata.rating || '',
                stockQuantity: modaldata.stockQuantity || '',
                warrantyPeriod: modaldata.warrantyPeriod || '',
            });
            setProductId(modaldata.productId);
            setImageId(modaldata.image?.id || null);
            console.log(imageId);
            setFile(null);
            setFileupload(null);
        }
    }, [modaldata]);

    const handleResetForm = () => {
        setFormData({
            name: modaldata.name || '',
            categoryId: modaldata.category.categoryId || '',
            description: modaldata.description || '',
            manufacturer: modaldata.manufacturer || '',
            price: modaldata.price || '',
            rating: modaldata.rating || '',
            stockQuantity: modaldata.stockQuantity || '',
            warrantyPeriod: modaldata.warrantyPeriod || '',
        });
        setFile(null);
        setFileupload(null);
        setImageId(modaldata.image?.id || null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleChangeImage = (e) => {
        e.preventDefault();
        if (e.target.files.length !== 0) {
            setFile(URL.createObjectURL(e.target.files[0]));
            setFileupload(e.target.files[0]);
        } else {
            setFile(null);
            setFileupload(null);
        }
    };

    const handleDeleteImage = async (e) => {
        e.preventDefault();
        setImageId(null);
        setFile(null);
        setFileupload(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create FormData object
        const formDataToSend = new FormData();

        // Append product JSON and image file
        formDataToSend.append('product', JSON.stringify({
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
        }));

        if (fileupload) {
            formDataToSend.append('imageFile', fileupload);
        } else if (imageId) {
            formDataToSend.append('image', JSON.stringify({ id: imageId }));
        }

        try {
            await dispatch(updateProduct(token, productId, formDataToSend));
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
                                    as="select"
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">--Select a category--</option>
                                    {categories.map(category => (
                                        <option key={category.categoryId} value={category.categoryId}>
                                            {category.categoryName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formDescription">
                                <Form.Label>รายละเอียด</Form.Label>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.description}
                                    onChange={(value) => setFormData(prevData => ({
                                        ...prevData,
                                        description: value
                                    }))}
                                    modules={editorModules}
                                    formats={editorFormats}
                                    placeholder="Enter description"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="fileinput">
                                <Form.Label>รูปหลัก</Form.Label>
                                {!imageId && (<>
                                    <Form.Control
                                        type="file"
                                        accept="image/jpeg, image/png, image/jpg"
                                        onChange={handleChangeImage}
                                        required
                                    />
                                    {file && <img src={file} className='img-fluid mt-2' alt="Preview" />}
                                </>)}
                                {imageId && (
                                    <>
                                        <img src={`http://localhost:8080/api/image/${imageId}`} className='img-fluid mt-2' alt="Preview" />
                                        <Button variant="danger" onClick={handleDeleteImage}>Delete</Button>
                                    </>
                                )
                                }
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
                        <Col md={4}>
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

// Optionally define the modules and formats for React Quill
const editorModules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
        [{ 'align': [] }],
        ['clean']
    ],
};

const editorFormats = [
    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline',
    'link', 'image', 'align', 'clean'
];

export default EditModal;
