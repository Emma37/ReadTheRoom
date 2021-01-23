import React from 'react';
import { Link } from "react-router-dom";
import logo from '../images/logo.png'


const NavBar = () => {
    return (
        <>
            <div className="navbar bg-dark py-3 mb-4">
                <div className="container">
                    <Link to="/" className="navbar__brand">
                        <img className="navbar__logo" src={logo} alt="Read the Room logo"/>
                        <span className="navbar__title px-3">
                            Read the Room
                        </span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NavBar;
