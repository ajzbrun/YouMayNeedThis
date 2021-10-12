import userEvent from '@testing-library/user-event'
import React from 'react'
import { Link } from 'react-router-dom'

//components
import ItemCount from '../ItemCount/ItemCount';

const Item = ({data}) => {
    return (
        <div class="ui card">
            <div class="image">
                <img src={data.image} />
            </div>
            <div class="content">
                <a class="header">{data.title}</a>
                <div class="meta">
                <span class="date">Id: {data.id}</span>
                </div>
            </div>
            <Link to={`/Product-Detail/${data.id}`}>
                Ver detalles
            </Link>
            <div>
                <ItemCount />
            </div>
        </div>
    )
}

export default Item
