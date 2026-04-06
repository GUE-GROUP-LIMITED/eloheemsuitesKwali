import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">

                    {/* Mobile Toggle Button (Left aligned on mobile usually, or right) */}
                    <div className="mobile-toggle" onClick={toggleMobileMenu}>
                        {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>

                    {/* Left Menu (Desktop) */}
                    <ul className="nav-menu">
                        <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
                        <li><NavLink to="/rooms" className={({ isActive }) => (isActive ? 'active' : '')}>Rooms</NavLink></li>
                        <li><NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>Our Services</NavLink></li>
                    </ul>

                    {/* Logo Center */}
                    <NavLink to="/" className="nav-logo">
                        <img
                            src="https://codesnippet-741238344.imgix.net/eloheem/PHOTO-2025-03-18-14-28-32-removebg-preview.png"
                            alt="Eloheem Suites"
                            className="logo-img"
                        />
                    </NavLink>

                    {/* Right Menu (Desktop) */}
                    <ul className="nav-menu">
                        <li><NavLink to="/gallery" className={({ isActive }) => (isActive ? 'active' : '')}>Gallery</NavLink></li>
                        <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink></li>
                    </ul>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0, x: '-100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="mobile-nav-list">
                            <li><NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink></li>
                            <li><NavLink to="/rooms" onClick={() => setMobileMenuOpen(false)}>Rooms</NavLink></li>
                            <li><NavLink to="/services" onClick={() => setMobileMenuOpen(false)}>Our Services</NavLink></li>
                            <li><NavLink to="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</NavLink></li>
                            <li><NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink></li>
                            <li><NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</NavLink></li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
