import React from 'react'

import ItemList from '../../components/ItemList/ItemList';

const Products = ({ match }) => {

    let category = "";
    if(match.params.category != null)
        category = match.params.category;

    return (
        <ItemList categ={category} />
    )
}

export default Products
