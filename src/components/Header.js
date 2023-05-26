import React, {useState} from 'react';

import {Link, useLocation} from "react-router-dom";

import logo from './company.png';

const Header = () => {
    const [activeTab, setActivTab] = useState("Home");
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };
    return ( 
        <>
        
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <div className="navbar-brand">
                    <img src={logo} alt="logo" />
                </div>
                <button className="btn btn-secondary d-flex" onClick={toggleSideNav}> 
                    <i className="bi bi-list"></i>
                </button>
                {isSideNavOpen && (
                    <div className="side-nav">
                        {/* Side Nav Content Goes Here */}
                        <ul className="nav">
                            <Link to='/'>
                                <li className="nav-item active">
                                    <label className="nav-link active">Home</label>
                                </li>
                            </Link>
                            <Link to='/employee'>
                            <li className="nav-item active">
                                <label className="nav-link ">Employee</label>
                            </li>
                            </Link>
                            <Link to='/extra-hours'>
                            <li className="nav-item active">
                                <label className="nav-link ">Extra Hours</label>
                            </li>
                            </Link>
                            <Link to='/order'>
                            <li className="nav-item active">
                                <label className="nav-link">Order</label>
                            </li>
                            </Link>
                            
                        </ul>
                        
                    </div>
                )}
            </div>
        </nav>
        </>
     );
}
 
export default Header;
