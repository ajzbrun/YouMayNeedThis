import React, { useState, useEffect } from 'react'
import Item from '../Item/Item';


const ItemList = () => {
    const[users, setUsers] = useState([]);

    useEffect(async () => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(json => setUsers(json));
    
    }, []); //when component did mount

    return (
        <div>
            <h1>Items List</h1>

            <hr/><br/>

            <div className="ui link cards" style={{textAlign:'center'}}>
                {users.map((user) => {
                    return(
                        <div>
                            <Item data={user} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ItemList