import React from "react";
import ProductForm from "./ProductForm";
import { BrowserRouter, Route, Router } from "react-router-dom";
import ProductTable from "./ProductTable";

function ProductTablePage() {
    return (
        <main>
            <div className="container">
                <div className="row p-4">
                    <div class="mx-auto">
                        <h2>ข้อมูลรายการสินค้า</h2>
                    </div>
                </div>
                <div className="row">
                    <ProductTable/>
                </div>

            </div>
        </main>
    );
}
export default ProductTablePage;