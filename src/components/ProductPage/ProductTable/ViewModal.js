import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ViewModal = ({ show, handleClose, modaldata }) => (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>View Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {modaldata ? (
                <>
                    <p>
                        {modaldata.image && modaldata.image.imageData ? (
                            <>
                            <img
                                src={`http://localhost:8080/api/image/${modaldata.image.id}`}
                                alt={modaldata.name || 'Product Image'}
                                style={{ width: '100px', height: 'auto' }}
                            />
                            
                            </>
                        ) : (
                            <span>No Image</span>
                        )}
                    </p>
                    <p><strong>Product ID:</strong> {modaldata.modaldataId}</p>
                    <p><strong>Name:</strong> {modaldata.name}</p>
                    <p><strong>Stock Quantity:</strong> {modaldata.stockQuantity}</p>
                    <p><strong>Category:</strong> {modaldata.category.categoryName}</p>
                    <p><strong>Manufacturer:</strong> {modaldata.manufacturer}</p>
                    <p><strong>Rating:</strong> {modaldata.rating}</p>
                </>
            ) : (<>Not Found</>)}

        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ViewModal;
