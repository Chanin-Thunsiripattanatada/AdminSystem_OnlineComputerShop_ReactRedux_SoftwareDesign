import React from "react";
import { BrowserRouter, Route, Router } from "react-router-dom";
import CustomerTable from "./CustomerTable";

function CustomerTablePage() {
    return (
        <main>
            <div className="container">
                <div className="row p-4">
                    <div class="mx-auto">
                        <h2>ข้อมูลรายการซื้อขาย</h2>
                    </div>
                </div>
                <div className="row">
                    <CustomerTable/>
                </div>

            </div>
        </main>
    );
}
export default CustomerTablePage;