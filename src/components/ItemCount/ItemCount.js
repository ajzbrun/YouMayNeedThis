import React, { useState } from 'react'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const ItemCount = () => {

    const [counter, setCounter] = useState(0);

    const incrementCounter = () => {
        setCounter(counter+1);
    }

    const decrementCounter = () => {
        if(counter>0)
            setCounter(counter-1);
    }

    return (
        <div>
            <a href="#" onClick={decrementCounter}><i class="fa fa-minus fa-2x"></i></a>&nbsp;
            <input type="text" value={counter} style={{width:'4em', textAlign:'center'}} />&nbsp;
            <a href="#" onClick={incrementCounter}><i class="fa fa-plus fa-2x"></i></a>

            <br/><br/>
            <button class="btn btn-outline-primary">Agregar al carrito</button>
        </div>
    )
}

export default ItemCount
