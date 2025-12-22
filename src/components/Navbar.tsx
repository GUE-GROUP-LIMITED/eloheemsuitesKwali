import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f3d3e] shadow-lg py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 z-50">
                    {/* Placeholder for Logo Image, using Text for now */}
                    <h1 className="text-2xl font-bold font-serif text-white tracking-wider">
                        ELOHEEM<span className="text-[#c9a66b]">SUITES</span>
                    </h1>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-8 text-white font-medium">
                    {['Home', 'Rooms', 'Amenities', 'Reviews', 'Contact'].map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                className="hover:text-[#c9a66b] transition-colors uppercase text-sm tracking-wide"
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Book Now Button */}
                <div className="hidden md:block">
                    <a href="#booking" className="px-6 py-2 border border-[#c9a66b] text-[#c9a66b] hover:bg-[#c9a66b] hover:text-white transition-all duration-300 rounded-full font-semibold uppercase text-xs tracking-wider">
                        Book Your Stay
                    </a>
                </div>


                {/* Mobile Hamburger */}
                <button
                    className="md:hidden text-white text-2xl z-50 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-0 left-0 w-full h-screen bg-[#121212] flex flex-col justify-center items-center space-y-8 md:hidden"
                        >
                            {['Home', 'Rooms', 'Amenities', 'Reviews', 'Contact'].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-2xl text-white font-serif hover:text-[#c9a66b]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
