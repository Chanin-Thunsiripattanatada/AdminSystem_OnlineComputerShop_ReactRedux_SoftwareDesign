import React from "react";
import ProductForm from "./AddProduct/ProductForm";

function ProductPage() {
    return (
        <main>
            <div className="container">
                <div className="row p-4">
                    <ProductForm/>
                </div>
            </div>
        </main>
    );
}
export default ProductPage;