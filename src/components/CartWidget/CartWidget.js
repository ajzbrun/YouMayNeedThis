import React from 'react'
import 'font-awesome/css/font-awesome.min.css'

const CartWidget = ({itemsCount}) => {
    return (
        <div>
            <i className="fa fa-shopping-cart fa-2x"></i>
            &nbsp;<i><span>({itemsCount} items)</span></i>
        </div>
    )
}

export default CartWidget
