import React, { useState, useEffect } from 'react';
import { Dimmer, Loader, Card, Header, Icon, Label, Image, Grid } from 'semantic-ui-react';
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
                    <Header.Content><i>Extendimos el cyberweek!</i></Header.Content>
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

                <br /><br />
                <hr/>
                <br />
                <h4>OPINIONES SOBRE <i><b>YouMayNeedThis</b></i></h4>
                <br />
                <hr/>

                <Grid centered celled='internally' style={{fontSize:'140%', color:'#707070'}}>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <p>
                                <span><i>Una de los mejores e-commerce nacidos la pandemia. Simple, rápido y a precio.</i></span>
                                <br/><br/>
                                <span style={{fontSize:'80%', float:'right'}}><b>-Juli&aacute;n P&eacute;rez. Periodista y analista de negocios en auge. Radio MZ.</b></span>
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <p>
                                <span><i>M&aacute;s all&aacute; de la calidad de la web, el servicio es increíble, los productos llegan a las pocas horas, a veces minutos.</i></span>
                                <br/><br/>
                                <span style={{fontSize:'80%', float:'right'}}><b>-Esteban Quir&oacute;z. Profesor de CoderHouse.</b></span>
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <p>
                                <span><i>Un servicio que mejor&oacute; la experiencia de compras online en pandemia. 10 puntos.</i></span>
                                <br/><br/>
                                <span style={{fontSize:'80%', float:'right'}}><b>-Roberto Ortega. Director general Planta Pacheco Ford.</b></span>
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        </div>
    )
}

export default Home
