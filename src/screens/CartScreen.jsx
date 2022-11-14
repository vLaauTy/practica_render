import React, { useContext } from 'react'
import { Store } from '../Store';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const CartScreen = () => {
    const navigate = useNavigate();

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems }
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/getpizzas/${item._id}`);
        if (data.stock < quantity) {
            window.alert('Producto sin stock');
            return;
        }
        // se usa ese nombre para no confundir con "dispatch"
        ctxDispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } })

    };
    const removeItemCart = (item) => {
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item })
    }

    const checkoutHandler = (item) => {
        navigate('signin?redirect=/shiping')
    }

    return (
        <div>
            <h3>Carro</h3>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <h4>
                            Carro Vacio
                        </h4>
                    ) :
                        (
                            <ListGroup>
                                {cartItems.map((item) => (
                                    <ListGroup.Item key={item._id}>
                                        <Row className='align-items-center'>
                                            <Col md={4}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="img-fluid rounded img-thumbnail"
                                                ></img>{' '}
                                                <Link to={`/product/${item._id}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={3}>
                                                <Button variant='light' disabled={item.quantity === 1}
                                                    onClick={() => updateCartHandler(item, item.quantity - 1)}>
                                                    <i className="fas fa-minus-circle">-</i>
                                                </Button>{' '}
                                                <span>{item.quantity}</span>{' '}
                                                <Button variant='light' disabled={item.quantity === item.stock}
                                                    onClick={() => updateCartHandler(item, item.quantity + 1)}>
                                                    <i className="fas fa-plus-circle">+</i>
                                                </Button>
                                            </Col>
                                            <Col md={3}>${item.precio}</Col>
                                            <Col md={2}>
                                                <Button variant='light' onClick={() => removeItemCart(item)}>
                                                    <i className='fa fa-trash'>eliminar</i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                                        items) : $
                                        {cartItems.reduce((a, c) => a + c.precio * c.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                            type="button"
                                            variant="primary"
                                            onClick={checkoutHandler}
                                            disabled={cartItems.length === 0}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen