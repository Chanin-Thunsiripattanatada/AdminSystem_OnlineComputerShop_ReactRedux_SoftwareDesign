import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveCustomers } from '../../../actions/customers';
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
    
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

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
        dispatch(retrieveCustomers(token));
    }, [dispatch]);

    const handleSort = (column) => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newOrder);
        // Sort customers based on column and order
        customers.sort((a, b) => {
            const aValue = a[column].toString().toLowerCase();
            const bValue = b[column].toString().toLowerCase();
            return newOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });
    };

    const filteredCustomers = customers.filter((customer) => {
        return (
            customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="card shadow-lg bg-body rounded">
            <h4 className="card-header">ข้อมูลรายการข้อมูลลูกค้า</h4>
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name or email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="crud">
                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Customer ID</th>
                                        <th onClick={() => handleSort('firstName')}>First Name</th>
                                        <th onClick={() => handleSort('lastName')}>Last Name</th>
                                        <th onClick={() => handleSort('email')}>Email</th>
                                        <th>Username</th>
                                        <th>User Email</th>
                                        <th>Role</th>
                                        <th>Shipping Address</th>
                                        <th>Billing Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.map((customer) => (
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
                </div>
            </div>
        </div>
    );
};

export default CustomerTable;
