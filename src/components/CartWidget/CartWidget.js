import React, { useState, useEffect, useContext } from 'react'
import 'font-awesome/css/font-awesome.min.css'
import { CartContext } from '../../CartContext';

const numbStyle = {
    backgroundColor: '#df2121',
    color: '#e4dede',
    borderRadius: '50%',
    position: 'relative',
    minWidth: '1em',
    marginLeft: '20px',
    marginTop: '-10px',
}

const CartWidget = () => {
    const [cartProducts] = useContext(CartContext);
    const [totalQty, setTotalQty] = useState(0);

    useEffect(() => {
        if(!cartProducts) return;
        setTotalQty(cartProducts.length);
    }, [cartProducts]);
    
    
    return (
        <div>
            <i className="fa fa-shopping-cart fa-2x"></i>
            {totalQty > 0 && <div style={numbStyle}><span>{totalQty}</span></div> }
        </div>
    )
}

export default CartWidget
