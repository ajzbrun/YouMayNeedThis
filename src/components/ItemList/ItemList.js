import React, { useState, useEffect } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

import Item from '../Item/Item';


const ItemList = () => {
    const[users, setUsers] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(async () => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(json => {
                setLoading(false);
                setUsers(json)
            });
    
    }, []); //when component did mount

    return (
        <div>
            <h1>Productos</h1>

            <hr/><br/>

            <Dimmer active={loading}>
                <Loader />
            </Dimmer>
            <div className="ui link cards" style={{textAlign:'center'}}>
                {users.map((user) => {
                    return(
                        <div key={user.id}>
                            <Item data={user} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ItemList