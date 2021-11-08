import React, {useState, useEffect} from 'react'
import { Dimmer, Loader, Button } from 'semantic-ui-react';
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
            <h1>Detalles del producto</h1>

            <hr/><br/>
            <Link to="/Products">
                <Button primary>Atrás</Button>
            </Link>

            <Dimmer active={loading}>
                <Loader />
            </Dimmer>
            <div className="ui card" style={{padding:'1em'}}>
                <div className="image">
                    <img src={product.image} />
                </div>
                <div className="content">
                    <a className="header">{product.title}</a>
                    <div className="description">
                        <b>$ {product.price}</b>
                    </div>
                    <div className="description">
                    {product.description}
                    </div>
                </div>
                <div>
                    <ItemCount productId={product.id} />
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
