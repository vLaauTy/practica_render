import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Store } from '../Store';


const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, product: action.payload, loading: false };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const ProductScreen = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { _id } = params


    const [{ loading, error, product }, dispatch] = useReducer(reducer, {
        product: [],
        loading: true,
        error: "",
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/getpizzas/_id/${_id}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }
        };
        fetchData();
    }, [_id]);

    const { state, dispatch: cxtDispatch } = useContext(Store);
    const { cart } = state
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/getpizzas/${product._id}`);
        if (data.stock < quantity) {
            window.alert('Producto sin stock');
            return;
        }
        // se usa ese nombre para no confundir con "dispatch"
        cxtDispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } })
        navigate('/cart')
    }

    console.log(cart);



    return (
        <div>
            <h2>{product.name}</h2>
            {product.stock > 0 ? (
                <p>{product.stock} en stock</p>
            ) : (
                <p>{product.stock} sin stock</p>
            )}
            <div className="m-1 w-100">
                <button onClick={addToCartHandler} className="btn">ADD TO CART</button>
            </div>
        </div>
    )
}

export default ProductScreen