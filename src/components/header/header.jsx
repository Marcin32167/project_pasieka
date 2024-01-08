import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './_header.scss';

import PasiekaNaKrynicyBrand from '../../assets/pasieka_na_krynicy_brand.svg';

const Header = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleWindowSizeChange = () => {
            setIsMobile(window.innerWidth < 992);
        };

        handleWindowSizeChange();
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="header">
            <div className={"container__header"}>
                <Link to="/" className="logo">
                    <img className="brand" src="/assets/pasieka_na_krynicy_brand.svg"/>
                </Link>
                <div className="wrapper__nav">
                    <div className="wrapper__btns--nav">

                    </div>
                    <nav className={`navigation ${isMobile && menuOpen ? 'open' : ''}`}>
                        <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </div>
                        <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
                            <li className="nav-item">
                                <NavLink to="/" onClick={closeMenu}>
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about"  onClick={closeMenu}>
                                    About
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
