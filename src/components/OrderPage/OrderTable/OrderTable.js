import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveOrders } from '../../../actions/orders';
import { useAuth } from '../../../auth/AuthContext';
import { Button } from 'react-bootstrap';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
const OrderTable = () => {
    const { token } = useAuth();
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders);
    
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        dispatch(retrieveOrders(token));
    }, [dispatch]);
    
    const [modalId, setModalId] = useState('');
    const [modalData, setModalData] = useState(null);

    const handleCloseView = () => setShowView(false);
    const handleShowView = async (order) => {
        setModalData(order);
        setShowView(true);
    };

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = async (order) => {
        setModalData(order);
        setShowEdit(true);
    };

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) => {
        setModalId(id);
        setShowDelete(true);
    };

    
    return (
        <><div className="card shadow-lg bg-body rounded">
            <h4 class="card-header">ข้อมูลรายการซื้อขายสินค้า</h4>
            <div class="card-body">
                <div className="crud">
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
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="5">No orders found.</td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order.orderId}>
                                                <td>{order.customer.customerId}</td>
                                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                                <td>${order.totalAmount.toFixed(2)}</td>
                                                <td>{order.shippingStatus}</td>
                                                <td>
                                                    <Button className='btn btn-primary' onClick={() => handleShowView(order)}>รายละเอียด</Button>
                                                    &nbsp;
                                                    <Button className='btn btn-warning' onClick={() => handleShowEdit(order)}>แก้ไข</Button>
                                                    &nbsp;
                                                    <Button className='btn btn-danger' onClick={() => handleShowDelete(order.orderId)}>ลบ</Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ViewModal show={showView} handleClose={handleCloseView} modaldata={modalData} />
                    <EditModal show={showEdit} handleClose={handleCloseEdit} modaldata={modalData} />
                    <DeleteModal show={showDelete} handleClose={handleCloseDelete} modalId={modalId} />
                </div>
            </div>
        </div>

        </>
    );
};
export default OrderTable;