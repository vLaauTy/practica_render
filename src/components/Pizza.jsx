import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Pizza = ({ pizza }) => {
    const [cantidad, setcantidad] = useState(1)
    const [variant, setvariant] = useState('small')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="m-5">
            <div onClick={handleShow}>

                <img
                    src={pizza.image}
                    className="img-fluid"
                    alt=""
                    style={{ height: "200px" }}
                />
            </div>

            <div className="flex-container">
                <div className="w-100 m-1">
                    Varients
                    <select className="form-control" value={variant} onChange={(e) => { setvariant(e.target.value) }}>
                        {pizza.variantes.map(varient => {
                            return <option value={varient}>{varient}</option>
                        })}
                    </select>
                </div>

                <div className="w-100 m-1">
                    <p>Cantidad</p>
                    <select className="form-control" value={cantidad} onChange={(e) => { setcantidad(e.target.value) }}>
                        {[...Array(10).keys()].map((x, i) => {
                            return <option value={i + 1}>{i + 1}</option>
                        })}

                    </select>
                </div>
            </div>
            <div className="flex-container">
                <div className="m-1 w-100">
                    <h1>Price: {pizza.prices[0][variant] * cantidad}</h1>
                </div>
                <div className="m-1 w-100">
                    <button className="btn">ADD TO CART</button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{pizza.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Modal body text goes here.</p>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn" onClick={handleClose}>CLOSE</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Pizza;
