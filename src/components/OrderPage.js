import React from "react";
import OrderForm from "./OrderForm";
import { BrowserRouter, Route, Router } from "react-router-dom";

function OrderPage() {
    return (
        <main>
            <div className="container">
                <div className="row p-4">
                    <div class="mx-auto">
                        <h2>ข้อมูลรายการซื้อขาย</h2>
                    </div>
                </div>
                <div className="row">
                    <OrderForm/>
                </div>

            </div>
        </main>
    );
}
export default OrderPage;