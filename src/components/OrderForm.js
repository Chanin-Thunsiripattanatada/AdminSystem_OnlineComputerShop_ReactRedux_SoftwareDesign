import React, { useState } from 'react';

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

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here (e.g., create order with selected product and quantity)
        console.log(`Selected Product ID: ${selectedProduct}, Quantity: ${quantity}`);
    };
    return (
        <>
            <main>
                <div className="container">
                    <br/>
                    <div class="card">
                        <h5 class="card-header">เพิ่มแก้ไขลบรายการซื้อขาย</h5>
                        <div class="card-body">
                            {/* <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a> */}
                            <form class="row justify-content-center g-2 needs-validation" novalidate>
                                <div class="col-md-1 position-relative">
                                    <label for="validationTooltip01" class="form-label">รหัสลูกค้า</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        id="validationTooltip01" 
                                        value="1" 
                                        required />
                                    <div class="valid-tooltip">
                                        Looks good!
                                    </div>
                                </div>
                                <div class="col-md-2 position-relative">
                                    <label for="validationTooltip02" class="form-label">OrderDate</label>
                                    <input 
                                        type="date" 
                                        class="form-control" 
                                        id="validationTooltip02" 
                                        required />
                                    <div class="invalid-tooltip">
                                        Please provide a Date.
                                    </div>
                                </div>
                                <div class="col-md-2 position-relative">
                                    <label for="validationTooltip03" class="form-label">TotalAmount</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        id="validationTooltip03" 
                                        required />
                                    <div class="valid-tooltip">
                                        Please provide a valid Amount.
                                    </div>
                                </div>
                                <div className="col-md-3 position-relative">
                                    <label htmlFor="productSelect" className="form-label">Select Product</label>
                                    <select 
                                        className="form-select" 
                                        id="productSelect" 
                                        value={selectedProduct} 
                                        onChange={handleProductChange} 
                                        required>
                                        <option value="">Choose...</option>
                                        {products.map((product) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name} - ${product.price.toFixed(2)}
                                            </option>
                                        ))}
                                    </select>
                                    
                                    <div className="invalid-tooltip">Please select a product.</div>
                                </div>
                                <div className="col-md-2 position-relative">
                                    <label htmlFor="quantity" className="form-label">Quantity</label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="quantity" 
                                        min="1" 
                                        value={quantity} 
                                        onChange={handleQuantityChange} 
                                        required 
                                    />
                                    <div className="invalid-tooltip">Please provide a valid quantity.</div>
                                </div>
                                <div class="col-md-2 position-relative">
                                    <label for="validationTooltip04" class="form-label">ShippingStatus</label>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        id="validationTooltip04" 
                                        value="Shipped" 
                                        required />
                                </div>      
                                <div class="col-12">
                                    <button class="btn btn-primary" type="submit">Submit form</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            
        </>
    );
}

export default OrderForm;