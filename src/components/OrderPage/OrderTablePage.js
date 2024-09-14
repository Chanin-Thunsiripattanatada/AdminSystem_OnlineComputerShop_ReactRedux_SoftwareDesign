import React from "react";
import { BrowserRouter, Route, Router } from "react-router-dom";
import OrderTable from "./OrderTable/OrderTable";

function OrderTablePage() {
    return (
        <main>
            <div className="container">
                <div className="row p-4">
                    <OrderTable/>
                </div>
            </div>
        </main>
    );
}
export default OrderTablePage;