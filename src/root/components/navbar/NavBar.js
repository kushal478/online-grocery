import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component
{
   

    render()
    {
        return(
            <React.Fragment>
                <nav className="navbar navbar-dark bg-danger navbar-expand-sm">
                    <div className="container">
                        <Link to="/" className="navbar-brand">
                            <i className="fa fa-shopping-cart"/>BigBasket
                        </Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/product/list" className="nav-link">
                                    product</Link>
                                </li>                          

                            </ul>
                            <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/product/admin" className="nav-link">Admin
                                </Link>

                            </li>
                            </ul>
                            

                        </div>
                    </div>
                </nav>

            </React.Fragment>
        );
    }
}

export default NavBar;