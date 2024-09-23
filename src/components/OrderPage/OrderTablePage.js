import React from "react";
import OrderTable from "./OrderTable/OrderTable";

function OrderTablePage() {
    return (
        <main>
            <div className="container">
                <div className="row p-4">
                    <OrderTable />
                </div>
            </div>
        </main>
    );
}
export default OrderTablePage;