import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top Bar (Contact Info) */}
            <div className="top-bar fixed w-full z-[1001]">
                <span><FaPhoneAlt size={12} /> 07061266542</span>
                <span><FaEnvelope size={12} /> info@eloheemsuites.com</span>
            </div>

            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="nav-container">
                    {/* Left Menu */}
                    <ul className="nav-menu">
                        <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink></li>
                        <li><NavLink to="/rooms" className={({ isActive }) => (isActive ? 'active' : '')}>Rooms</NavLink></li>
                        <li><NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>Our Services</NavLink></li>
                    </ul>

                    {/* Logo Center */}
                    <div className="nav-logo">
                        {/* Replace with actual logo image if available, else text */}
                        <h1>ELOHEEM<span>SUITES</span></h1>
                    </div>

                    {/* Right Menu */}
                    <ul className="nav-menu">
                        <li><NavLink to="/gallery" className={({ isActive }) => (isActive ? 'active' : '')}>Gallery</NavLink></li>
                        <li><NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink></li>
                        <li><NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink></li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
