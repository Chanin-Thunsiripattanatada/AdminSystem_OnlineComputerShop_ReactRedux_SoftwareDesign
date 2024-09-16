import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveCustomers, deleteCustomer, updateCustomer } from '../../../actions/customers';
import { Button } from 'react-bootstrap';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import { useAuth } from '../../../auth/AuthContext';

const CustomerTable = () => {
    const { token } = useAuth();
    const dispatch = useDispatch();
    const customers = useSelector((state) => state.customers);

    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [modalId, setModalId] = useState('');
    const [modalData, setModalData] = useState(null);

    const handleCloseView = () => setShowView(false);
    const handleShowView = (customer) => {
        setModalData(customer);
        setShowView(true);
    };

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = (customer) => {
        setModalData(customer);
        setShowEdit(true);
    };

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) => {
        setModalId(id);
        setShowDelete(true);
    };

    useEffect(() => {
        const logdata = () => { console.log(token) }
        logdata();
        dispatch(retrieveCustomers(token));

    }, [dispatch]);

    // const handleDelete = () => {
    //     dispatch(deleteCustomer(modalId));
    //     handleCloseDelete();
    // };

    // const handleSaveEdit = (updatedCustomer) => {
    //     dispatch(updateCustomer(modalData.customerId, updatedCustomer));
    //     handleCloseEdit();
    // };

    return (
        <div class="card shadow-lg bg-body rounded">
            <h4 class="card-header">ข้อมูลรายการข้อมูลลูกค้า</h4>
            <div class="card-body">
                <div className="crud">
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Customer ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Username</th>
                                        <th>User Email</th>
                                        <th>Role</th>
                                        <th>Shipping Address</th>
                                        <th>Billing Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map((customer) => (
                                        <tr key={customer.customerId}>
                                            <td>{customer.customerId}</td>
                                            <td>{customer.firstName}</td>
                                            <td>{customer.lastName}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.user.username}</td>
                                            <td>{customer.user.email}</td>
                                            <td>{customer.user.roles.map(role => role.name).join(', ')}</td>
                                            <td>{customer.shippingAddress}</td>
                                            <td>{customer.billingAddress}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    {/* <ViewModal show={showView} handleClose={handleCloseView} modaldata={modalData} />
                    <EditModal show={showEdit} handleClose={handleCloseEdit} modaldata={modalData} onSave={handleSaveEdit} />
                    <DeleteModal show={showDelete} handleClose={handleCloseDelete} onDelete={handleDelete} /> */}
                </div>
            </div>
        </div>
    );
};

export default CustomerTable;
