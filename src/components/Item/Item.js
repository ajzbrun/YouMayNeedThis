import userEvent from '@testing-library/user-event'
import React from 'react'

//components
import ItemCount from '../ItemCount/ItemCount';

const Item = ({data}) => {
    return (
        <div class="ui card">
            <div class="image">
                <img src={data.url} />
            </div>
            <div class="content">
                <a class="header">{data.title}</a>
                <div class="meta">
                <span class="date">Id: {data.id}</span>
                </div>
                <div class="description">
                {data.thumbnaiUrl}
                </div>
            </div>
            <div>
                <ItemCount />
            </div>
        </div>
    )
}

export default Item
