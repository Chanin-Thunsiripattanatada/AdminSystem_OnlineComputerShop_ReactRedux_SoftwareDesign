import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchData } from '../store/actions';
const CustomerTable = () => {
    const [data, setData] = useState({
        data: [
            {
                customerId: 1,
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                user: {
                    id: 101,
                    username: "johnny",
                    role: "Admin"
                }
            },
            {
                customerId: 2,
                firstName: "Jane",
                lastName: "Smith",
                email: "jane.smith@example.com",
                user: {
                    id: 102,
                    username: "janey",
                    role: "User"
                }
            },
            {
                customerId: 3,
                firstName: "Alice",
                lastName: "Johnson",
                email: "alice.johnson@example.com",
                user: {
                    id: 103,
                    username: "alice123",
                    role: "User"
                }
            },
            {
                customerId: 4,
                firstName: "Bob",
                lastName: "Brown",
                email: "bob.brown@example.com",
                user: {
                    id: 104,
                    username: "bobby",
                    role: "Moderator"
                }
            }
        ]
    });
    // const dispatch = useDispatch();
    // // const data = useSelector((state) => state.data);
    // const loading = useSelector((state) => state.loading);
    // const error = useSelector((state) => state.error);
    useEffect(() => {
        // dispatch(fetchData());
        const logData = () => {
            console.log(data);
        };
        logData();
    }, [data]);
    return (
        <><div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
            <div className="row">
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Role</th>
                            </tr>
                        
                        </thead>
                        <tbody>
                        {data.data.map((customer) => (
                                    <tr key={customer.customerId}>
                                        <td>{customer.firstName}</td>
                                        <td>{customer.lastName}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.user.username}</td>
                                        <td>{customer.user.role}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            <div>
        {/*โชว์นอกตาราง*/}
      {data.data.map((customer) => (
        <p key={customer.customerId}>
          <strong>Name:</strong> {customer.firstName} {customer.lastName}<br />
          <strong>Email:</strong> {customer.email}<br />
          {customer.user && (
            <>
              <strong>Username:</strong> {customer.user.username}<br />
              <strong>Role:</strong> {customer.user.role}<br />
              <strong>User ID:</strong> {customer.user.id}<br />
            </>
          )}
        </p>
      ))}
    </div>
    </>
    );
};
export default CustomerTable;