import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const ViewModal = ({ show, handleClose, modaldata }) => (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>View Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {modaldata && (
                <div>
                    <h5>Title: {modaldata.title}</h5>
                    <div className='card'>
                        <div className='card-content' dangerouslySetInnerHTML={{ __html: modaldata.description }} />
                    </div>
                    <p>
                        {modaldata.created && modaldata.created.toDate().toLocaleTimeString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                    <h6>Main Image</h6>
                    <img className="img-fluid" src={modaldata.image} alt="Main" /><hr />
                    <h6>Additional Images</h6>
                    {modaldata.listimage && modaldata.listimage.map((image, index) => (
                        <img key={index} className="img-fluid" src={image} alt={`Additional ${index}`} />
                    ))}
                </div>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
);

export default ViewModal;
