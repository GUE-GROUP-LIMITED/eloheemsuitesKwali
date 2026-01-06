import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const cardData = [
    { image: "https://codesnippet-741238344.imgix.net/eloheem/_11A2348.JPG", title: "Presidential Suite" },
    { image: "https://codesnippet-741238344.imgix.net/eloheem/eloheem4.jpg", title: "Executive Suite" },
    { image: "https://codesnippet-741238344.imgix.net/eloheem/eloheem3.jpg", title: "Standard Room" }
];



const Hero: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % cardData.length);
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
                       <Link to='/booking'> <button className="btn-book-hero">Book Now</button></Link>
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
                                    key={currentIndex}
                                    src={cardData[currentIndex].image}
                                    alt={cardData[currentIndex].title}
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
                                <AnimatePresence mode='wait'>
                                    <motion.h3
                                        key={currentIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {cardData[currentIndex].title}
                                    </motion.h3>
                                </AnimatePresence>
                            </div>
                            <div className="hero-card-location">
                                <FaMapMarkerAlt /> Kwali, Abuja
                            </div>
                            {/* Dots for carousel visual */}
                            <div className="hero-card-dots">
                                {cardData.map((_, index) => (
                                    <span
                                        key={index}
                                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentIndex(index)}
                                    ></span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>


        </section>
    );
};

export default Hero;
