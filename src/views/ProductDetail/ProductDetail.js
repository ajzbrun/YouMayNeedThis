import React, {useState, useEffect} from 'react'
import { Dimmer, Loader, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../firebase/firebase.config';

//components
import ItemCount from '../../components/ItemCount/ItemCount';

const ProductDetail = ({ match }) => {
    const[product, setProduct] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(async () => {
        const requestData = async () => {

            const items = await getDocs(collection(db, 'products'));
            const products = items.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            });

            const product = products.find((prod) => prod.id === match.params.id);
            setLoading(false);
            setProduct(product);
        }
        requestData();
    }, []);

    return (
        <div style={{margin:'3%'}}>
            <h4>DETALLES DEL PRODUCTO</h4>

            <hr/>
            <Link to="/Products" style={{float:'left'}}>
                <Button primary>ATR&Aacute;S</Button>
            </Link>
            <br/>

            <Dimmer active={loading}>
                <Loader />
            </Dimmer>

            <Grid style={{marginTop:'2em'}} doubling stackable>
                <Grid.Column width={4}>
                    <div className="ui centered card" style={{padding:'1em'}}>
                        <div className="image">
                            <img src={product.image} />
                        </div>
                        <div className="content">
                            <a className="header">{product.title}</a>
                            <div className="description">
                                <b>$ {product.price}</b>
                            </div>
                        </div>
                        <div>
                            <ItemCount productId={product.id} />
                        </div>
                    </div>
                </Grid.Column>
                <Grid.Column width={12}>
                    <hr/>
                    <p style={{textAlign:'left'}}>{product.description}</p>
                    <hr/>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default ProductDetail
