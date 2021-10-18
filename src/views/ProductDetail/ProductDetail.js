import React, {useState, useEffect} from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

//components
import ItemCount from '../../components/ItemCount/ItemCount';

const ProductDetail = ({ match }) => {
    const[product, setProduct] = useState([]);
    const[loading, setLoading] = useState(true);
    const[cartQty, setCartQty] = useState(0);

    useEffect(async () => {
        fetch(`https://fakestoreapi.com/products/${match.params.id}`)
            .then(response => response.json())
            .then((json) => {
                setLoading(false);
                setProduct(json);
            });
    
    }, []);

    const onAdd = (qty) => {
        setCartQty(cartQty + qty);
    }

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
                    <ItemCount event={onAdd} />
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
