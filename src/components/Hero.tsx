import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
    return (
        <section className="hero">
            {/* Static Background Image */}
            <img
                src="https://codesnippet-741238344.imgix.net/eloheem/eloheem.jpg"
                alt="Modern Luxury Residence"
                className="hero-image"
            />

            {/* Dark Overlay for Text Readability */}
            <div className="hero-overlay"></div>

            {/* Main Content - Centered */}
            <div className="container hero-container-center">
                <div className="hero-text-center">
                    <motion.h1
                        className="hero-title-centered"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        More Comfortable. <br /> More Classy.
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle-centered"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        Make your living experience even more memorable.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
