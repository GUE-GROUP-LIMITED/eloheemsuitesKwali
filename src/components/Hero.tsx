import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';

const cardImages = [
    "https://codesnippet-741238344.imgix.net/eloheem/_11A2348.JPG",
    "https://codesnippet-741238344.imgix.net/eloheem/eloheem4.jpg",
    "https://codesnippet-741238344.imgix.net/eloheem/eloheem3.jpg"
];

const Hero: React.FC = () => {
    const [currentCardImage, setCurrentCardImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentCardImage((prev) => (prev + 1) % cardImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="hero">
            {/* Background Image */}
            <img
                src="https://codesnippet-741238344.imgix.net/eloheem/eloheem.jpg"
                alt="Eloheem Suites Exterior"
                className="hero-image"
            />

            {/* Gradient Overlay (Dark Teal Left -> Transparent Right) */}
            <div className="hero-overlay-split"></div>

            {/* Main Content Container */}
            <div className="container hero-container-split">

                {/* Left Column: Text & CTA */}
                <div className="hero-column-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h4 className="hero-brand-small">ELOHEEM'S HOTEL & SUITES</h4>
                        <h1 className="hero-title-serif">
                            Eloheem's A <br />
                            Sanctuary Of <br />
                            Elegance And <br />
                            Comfort.
                        </h1>
                        <p className="hero-desc-small">
                            Indulge in the pinnacle of luxury. Eloheem's Hotel offers an exquisite escape
                            with meticulously designed rooms, world-class amenities, and
                            unparalleled service in the heart of Kwali.
                        </p>
                        <button className="btn-book-hero">Book Now</button>
                    </motion.div>
                </div>

                {/* Right Column: Featured Room Card with Slider */}
                <div className="hero-column-right">
                    <motion.div
                        className="hero-room-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="hero-card-image-wrapper relative overflow-hidden">
                            <AnimatePresence mode='wait'>
                                <motion.img
                                    key={currentCardImage}
                                    src={cardImages[currentCardImage]}
                                    alt="Presidential Suite"
                                    className="hero-card-image absolute inset-0 w-full h-full object-cover"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </AnimatePresence>
                        </div>
                        <div className="hero-card-details">
                            <div className="hero-card-header">
                                <h3>Presidential Suite</h3>
                                <div className="hero-card-price">
                                    <span>₦20,000</span> /night
                                </div>
                            </div>
                            <div className="hero-card-location">
                                <FaMapMarkerAlt /> Kwali, Abuja
                            </div>
                            {/* Dots for carousel visual */}
                            <div className="hero-card-dots">
                                {cardImages.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`dot ${index === currentCardImage ? 'active' : ''}`}
                                        onClick={() => setCurrentCardImage(index)}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="hero-scroll-indicator"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
            >
                <span>Scroll Down</span>
                <div className="mouse-icon">
                    <div className="wheel"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
