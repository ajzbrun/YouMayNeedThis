import React, { useState, useEffect } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../firebase/firebase.config';

import Item from '../Item/Item';


const ItemList = ({ categ }) => {
    const[allProducts, setAllProducts] = useState([]);
    const[products, setProducts] = useState([]);
    const[loading, setLoading] = useState(true);


    const updFilteredCateg = (data = null) => {
        let json = allProducts;
        if(data != null)
            json = data;

        if(categ != "")
            json = json.filter((element) => element.category == categ);

        setProducts(json);
    }

    useEffect(async () => {
        const requestData = async () => {

            const items = await getDocs(collection(db, 'products'));
            const products = items.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            });
            
            setLoading(false);
            setAllProducts(products);
            updFilteredCateg(products);
        }
        requestData();
    }, []); //when component did mount

    useEffect(async () => {
        updFilteredCateg();
    }, [categ]); //when the get var category changes his value, update the visible product list

    return (
        <div>
            <h1>Productos</h1>

            <hr/><br/>

            <Dimmer active={loading}>
                <Loader />
            </Dimmer>
            <div className="ui link cards" style={{textAlign:'center'}}>
                {products.map((item) => {
                    return(
                        <div key={item.id}>
                            <Item data={item} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ItemList