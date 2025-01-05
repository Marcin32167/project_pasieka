import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './_header.scss';

import logoBrand from '../../assets/pasieka_na_krynicy_brand.svg';

const Header = () => {
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

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="header">
            <div className="container__header">
                <NavLink to="/" className="logo">
                    <img className="img__logo" src={logoBrand} alt="Logo" />
                </NavLink>
                <div className="wrapper__nav">
                    <div className="wrapper__btns--nav">
                        <nav className={`navigation ${isMobile && menuOpen ? 'open' : ''}`}>
                            {isMobile && (
                                <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                </div>
                            )}
                            <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
                                <li className="nav__item">
                                    <NavLink to="/" onClick={closeMenu}>
                                        Strona główna
                                    </NavLink>
                                </li>
                                <li className="nav__item">
                                    <NavLink to="/o-nas" onClick={closeMenu}>
                                        O nas
                                    </NavLink>
                                </li>
                                <li className="nav__item">
                                    <NavLink to="/blog" onClick={closeMenu}>
                                        Blog
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="wrapper__nav--contact">
                <a href="#" class="btn__main">Kontakt</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
