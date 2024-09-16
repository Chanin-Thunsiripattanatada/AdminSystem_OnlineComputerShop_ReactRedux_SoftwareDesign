import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const products = [
    { id: 1, name: "Laptop", price: 999.99 },
    { id: 2, name: "Wireless Mouse", price: 25.50 },
    { id: 3, name: "Smartphone", price: 599.99 },
    { id: 4, name: "Phone Case", price: 15.00 },
    { id: 5, name: "Wireless Headphones", price: 99.99 }
];

function OrderForm() {
    const [selectedProduct, setSelectedProduct] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [customerId, setCustomerId] = useState("1");
    const [orderDate, setOrderDate] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [shippingStatus, setShippingStatus] = useState("Shipped");

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleCustomerIdChange = (e) => {
        setCustomerId(e.target.value);
    };

    const handleOrderDateChange = (e) => {
        setOrderDate(e.target.value);
    };

    const handleTotalAmountChange = (e) => {
        setTotalAmount(e.target.value);
    };

    const handleShippingStatusChange = (e) => {
        setShippingStatus(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., create order with selected product and quantity)
        console.log(`Selected Product ID: ${selectedProduct}, Quantity: ${quantity}`);
    };

    return (
        <div className="card shadow-lg bg-body rounded">
            <h4 className="card-header">เพิ่มแก้ไขลบรายการซื้อขาย</h4>
            <div className="card-body">
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group controlId="formCustomerId">
                                <Form.Label>รหัสลูกค้า</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={customerId}
                                    onChange={handleCustomerIdChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="formOrderDate">
                                <Form.Label>Order Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={orderDate}
                                    onChange={handleOrderDateChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="formTotalAmount">
                                <Form.Label>Total Amount</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={totalAmount}
                                    onChange={handleTotalAmountChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formProduct">
                                <Form.Label>Select Product</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedProduct}
                                    onChange={handleProductChange}
                                    required
                                >
                                    <option value="">Choose...</option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name} - ${product.price.toFixed(2)}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formQuantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group controlId="formShippingStatus">
                                <Form.Label>Shipping Status</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={shippingStatus}
                                    onChange={handleShippingStatusChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-center">
                        <Button variant="secondary" onClick={() => console.log('Cancel')}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" className="ms-2">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default OrderForm;
