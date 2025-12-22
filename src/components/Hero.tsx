import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const heroImages = [
    "https://codesnippet-741238344.imgix.net/eloheem/eloheem.jpg",
    "https://codesnippet-741238344.imgix.net/eloheem/eloheem4.jpg",
    "https://codesnippet-741238344.imgix.net/eloheem/_11A2348.JPG"
];

const Hero: React.FC = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero">
            {/* Background Slideshow */}
            <AnimatePresence mode='wait'>
                <motion.img
                    key={currentImage}
                    src={heroImages[currentImage]}
                    alt="Hero Background"
                    className="hero-image"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                />
            </AnimatePresence>

            <div className="hero-overlay"></div>

            {/* Main Content */}
            <div className="hero-content">
                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    EXPERIENCE
                </motion.p>
                <motion.h1
                    className="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    A VACATION WITH CLASS
                </motion.h1>
                <motion.p
                    className="hero-quote"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                >
                    You know you deserve it!
                </motion.p>
            </div>

            {/* Booking Bar */}
            <motion.div
                className="booking-bar"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, type: 'spring', stiffness: 50 }}
            >
                <div className="booking-item">
                    <label>Check Availability:</label>
                    {/* Purely decorative label context */}
                </div>
                <div className="booking-item">
                    <label>Check In</label>
                    <input type="date" className="booking-input" />
                </div>
                <div className="booking-item">
                    <label>Check Out</label>
                    <input type="date" className="booking-input" />
                </div>
                <div className="booking-item">
                    <label>Persons</label>
                    <select className="booking-input">
                        <option>1 Person</option>
                        <option>2 Persons</option>
                        <option>Family</option>
                    </select>
                </div>
                <button className="booking-btn">Check</button>
            </motion.div>
        </section>
    );
};

export default Hero;
