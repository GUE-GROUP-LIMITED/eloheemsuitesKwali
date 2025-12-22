import React, { useState } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
    {
        text: "A wonderful stay! The Royal Room was cozy and the staff were incredibly welcoming.",
        author: "Sarah M.",
        role: "Guest from UK",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
        text: "The Golden Hall was perfect for our family event. Everything was flawless!",
        author: "Ahmed K.",
        role: "Event Host, Nigeria",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
        text: "Luxury at its best! The Executive Suite exceeded my expectations.",
        author: "Emily R.",
        role: "Business Traveler, USA",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80"
    }
];

const Reviews: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    return (
        <section className="client-feedback-section">
            <div className="container relative">

                {/* Header Decoration */}
                <div className="feedback-header">
                    <span>GUEST REVIEWS</span>
                    <div className="feedback-line"></div>
                </div>

                {/* Top Right Decoration */}
                <div className="absolute top-0 right-0 p-4">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="feedback-content">
                    {/* Controls */}
                    <button className="slider-btn prev" onClick={prevReview}>
                        <FaChevronLeft />
                    </button>
                    <button className="slider-btn next" onClick={nextReview}>
                        <FaChevronRight />
                    </button>

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className="review-slide-content"
                        >
                            {/* Quote Icon */}
                            <div className="quote-icon-large">
                                <FaQuoteLeft />
                            </div>

                            {/* Main Quote Text */}
                            <div className="quote-text-container">
                                <h2>{reviews[currentIndex].text}</h2>
                            </div>

                            <div className="feedback-footer">
                                {/* Author Info */}
                                <div className="author-info">
                                    <h3>{reviews[currentIndex].author}</h3>
                                    <p>{reviews[currentIndex].role}</p>
                                    <svg className="wavy-line" width="100" height="15" viewBox="0 0 100 15">
                                        <path d="M0,10 Q20,20 40,10 T80,10 T120,10" fill="none" stroke="var(--secondary-color)" strokeWidth="2" />
                                    </svg>
                                </div>

                                {/* Image Shape */}
                                <div className="author-image-container">
                                    <div className="cross-shape-border">
                                        <div className="cross-shape">
                                            <img src={reviews[currentIndex].image} alt={reviews[currentIndex].author} />
                                        </div>
                                    </div>
                                    {/* Decorative doodles around image */}
                                    <div className="doodle-lines top-left"></div>
                                    <div className="doodle-lines bottom-right"></div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom Decoration */}
                <div className="absolute bottom-10 left-10 opacity-20">
                    <svg width="40" height="20" viewBox="0 0 40 20">
                        <path d="M0,10 Q10,0 20,10 T40,10" fill="none" stroke="white" strokeWidth="2" />
                        <path d="M0,15 Q10,5 20,15 T40,15" fill="none" stroke="white" strokeWidth="2" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
