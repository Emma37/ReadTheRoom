import React from 'react';
import { Link } from "react-router-dom";


const NavBar = () => {
    return (
        <>
            <div className="bg-dark py-3">
                <Link to="/">
                    Read the Room
                </Link>
            </div>
        </>
    )
}

export default NavBar;
