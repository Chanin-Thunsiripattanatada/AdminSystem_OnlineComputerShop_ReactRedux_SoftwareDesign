import React, { useEffect, useState } from 'react';

const OrderTable = () => {
    const [data, setData] = useState({
        data: [
            {
                orderId: 1,
                orderDate: "2024-09-01",
                totalAmount: 150.75,
                shippingStatus: "Shipped",
                customer: {
                    customerId: 101,
                    customerName: "John Doe"
                },
                orderItems: [
                    {
                        productId: 1,
                        productName: "Laptop",
                        quantity: 1,
                        price: 999.99
                    },
                    {
                        productId: 2,
                        productName: "Wireless Mouse",
                        quantity: 2,
                        price: 25.50
                    }
                ]
            },
            {
                orderId: 2,
                orderDate: "2024-09-05",
                totalAmount: 300.50,
                shippingStatus: "Pending",
                customer: {
                    customerId: 102,
                    customerName: "Jane Smith"
                },
                orderItems: [
                    {
                        productId: 3,
                        productName: "Smartphone",
                        quantity: 1,
                        price: 599.99
                    },
                    {
                        productId: 4,
                        productName: "Phone Case",
                        quantity: 2,
                        price: 15.00
                    }
                ]
            },
            {
                orderId: 3,
                orderDate: "2024-09-10",
                totalAmount: 99.99,
                shippingStatus: "Delivered",
                customer: {
                    customerId: 103,
                    customerName: "Alice Johnson"
                },
                orderItems: [
                    {
                        productId: 5,
                        productName: "Wireless Headphones",
                        quantity: 1,
                        price: 99.99
                    }
                ]
            }
        ]
    });

    useEffect(() => {
        const logData = () => {
            console.log(data);
        };
        logData();
    }, [data]);
    return (
        <><div className="card shadow-lg bg-body rounded">
            <h4 class="card-header">ข้อมูลรายการซื้อขายสินค้า</h4>
            <div class="card-body">
                <div className="crud"></div>
                <div className="row">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>รหัสลูกค้า</th>
                                    <th>Order Date</th>
                                    <th>Total Amount</th>
                                    <th>Shipping Status</th>
                                    <th>Order Items</th>
                                </tr>

                            </thead>
                            <tbody>
                                {data.data.map((order) => (
                                    <tr key={order.orderId}>
                                        <td>{order.customer.customerId}</td>
                                        <td>{order.orderDate}</td>
                                        <td>${order.totalAmount.toFixed(2)}</td>
                                        <td>{order.shippingStatus}</td>
                                        <td>
                                            {order.orderItems.map((item, index) => (
                                                <div key={index}>
                                                    {item.productName} (Qty: {item.quantity}, Price: ${item.price.toFixed(2)})
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        </>
    );
};
export default OrderTable;