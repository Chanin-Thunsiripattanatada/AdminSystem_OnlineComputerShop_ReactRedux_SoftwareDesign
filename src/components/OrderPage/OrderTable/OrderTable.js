import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveOrders } from '../../../actions/orders';
import { useAuth } from '../../../auth/AuthContext';
import { Button, Form } from 'react-bootstrap';
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

    const [filterShippingStatus, setFilterShippingStatus] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    const [modalId, setModalId] = useState('');
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        dispatch(retrieveOrders(token));
    }, [dispatch]);

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

    // Filtering logic
    const filteredOrders = orders.filter(order => {
        return (
            (filterShippingStatus === '' || order.shippingStatus.includes(filterShippingStatus)) &&
            (filterStatus === '' || order.status.includes(filterStatus))
        );
    });

    // Sorting logic
    const sortedOrders = filteredOrders.sort((a, b) => {
        let fieldA = a[sortField];
        let fieldB = b[sortField];
        if (sortField === 'totalAmount') {
            fieldA = parseFloat(fieldA);
            fieldB = parseFloat(fieldB);
        } else if (sortField === 'orderDate') {
            fieldA = new Date(fieldA);
            fieldB = new Date(fieldB);
        }

        if (sortDirection === 'asc') {
            return fieldA > fieldB ? 1 : -1;
        } else {
            return fieldA < fieldB ? 1 : -1;
        }
    });

    const handleSortChange = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    return (
        <div className="card shadow-lg bg-body rounded">
            <h4 className="card-header">ข้อมูลรายการซื้อขายสินค้า</h4>
            <div className="card-body">
                <div className="crud">

                    {/* Filter inputs */}
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <Form.Control
                                as="select"
                                value={filterShippingStatus}
                                onChange={(e) => setFilterShippingStatus(e.target.value)}
                            >
                                <option value="">Filter by Shipping Status</option>
                                <option value="ยังไม่จัดส่ง">ยังไม่จัดส่ง</option>
                                <option value="ส่งสินค้าแล้ว">ส่งสินค้าแล้ว</option>
                                <option value="จัดส่งถึงที่แล้ว">จัดส่งถึงที่แล้ว</option>
                            </Form.Control>
                        </div>
                        <div className="col-md-6">
                            <Form.Control
                                as="select"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="">Filter by Status</option>
                                <option value="รอการยืนยัน">รอการยืนยัน</option>
                                <option value="กำลังตรวจสอบ">กำลังตรวจสอบ</option>
                                <option value="ชำระเงินแล้ว">ชำระเงินแล้ว</option>
                                <option value="ยกเลิกการสั่งซื้อ">ยกเลิกการสั่งซื้อ</option>
                            </Form.Control>
                        </div>
                    </div>

                    {/* Table and Sorting */}
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>รหัสลูกค้า</th>
                                        <th>
                                            <Button variant="link" onClick={() => handleSortChange('orderDate')}>
                                                Order Date {sortField === 'orderDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                                            </Button>
                                        </th>
                                        <th>
                                            <Button variant="link" onClick={() => handleSortChange('totalAmount')}>
                                                Total Amount {sortField === 'totalAmount' && (sortDirection === 'asc' ? '↑' : '↓')}
                                            </Button>
                                        </th>
                                        <th>Shipping Status</th>
                                        <th>Order Status</th>
                                        <th>Order Items</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6">No orders found.</td>
                                        </tr>
                                    ) : (
                                        sortedOrders.map((order) => (
                                            <tr key={order.orderId}>
                                                <td>{order.customer.customerId}</td>
                                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                                <td>${order.totalAmount.toFixed(2)}</td>
                                                <td>{order.shippingStatus}</td>
                                                <td>{order.status}</td>
                                                <td>
                                                    <Button className="btn btn-primary" onClick={() => handleShowView(order)}>รายละเอียด</Button>
                                                    &nbsp;
                                                    <Button className="btn btn-warning" onClick={() => handleShowEdit(order)}>แก้ไข</Button>
                                                    &nbsp;
                                                    <Button className="btn btn-danger" onClick={() => handleShowDelete(order.orderId)}>ลบ</Button>
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
    );
};

export default OrderTable;
