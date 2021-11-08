import React, { useState, useEffect } from 'react';
import { Dimmer, Loader, Card, Header, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { collection, getDocs, query, where } from '@firebase/firestore';
import { db } from '../../firebase/firebase.config';

const Home = () => {
    const[sliderSettings, setSliderSettings] = useState({
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    });
    const[allProducts, setAllProducts] = useState([]);
    const[loading, setLoading] = useState(true);

    useEffect(async () => {
        const requestData = async () => {
            const q = query(collection(db, 'products'), where("offer", "==", true));

            const items = await getDocs(q);
            const products = items.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            });
            
            setAllProducts(products);
            setLoading(false);
        }
        requestData();
    }, []); //when component did mount

    return (
        <div>
            <div>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='opencart' />
                    <Header.Content>Extendimos el cyberweek!</Header.Content>
                </Header>
                <Dimmer active={loading}>
                    <Loader />
                </Dimmer>
                
                <Slider {...sliderSettings}>
                    {
                        allProducts.map((data) => {
                            return(
                                <Card style={{marginLeft:'auto', marginRight:'auto'}}>
                                    <Card.Content style={{backgroundImage:`url(${data.image})`, backgroundPosition: '25% 75%', opacity: '.85', minHeight:'15em'}}>
                                        <Card.Header>
                                        <Link to={`/product-detail/${data.id}`}>
                                            <Label color='black' size='huge' horizontal>
                                                {data.title}
                                            </Label>
                                        </Link>
                                        </Card.Header>
                                        <Card.Description>
                                            <Link to={`/product-detail/${data.id}`}>
                                                <Label as='a' color='red' image>
                                                <b>$ {data.price}</b>&nbsp;
                                                <Label.Detail>Oferta</Label.Detail>
                                                </Label>
                                            </Link>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            );
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}

export default Home
