import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../store/actions';
const ProductTable = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);
    useEffect(() => {
        dispatch(fetchData());
        const logData = () => {
            console.log(data);
        };
        logData();
    }, [dispatch]);
    return (
        <><div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
            <div className="row">
                <div className="col-sm-3 offset-sm-1 mt-5 mb-4 text-gred">
                    <button className="btn btn-primary">
                        เพิ่มรูปหน้าแรก
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>รูปภาพ</th>
                                <th>Actions</th>
                            </tr>
                        
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
            </div>
            <div>
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