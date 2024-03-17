// import React from 'react';
// // import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'
import smoothScroll from 'smooth-scroll-into-view-if-needed';

import React from 'react';
import { NavLink} from 'react-router-dom';

function NavBar() {
    const handleClick = (id) => {
        const element = document.getElementById(id);
        smoothScroll(element);
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-blurred navbar-wrapper">
            <div className="container-fluid">
                <NavLink className="navbar-brand logo-text" to="/" onClick={() => handleClick('home')}>voyage</NavLink>

                <div className="collapse navbar-collapse justify-content-end mr-3 ml-3 navbar-links" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" onClick={() => handleClick('home')} activeClassName="active">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/destination" onClick={() => handleClick('destination')} activeClassName="active">Destination</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact" onClick={() => handleClick('contact')} activeClassName="active">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default NavBar;
