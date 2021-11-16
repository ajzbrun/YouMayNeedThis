import React from 'react'
import './styles.css';

const Footer = () => {
    return (
        <div class="container-fluid mt-5" style={{position: 'relative', bottom: '0'}}>
            <div class="card mx-5">
                <div class="row mb-4">
                    <div class="col-md-4 col-sm-11 col-xs-11">
                        <div class="footer-text pull-left">
                            <div class="d-flex">
                                <h1 class="font-weight-bold mr-2 px-3" style={{color:'#16151a', backgroundColor:'#d1d1d1'}}>You</h1>
                                <h1 style={{color: '#d1d1d1'}}>May</h1>
                                <h1 class="font-weight-bold mr-2 px-3" style={{color:'#16151a', backgroundColor:'#d1d1d1'}}>Need</h1>
                                <h1 style={{color: '#d1d1d1'}}>This</h1>
                            </div>
                            <p class="card-text">Ahora comprar por internet, es mucho m&aacute;s f&aacute;cil.</p>
                            <div class="social mt-2 mb-3"> <i class="fa fa-facebook-official fa-lg"></i> <i class="fa fa-instagram fa-lg"></i> <i class="fa fa-twitter fa-lg"></i> <i class="fa fa-linkedin-square fa-lg"></i> <i class="fa fa-facebook"></i> </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-sm-1 col-xs-1 mb-2"></div>
                </div>
                <div class="divider mb-4"> </div>
                <div class="row" style={{fontSize:'10px'}}>
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <div class="pull-left">
                            <p>2021 <i class="fa fa-copyright"></i> AJZ Soft</p>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <div class="pull-right mr-4 d-flex policy">
                            <div>Terminoss de uso</div>
                            <div>Pol&iacute;tica de privacidad</div>
                            <div>Pol&iacute;tica de cookies</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
