import userEvent from '@testing-library/user-event'
import React from 'react'
import { Link } from 'react-router-dom'

//components
import ItemCount from '../ItemCount/ItemCount';

const Item = ({data}) => {
    return (
        <div className="ui card">
            <div className="image">
                <img src={data.image} />
            </div>
            <div className="content">
                <a className="header">{data.title}</a>
                <div className="meta">
                <span className="date">Id: {data.id}</span>
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
