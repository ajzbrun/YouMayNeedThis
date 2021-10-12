import React from 'react'
import { Link } from 'react-router-dom';

//components
import CartWidget from '../CartWidget/CartWidget'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">YouMayNeedThis</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Products">Productos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Contact">Contacto</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <CartWidget itemsCount="0" />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
