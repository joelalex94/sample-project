import React, {useEffect, useState} from 'react';

import {Link, useLocation} from "react-router-dom";

import logo from './company.png';
import './Header.css';

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const location= useLocation();
    
    useEffect(() => {
        if(location.pathname == '/'){
            setActiveTab("Home");
        }else if (location.pathname == '/employee'){
            setActiveTab("Employee");
        }else if(location.pathname == '/extra-hour'){
            setActiveTab("Extrahour");
        }else if(location.pathname == '/order'){
            setActiveTab("Order");
        }

    },[location]);

    const toggleSideNav = () => {
        setIsSideNavOpen(!isSideNavOpen);
    };
    return ( 
        <>
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <img src={logo} alt="logo" />
                </div>
                <button className="btn btn-secondary d-flex"  onClick={toggleSideNav}> 
                    <i className="bi bi-list"></i>
                </button>
                {isSideNavOpen && (
                    <div className=" side-nav">
                        {/* Side Nav Content Goes Here */}
                        <ul className="navbar-nav">
                            <Link to='/'>
                                <li className="nav-item ">
                                    <label className={"nav-link " + (activeTab === "Home" ? 'active' : '')} onClick= { () => setActiveTab("Home")} >Home</label>
                                </li>
                            </Link>
                            <Link to='/employee'> 
                            <li className="nav-item">
                                <label  className={"nav-link " + (activeTab === "Employee" ? 'active' : '')} onClick= { () => setActiveTab("Employee")}>Employee</label>
                            </li>
                            </Link>
                            <Link to='/extra-hours'>
                            <li className="nav-item">
                                <label   className={"nav-link " + (activeTab === "Extrahour" ? 'active' : '')} onClick= { () => setActiveTab("Extrahour")}>Extra Hours</label>
                            </li>
                            </Link>
                            <Link to='/order'>
                            <li className="nav-item">
                                <label   className={"nav-link " + (activeTab === "Order" ? 'active' : '')} onClick= { () => setActiveTab("Order")}>Order</label>
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
