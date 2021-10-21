import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, Toast } from 'react-bootstrap';
import { CartContext } from '../../CartContext';

const ItemCount = ({ productId }) => {
    const [showA, setShowA] = useState(false);
    const [counter, setCounter] = useState(0);
    const [cartProducts, addProductToCart, removeItem] = useContext(CartContext);
    const [qtyInCart, setQtyInCart] = useState(0);

    const toggleShowA = () => setShowA(!showA);

    const incrementCounter = () => {
        setCounter(counter+1);
    }

    const decrementCounter = () => {
        if(counter>0)
            setCounter(counter-1);
    }

    const addToCart = () => {
        if(counter > 0){
            //event(counter);
            addProductToCart(productId, counter);
            //reset the counter
            setCounter(0);
        } else {
            toggleShowA();
        }
    }

    const deleteFromCart = () => {
        removeItem(productId);
        setQtyInCart(0);
    }

    useEffect (() => {
        const aux = cartProducts;
        if(productId !== undefined && aux.find(x => x.id === productId) !== undefined)
            setQtyInCart(aux.find(x => x.id === productId).quantity); 
    });

    
    if(qtyInCart > 0){
        return (
            <div>
                <Link className="btn btn-outline-success" to="/Cart">Finalizar compra</Link>
                <br/>
                <button className="btn btn-outline-danger small" onClick={deleteFromCart}>Eliminar del carrito</button>
            </div>
        )
    } else {
        return (
            <div>
                <ToastContainer position="top-end" className="p-3">
                    <Toast show={showA} onClose={toggleShowA} bg="warning" delay={3000} autohide>
                        <Toast.Header>
                            <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                            />
                            <strong className="me-auto">Atención</strong>
                        </Toast.Header>
                        <Toast.Body>Debes sumar al menos 1 artículo</Toast.Body>
                    </Toast>
                </ToastContainer>

                <a onClick={decrementCounter}><i className="fa fa-minus fa-2x"></i></a>&nbsp;
                <input type="text" value={counter} style={{width:'4em', textAlign:'center'}} readOnly />&nbsp;
                <a onClick={incrementCounter}><i className="fa fa-plus fa-2x"></i></a>
    
                <br/><br/>
                <button className="btn btn-outline-primary" onClick={addToCart}>Agregar al carrito</button>
                <br/>
            </div>
        )
    }
}

export default ItemCount
