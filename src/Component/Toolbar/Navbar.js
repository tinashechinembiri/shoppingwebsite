import React from 'react';
import './Navbar.css'
import Button from './Button'

const Navbar = props=> (
    <header className="navbar">
        <nav className="nav">
            <div>
                <Button click={props.drawerClickHandler}/>
            </div>
            <div className="logo"> <a href="/"> the log </a></div>
            <div className="make-space"/>
            <div className="nav-items">
                <ul>
                    <li><a href="/"> Men</a></li>
                    <li><a href="/women"> women</a></li>
                </ul>
            </div>
        </nav>
    </header>
);
export default Navbar;