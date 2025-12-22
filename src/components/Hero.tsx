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
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="home" className="relative w-full h-screen overflow-hidden bg-black">
            {/* Background Slider */}
            <AnimatePresence mode='wait'>
                <motion.img
                    key={currentImage}
                    src={heroImages[currentImage]}
                    alt="Hero Background"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-[#c9a66b] uppercase tracking-[0.2em] mb-4 text-sm md:text-base font-semibold"
                >
                    Welcome to Eloheem Suites
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-9xl font-serif text-white mb-6 leading-tight"
                >
                    Comfort is <br /> Our Culture
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="text-gray-300 max-w-2xl text-lg md:text-xl font-light mb-10"
                >
                    Experience luxury and comfort at our holiness camp ground in Kwali, Abuja.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <a href="#rooms" className="px-8 py-4 bg-[#c9a66b] text-white font-semibold rounded-full hover:bg-[#8e7547] transition-all transform hover:scale-105 shadow-xl">
                        Explore Rooms
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
