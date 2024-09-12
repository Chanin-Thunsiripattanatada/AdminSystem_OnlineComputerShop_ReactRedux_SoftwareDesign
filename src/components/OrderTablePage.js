import React from "react";
import { BrowserRouter, Route, Router } from "react-router-dom";
import OrderTable from "./OrderTable";

function OrderTablePage() {
    return (
        <main>
            <div className="container">
                <div className="row p-4">
                    <div class="mx-auto">
                        <h2>ข้อมูลรายการซื้อขาย</h2>
                    </div>
                </div>
                <div className="row">
                    <OrderTable/>
                </div>

            </div>
        </main>
    );
}
export default OrderTablePage;