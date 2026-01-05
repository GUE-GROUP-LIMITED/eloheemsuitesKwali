import React, { useState } from 'react';
import PageHero from '../../components/PageHero';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

const reviews = [
    {
        text: "A wonderful stay! The Royal Room was cozy and the staff were incredibly welcoming. The attention to detail and the quality of service exceeded all my expectations.",
        author: "Sarah Mitchell",
        role: "Guest from United Kingdom",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
        text: "The Golden Hall was perfect for our family event. Everything was flawless! The venue was beautifully decorated and the catering was exceptional.",
        author: "Ahmed Khalil",
        role: "Event Host, Nigeria",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    },
    {
        text: "Luxury at its best! The Executive Suite exceeded my expectations. Perfect for business travelers who appreciate quality and comfort.",
        author: "Emily Richards",
        role: "Business Traveler, USA",
        rating: 5,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=688&q=80"
    },
    {
        text: "Eloheem Suites is truly a hidden gem in Kwali. The serene environment and top-notch facilities made our anniversary celebration unforgettable.",
        author: "David & Grace",
        role: "Celebrating Couple, Lagos",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80"
    }
];

const ReviewsPage: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    return (
        <div className="reviews-page">
            <PageHero
                title="Guest Reviews"
                subtitle="TESTIMONIALS"
                description="Hear what our valued guests have to say about their experience"
                backgroundImage="https://codesnippet-741238344.imgix.net/eloheem/_11A2439.JPG"
            />

            {/* Featured Review Slider */}
            <section className="reviews-featured-section">
                <div className="container">
                    <div className="reviews-slider-wrapper">
                        <button className="review-nav-btn prev" onClick={prevReview}>
                            <FaChevronLeft />
                        </button>

                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={currentIndex}
                                className="featured-review"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="review-quote-icon">
                                    <FaQuoteLeft />
                                </div>

                                <p className="review-text">{reviews[currentIndex].text}</p>

                                <div className="review-rating">
                                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>

                                <div className="review-author">
                                    <img src={reviews[currentIndex].image} alt={reviews[currentIndex].author} />
                                    <div className="author-details">
                                        <h4>{reviews[currentIndex].author}</h4>
                                        <p>{reviews[currentIndex].role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        <button className="review-nav-btn next" onClick={nextReview}>
                            <FaChevronRight />
                        </button>
                    </div>

                    <div className="reviews-dots">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* All Reviews Grid */}
            <section className="reviews-grid-section">
                <div className="container">
                    <div className="reviews-grid-header">
                        <span className="section-label">All Reviews</span>
                        <h2>What Our Guests Say</h2>
                    </div>

                    <div className="reviews-grid">
                        {reviews.map((review, index) => (
                            <motion.div
                                key={index}
                                className="review-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="review-card-header">
                                    <img src={review.image} alt={review.author} />
                                    <div>
                                        <h4>{review.author}</h4>
                                        <p>{review.role}</p>
                                    </div>
                                </div>
                                <div className="review-card-rating">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>
                                <p className="review-card-text">{review.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ReviewsPage;
