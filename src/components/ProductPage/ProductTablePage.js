import React from "react";
import ProductTable from "./ProductTable/ProductTable";

function ProductTablePage() {
    return (
        <main>
            <div className="container">
                <div className="row p-4">
                    <ProductTable/>
                </div>
            </div>
        </main>
    );
}
export default ProductTablePage;