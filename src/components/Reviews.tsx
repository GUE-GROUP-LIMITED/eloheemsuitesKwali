import React from 'react';
import SectionHeading from './SectionHeading';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const reviews = [
    {
        text: "A wonderful stay! The Royal Room was cozy and the staff were incredibly welcoming.",
        author: "Sarah M.",
        location: "UK",
        rating: 4
    },
    {
        text: "The Golden Hall was perfect for our family event. Everything was flawless!",
        author: "Ahmed K.",
        location: "Nigeria",
        rating: 5
    },
    {
        text: "Luxury at its best! The Executive Suite exceeded my expectations.",
        author: "Emily R.",
        location: "USA",
        rating: 4
    }
];

const Reviews: React.FC = () => {
    return (
        <section id="reviews" className="reviews-section">
            <div className="container">
                <SectionHeading
                    title="Guest Reviews"
                    subtitle="What People Say"
                />

                <div className="room-grid"> {/* Reusing grid layout */}
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            className="review-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <FaQuoteLeft className="review-quote-icon" />
                            <p className="review-text">"{review.text}"</p>

                            <div className="review-footer">
                                <div className="review-author">
                                    <h4>{review.author}</h4>
                                    <span>{review.location}</span>
                                </div>
                                <div className="review-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < review.rating ? "star-filled" : "star-empty"} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
