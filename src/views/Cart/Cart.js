import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../CartContext';
import { Item, Dimmer, Loader, Form, Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { collection, getDocs, addDoc } from '@firebase/firestore';
import { db } from '../../firebase/firebase.config';

const Cart = () => {
    const[productsInCart, setProductsInCart] = useState([]);
    const[cartProducts, addProductToCart, removeItem, clearCart] = useContext(CartContext);
    const[totalAmountOfCart, setTotalAmountOfCart] = useState(0);
    const[loading, setLoading] = useState(true);
    const[loadingPurchase, setLoadingPurchase] = useState(false);

    const[buyerData, setBuyerData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
    });
    const fieldChange = e => {
        setBuyerData({...buyerData, [e.target.name]: e.target.value})
    }

    const[openModalFP, setOpenModalFP] = useState(false);
    const[openModalOrdNumb, setOpenModalOrdNumb] = useState(false);
    const[orderRef, setOrderRef] = useState('');

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

            //calculating the total price of the purchase
            let totalAmount = 0;
            inCartProds.forEach(item => {
                totalAmount += item.price * item.quantity;
            });
            setTotalAmountOfCart(totalAmount);

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

    const finishPurchase = () => {
        setOpenModalFP(true);
    }

    const confirmPurchase = async () => {
        setLoadingPurchase(true);

        let confirmedItems = [];
        productsInCart.forEach(item => {
            confirmedItems.push({
                id: item.id,
                price: item.price,
                title: item.title,
                quantity: item.quantity
            });
        })
        
        const buyerRef = await addDoc(collection(db, 'buyer'), {
            date: new Date(),
            email: buyerData.email,
            lastname: buyerData.lastname,
            name: buyerData.firstname,
            phone: buyerData.phone,
            total: totalAmountOfCart,
            items: { confirmedItems }
        });

        //cleaning the buyer data
        setBuyerData({
            firstname: '',
            lastname: '',
            email: '',
            phone: ''
        });

        setLoadingPurchase(false);
        setOpenModalFP(false);

        setOrderRef(buyerRef.id);
        setOpenModalOrdNumb(true);
    }

    const closePurchaseDetails = () => {
        //clear cart after purchasing
        clearCart()
        setProductsInCart([]);

        setOrderRef('');
        setOpenModalOrdNumb(false);
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
                                            <p>$ {cartItem.price}</p>
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
                <h3>Total: $ {totalAmountOfCart}</h3>
                <div style={{fontSize:"130%"}}>
                    <span style={{color:"#42A928"}}>¡envío gratis!</span><br/>
                    <span style={{fontSize:"80%"}}>*a todo el país</span>
                </div>
                <br/>
                <button className="btn btn-outline-success" onClick={finishPurchase}>Finalizar compra</button>
                <br/><br/>
                <button className="btn btn-outline-danger btn-sm" onClick={clearLocalCart}>Vaciar carrito</button>
                <br/>

                <Modal
                    size='tiny'
                    dimmer='blurring'
                    open={openModalFP}
                    closeOnDimmerClick={false}
                    onClose={() => setOpenModalFP(false)}
                >
                    <Modal.Header>Confirmar compra</Modal.Header>
                    <Modal.Content>
                        <h5>Completa tus datos y confirma que deseas finalizar la compra para generar tu numero de orden</h5>
                        <hr/>
                        <Form>
                            <Form.Field>
                                <label>Nombre</label>
                                <input placeholder='Nombre' name='firstname' onChange={fieldChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Apellido</label>
                                <input placeholder='Apellido' name='lastname' onChange={fieldChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <input type="email" placeholder='Email' name='email' onChange={fieldChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Teléfono</label>
                                <input placeholder='Fijo o celular' name='phone' onChange={fieldChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => setOpenModalFP(false)} disabled={loadingPurchase}>
                            Cancelar
                        </Button>
                        <Button positive onClick={confirmPurchase} loading={loadingPurchase}>
                            Confirmar
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Modal
                    size='tiny'
                    dimmer='blurring'
                    open={openModalOrdNumb}
                    closeOnDimmerClick={false}
                    onClose={closePurchaseDetails}
                >
                    <Modal.Header>Se confirmó tu compra</Modal.Header>
                    <Modal.Content>
                        <p>
                            Tu orden de compra es: <b>{orderRef}</b>
                            <hr/>
                            Se envió un correo con los detalles de tu compra. ¡Muchas gracias!
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive onClick={closePurchaseDetails}>
                            Aceptar
                        </Button>
                    </Modal.Actions>
                </Modal>
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
