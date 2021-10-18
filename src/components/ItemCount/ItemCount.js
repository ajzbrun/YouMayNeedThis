import React, { useState } from 'react'

const ItemCount = ({ event }) => {
    const [counter, setCounter] = useState(0);

    const incrementCounter = () => {
        setCounter(counter+1);
    }

    const decrementCounter = () => {
        if(counter>0)
            setCounter(counter-1);
    }

    const addToCart = () => {
        event(counter);
        //reset the counter
        setCounter(0);
    }

    return (
        <div>
            <a onClick={decrementCounter}><i className="fa fa-minus fa-2x"></i></a>&nbsp;
            <input type="text" value={counter} style={{width:'4em', textAlign:'center'}} readOnly />&nbsp;
            <a onClick={incrementCounter}><i className="fa fa-plus fa-2x"></i></a>

            <br/><br/>
            <button className="btn btn-outline-primary" onClick={addToCart}>Agregar al carrito</button>
            <br/>
        </div>
    )
}

export default ItemCount
