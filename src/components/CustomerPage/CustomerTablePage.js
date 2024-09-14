import React from "react";
import CustomerTable from "./CustomerTable/CustomerTable";

function CustomerTablePage() {
    return (
        <main>
            <div className="container">
                <div className="row p-4">
                    <CustomerTable/>
                </div>
            </div>
        </main>
    );
}
export default CustomerTablePage;