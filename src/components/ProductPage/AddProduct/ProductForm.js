import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { createProduct } from '../../../actions/products';
import { retrieveCategorys } from '../../../actions/categories';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../../../auth/AuthContext';

const ProductForm = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const { token } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        categoryId: '',
        description: '',
        manufacturer: '',
        price: '',
        stockQuantity: '',
        warrantyPeriod: ''
    });

    const [file, setFile] = useState(null);
    const [fileupload, setFileupload] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
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

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create FormData object
        const formDataToSend = new FormData();
        // Append the product data as a JSON string
        formDataToSend.append('product', JSON.stringify({
            name: formData.name,
            category: {
                categoryId: formData.categoryId
            },
            description: formData.description,
            manufacturer: formData.manufacturer,
            price: formData.price,
            stockQuantity: formData.stockQuantity,
            warrantyPeriod: formData.warrantyPeriod,
        }));
        
        // Append the image file
        if (fileupload) {
            formDataToSend.append('imageFile', fileupload);
        } else {
            alert("No image file selected");
            return;
        }
        console.log(formDataToSend.values());
    
        // Send the POST request with the FormData
        try {
            dispatch(createProduct(token, formDataToSend));
            setFormData({
                name: '',
                categoryId: '',
                description: '',
                manufacturer: '',
                price: '',
                stockQuantity: '',
                warrantyPeriod: '',
            });
            setFile(null);
            setFileupload(null);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };
    

    useEffect(() => {
        dispatch(retrieveCategorys());
        setFile(null);
        setFileupload(null);
    }, [dispatch]);

    return (
        <div className="card shadow-lg bg-body rounded">
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
                                <Form.Control
                                    type="file"
                                    accept="image/jpeg, image/png, image/jpg"
                                    onChange={handleChangeImage}
                                    required
                                />
                                {file && <img src={file} className='img-fluid mt-2' alt="Preview" />}
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

// Optionally define the modules and formats for React Quill
const editorModules = {
    toolbar: [
        [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link','video'],
        [{ 'align': [] }],
        ['clean']
    ],
};

const editorFormats = [
    'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline',
    'link','video', 'align', 'clean'
];

export default ProductForm;
