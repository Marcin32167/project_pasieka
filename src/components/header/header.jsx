import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import './_header.scss';

import logoBrand from '../../assets/pasieka_na_krynicy_brand.svg';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleWindowSizeChange = useCallback(() => {
        const isMobileView = window.innerWidth < 992;
        setIsMobile(isMobileView);
        if (!isMobileView && menuOpen) {
            setMenuOpen(false);
        }
    }, [menuOpen]);

    useEffect(() => {
        let resizeTimer;
        const debouncedHandleWindowSizeChange = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(handleWindowSizeChange, 100);
        };

        handleWindowSizeChange();
        window.addEventListener('resize', debouncedHandleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', debouncedHandleWindowSizeChange);
            clearTimeout(resizeTimer);
        };
    }, [handleWindowSizeChange]);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    const closeMenu = () => setMenuOpen(false);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            toggleMenu();
        }
    };

    const handleMouseEnter = (index) => setHoveredIndex(index);
    const handleMouseLeave = () => setHoveredIndex(null);

    return (
        <header className="header">
            <div className="container__header">
                <NavLink to="/" className="logo">
                    <img className="img__logo" src={logoBrand} alt="Logo Pasieka na Krynicy" />
                </NavLink>
                <div className="wrapper__nav">
                    <div className="wrapper__btns--nav">
                        <nav className={`navigation ${isMobile && menuOpen ? 'open' : ''}`}>
                            {isMobile && (
                                <div
                                    className={`menu-toggle ${menuOpen ? 'open' : ''}`}
                                    onClick={toggleMenu}
                                    onKeyPress={handleKeyPress}
                                    role="button"
                                    tabIndex={0}
                                    aria-expanded={menuOpen}
                                    aria-label="Menu główne"
                                >
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                    <div className="bar"></div>
                                </div>
                            )}
                            <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
                                {['/', '/o-nas', '/blog'].map((path, index) => (
                                    <li
                                        key={index}
                                        className={`nav__item ${hoveredIndex !== null && hoveredIndex !== index ? 'faded' : ''}`}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <NavLink
                                            to={path}
                                            onClick={closeMenu}
                                            className={({ isActive }) => isActive ? 'active' : ''}
                                        >
                                            {path === '/' ? 'Strona główna' : path === '/o-nas' ? 'O nas' : 'Blog'}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="wrapper__nav--contact">
                    <NavLink
                        to="/kontakt"
                        className={({ isActive }) => `btn__main ${isActive ? 'active' : ''}`}
                    >
                        Kontakt
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default Header;
