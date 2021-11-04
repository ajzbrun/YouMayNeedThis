import userEvent from '@testing-library/user-event'
import React from 'react'
import { Link } from 'react-router-dom'

const Item = ({data}) => {
    return (
        <Link to={`/product-detail/${data.id}`}>
            <div className="ui card">
                <div className="image">
                    <img src={data.image} />
                </div>
                <div className="content">
                    <a className="header">{data.title}</a>
                    <div className="description">
                    <b>$ {data.price}</b>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Item
