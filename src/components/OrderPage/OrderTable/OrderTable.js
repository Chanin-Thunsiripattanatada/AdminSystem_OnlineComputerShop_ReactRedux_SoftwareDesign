import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveOrders} from '../../../actions/orders';
import { Button } from 'react-bootstrap';
import ViewModal from './ViewModal';
// import EditModal from './EditModal';
// import DeleteModal from './DeleteModal';
import WebSocketNotification from '../../../Notify/NotifyOrder';

const OrderTable = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);

    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [modalId, setModalId] = useState('');
    const [modalData, setModalData] = useState(null);

    const handleCloseView = () => setShowView(false);
    const handleShowView = (order) => {
        setModalData(order);
        setShowView(true);
    };

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = (order) => {
        setModalData(order);
        setShowEdit(true);
    };

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) => {
        setModalId(id);
        setShowDelete(true);
    };
    
    const handleRefreshorders = async () => {
        dispatch(retrieveOrders());
    };
    useEffect(() => {
        handleRefreshorders();
    }, [dispatch]);

    return (
        <>
        <div class="card shadow-lg bg-body rounded">
            <h4 class="card-header">ข้อมูลรายการสั่งซื้อ</h4>
            <div class="card-body">
                <div className="crud">
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Customer ID</th>
                                        <th>Order Date</th>
                                        <th>Total Amount</th>
                                        <th>Shipping Status</th>
                                        <th>Order Items</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{order.customer.customerId}</td>
                                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                            <td>{order.totalAmount.toFixed(2)}</td>
                                            <td>{order.shippingStatus}</td>
                                            <td>{order.orderItems && order.orderItems.length > 0 ? (
                                                        <ul>
                                                            {order.orderItems.map((item, i) => (
                                                                <li key={i}>
                                                                    {item.product.name} (Qty: {item.quantity}, Price: ${item.price.toFixed(2)})
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <span>No Items</span>
                                                    )}
                                                    </td>
                                            <td>
                                                <Button className='btn btn-primary' onClick={() => handleShowView(order)}>รายละเอียด</Button>
                                                &nbsp;
                                                <Button className='btn btn-warning' onClick={() => handleShowEdit(order)}>แก้ไข</Button>
                                                &nbsp;
                                                <Button className='btn btn-danger' onClick={() => handleShowDelete(order.orderId)}>ลบ</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    

                    <ViewModal show={showView} handleClose={handleCloseView} modaldata={modalData} />
                    {/* <EditModal show={showEdit} handleClose={handleCloseEdit} modaldata={modalData} refreshorders={handleRefreshorders} />
                    <DeleteModal show={showDelete} handleClose={handleCloseDelete} modalId={modalId} /> */}
                </div>
            </div>
        </div>
        <WebSocketNotification />
        </>
    );
};

export default OrderTable;
