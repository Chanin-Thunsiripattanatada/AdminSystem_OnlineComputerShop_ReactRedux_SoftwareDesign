import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { retrieveProducts } from '../../../actions/products';
import { Button, Form } from 'react-bootstrap';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const ProductTable = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [modalId, setModalId] = useState('');
    const [modalData, setModalData] = useState(null);

    // Filter state
    const [filterName, setFilterName] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterManufacturer, setFilterManufacturer] = useState('');

    const handleCloseView = () => setShowView(false);
    const handleShowView = (product) => {
        setModalData(product);
        setShowView(true);
    };

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = (product) => {
        setModalData(product);
        setShowEdit(true);
    };

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) => {
        setModalId(id);
        setShowDelete(true);
    };

    const handleRefreshProducts = async () => {
        dispatch(retrieveProducts());
    };

    useEffect(() => {
        handleRefreshProducts();
    }, [dispatch]);

    // Filtered products based on user input
    const filteredProducts = products.filter((product) => {
        return (
            (filterName === '' || product.name.toLowerCase().includes(filterName.toLowerCase())) &&
            (filterCategory === '' || product.category.categoryName.toLowerCase().includes(filterCategory.toLowerCase())) &&
            (filterManufacturer === '' || product.manufacturer.toLowerCase().includes(filterManufacturer.toLowerCase()))
        );
    });

    return (
        <div class="card shadow-lg bg-body rounded">
            <h4 class="card-header">ข้อมูลรายการสินค้า</h4>
            <div class="card-body">
                <div className="crud">

                    {/* Filter inputs */}
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <Form.Control
                                type="text"
                                placeholder="Filter by name"
                                value={filterName}
                                onChange={(e) => setFilterName(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <Form.Control
                                type="text"
                                placeholder="Filter by category"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <Form.Control
                                type="text"
                                placeholder="Filter by manufacturer"
                                value={filterManufacturer}
                                onChange={(e) => setFilterManufacturer(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>ลำดับ</th>
                                        <th>รูปภาพ</th>
                                        <th>รหัสสินค้า</th>
                                        <th>ชื่อสินค้า</th>
                                        <th>จำนวนสินค้าคงคลัง</th>
                                        <th>ประเภทสินค้า</th>
                                        <th>ผู้ผลิต</th>
                                        <th>rating</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {product.image && product.image.imageData ? (
                                                    <img
                                                        src={`http://localhost:8080/api/image/${product.image.id}`}
                                                        alt={product.name || 'Product Image'}
                                                        style={{ width: '100px', height: 'auto' }}
                                                    />
                                                ) : (
                                                    <span>No Image</span>
                                                )}
                                            </td>
                                            <td>{product.productId}</td>
                                            <td>{product.name}</td>
                                            <td>{product.stockQuantity}</td>
                                            <td>{product.category.categoryName}</td>
                                            <td>{product.manufacturer}</td>
                                            <td>{product.rating}</td>
                                            <td>
                                                <Button className='btn btn-primary' onClick={() => handleShowView(product)}>รายละเอียด</Button>
                                                &nbsp;
                                                <Button className='btn btn-warning' onClick={() => handleShowEdit(product)}>แก้ไข</Button>
                                                &nbsp;
                                                <Button className='btn btn-danger' onClick={() => handleShowDelete(product.productId)}>ลบ</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <ViewModal show={showView} handleClose={handleCloseView} modaldata={modalData} />
                    <EditModal show={showEdit} handleClose={handleCloseEdit} modaldata={modalData} refreshProducts={handleRefreshProducts} />
                    <DeleteModal show={showDelete} handleClose={handleCloseDelete} modalId={modalId} />
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
