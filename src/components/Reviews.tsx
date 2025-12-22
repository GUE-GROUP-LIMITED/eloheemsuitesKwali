import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const reviews = [
    {
        text: "I just wanted to share a quick note and let you know that you guys do a really good job.",
        author: "Rohan Sing",
        role: "Project Manager, Airflow Tech Inc",
        result: "", // Optional specific result text if needed
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80"
    },
    // Add more if needed for a slider later
];

const Reviews: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <section className="client-feedback-section">
            <div className="container relative">

                {/* Header Decoration */}
                <div className="feedback-header">
                    <span>CLIENT FEEDBACK</span>
                    <div className="feedback-line"></div>
                </div>

                {/* Top Right Decoration */}
                <div className="absolute top-0 right-0 p-4">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="feedback-content">
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
                                <path d="M0,10 Q20,20 40,10 T80,10 T120,10" fill="none" stroke="white" strokeWidth="2" />
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
