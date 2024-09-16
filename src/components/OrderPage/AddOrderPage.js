import React from "react";
import OrderForm from "./AddOrder/OrderForm";

function AddOrderPage() {
    return (
        <main>
            <div className="container">
                <div className="row p-4">
                    <OrderForm/>
                </div>
            </div>
        </main>
    );
}
export default AddOrderPage;