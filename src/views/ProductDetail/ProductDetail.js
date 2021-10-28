import React, {useState, useEffect} from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../firebase.config';

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
        <div>
            <h1>Detalles del producto</h1>

            <hr/><br/>
            <Link to="/Products">Atrás</Link>

            <Dimmer active={loading}>
                <Loader />
            </Dimmer>
            <div className="ui card">
                <div className="image">
                    <img src={product.image} />
                </div>
                <div className="content">
                    <a className="header">{product.title}</a>
                    <div className="meta">
                    <span className="date">Id: {product.id}</span>
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
