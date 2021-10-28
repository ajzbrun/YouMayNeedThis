import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../CartContext';
import { Image, Item, Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../firebase.config';

const Cart = () => {
    const[productsInCart, setProductsInCart] = useState([]);
    const[cartProducts, addProductToCart, removeItem, clearCart] = useContext(CartContext);
    const[loading, setLoading] = useState(true);

    useEffect(async () => {
        let inCartProds = [];
        let itemsProccessed = 0;
        const requestData = async (item) => {
            const items = await getDocs(collection(db, 'products'));
            const products = items.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            });

            const product = products.find((prod) => prod.id === item.id);
            product['quantity'] = item.quantity;
            inCartProds.push(product);

            itemsProccessed++
            if(itemsProccessed >= cartProducts.length)
                setProductsInCart(inCartProds);
        }

        await cartProducts.forEach(item => {            
            requestData(item).then(() => {
                setLoading(false);
            });
        });

        if(cartProducts.length == 0)
            setLoading(false);
    }, [cartProducts]);

    const removeSpecificItem = (id) => {
        setLoading(true);
        if(cartProducts.length == 1) //si es el ultimo item, lo elimino vaciando el carrito
            clearLocalCart();
        else
            removeItem(id);
    }

    const clearLocalCart = () => {
        clearCart()
        setProductsInCart([]);
    }
    
    if(productsInCart.length > 0){
        return (
            <div>
                <Dimmer active={loading}>
                    <Loader />
                </Dimmer>
                <h2>Productos en tu carrito</h2>
                <Item.Group>
                    {productsInCart.map((cartItem) => {
                        return(
                            <div key={cartItem.id}>
                                <hr/>
                                <Item>
                                    <Item.Image size='tiny' src={cartItem.image} />
                                    <Item.Content>
                                        <Link to={`/product-detail/${cartItem.id}`}>{cartItem.title}</Link>
                                        <Item.Meta><b>Cantidad: {cartItem.quantity}</b></Item.Meta>
                                        <Item.Description>
                                        {cartItem.description}
                                        </Item.Description>
                                        <br/>
                                        <Item.Extra>
                                            <button className="btn btn-outline-secondary btn-sm" onClick={() => removeSpecificItem(cartItem.id)}>Eliminar del carrito</button>
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            </div>
                        )
                    })}
                </Item.Group>

                <hr/>
                <button className="btn btn-outline-success" >Finalizar compra</button>
                <br/><br/>
                <button className="btn btn-outline-danger btn-sm" onClick={clearLocalCart}>Vaciar carrito</button>
                <br/>
            </div>
        )
    } else {
        return (
            <div>
                <Dimmer active={loading}>
                    <Loader />
                </Dimmer>
                <h2>No hay productos en tu carrito :(</h2>
                <Link className="nav-link" to="/products">Ve a elegir productos!</Link>
            </div>
        )
    }
}

export default Cart
