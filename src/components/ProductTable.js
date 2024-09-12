import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchData } from '../store/actions';
const ProductTable = () => {
  const [data, setData] = useState({
    data: [
        {
            productId: 1,
            name: "Laptop",
            price: 999.99,
            stockQuantity: 10,
            category: {
                categoryId: 101,
                categoryName: "Electronics"
            },
            description: "A high-performance laptop",
            manufacturer: "Tech Corp",
            rating: 4.5,
            warrantyPeriod: 24
        },
        {
            productId: 2,
            name: "Smartphone",
            price: 599.99,
            stockQuantity: 25,
            category: {
                categoryId: 102,
                categoryName: "Mobile Devices"
            },
            description: "A smartphone with the latest features",
            manufacturer: "Phone Inc",
            rating: 4.7,
            warrantyPeriod: 12
        },
        {
            productId: 3,
            name: "Wireless Headphones",
            price: 199.99,
            stockQuantity: 50,
            category: {
                categoryId: 103,
                categoryName: "Accessories"
            },
            description: "Noise-cancelling wireless headphones",
            manufacturer: "Audio Masters",
            rating: 4.2,
            warrantyPeriod: 18
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
                                <th>Name</th>
                                <th>Price</th>
                                <th>StockQuantity</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Manufacturer</th>
                                <th>Image</th>
                                <th>Rating</th>
                            </tr>
                        
                        </thead>
                        <tbody>
                        {data.data.map((product) => (
                                    <tr key={product.productId}>
                                        <td>{product.name}</td>
                                        <td>${product.price.toFixed(2)}</td>
                                        <td>{product.stockQuantity}</td>
                                        <td>{product.category.categoryName}</td>
                                        <td>{product.description}</td>
                                        <td>{product.manufacturer}</td>
                                        <td>-</td>
                                        <td>{product.rating}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            <div>
        {/*โชว์นอกตาราง*/}
      {data.data.map((product) => (
        <p key={product.productId}>
          <strong>Name:</strong> {product.name}<br />
          <strong>Description:</strong> {product.description}<br />
          <strong>Price:</strong> ${product.price.toFixed(2)}<br />
          <strong>Stock Quantity:</strong> {product.stockQuantity}<br />
          {product.category && (
            <>
              <strong>Category:</strong> {product.category.categoryName}<br />
              <strong>Category ID:</strong> {product.category.categoryId}<br />
            </>
          )}
          {product.manufacturer && (
            <>
              <strong>Manufacturer:</strong> {product.manufacturer}<br />
            </>
          )}
          {product.rating && (
            <>
              <strong>Rating:</strong> {product.rating}<br />
            </>
          )}
          {product.warrantyPeriod && (
            <>
              <strong>Warranty Period:</strong> {product.warrantyPeriod} months<br />
            </>
          )}
        </p>
      ))}
    </div>
    </>
    );
};
export default ProductTable;