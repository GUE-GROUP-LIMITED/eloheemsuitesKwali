import React from 'react';
import PageHero from '../../components/PageHero';
import { motion } from 'framer-motion';
import { FaRegStar, FaRegUser, FaRegHeart, FaRegCheckCircle } from 'react-icons/fa';

const About: React.FC = () => {
    return (
        <div className="about-page">

            {/* 1. Header (Preserved) */}
            <PageHero
                title="About Us"
                subtitle="THE ELOHEEM EXPERIENCE"
                description="Redefining hospitality in Kwali with an unwavering commitment to luxury and comfort."
                backgroundImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            />

            {/* 2. The Story Section */}
            <div className="story-section">
                <div className="container story-inner">

                    {/* Image Column */}
                    <motion.div
                        className="story-image-col"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="story-img-wrapper">
                            <img
                                src="https://codesnippet-741238344.imgix.net/eloheem/eloheem2.jpg"
                                alt="Eloheem Interior Detail"
                            />
                        </div>
                    </motion.div>

                    {/* Text Column */}
                    <motion.div
                        className="story-text-col"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="story-pretitle">Our Story</span>

                        <h2 className="story-title">
                            The Story of Eloheem<br />Suites
                        </h2>

                        <div className="story-desc">
                            <p>
                                Eloheem Suites in Kwali is a fancy place to stay. We make sure you have a top-notch vacation by providing luxurious hotel rooms, events halls, excellent service, and friendly staff.
                            </p>
                            <p>
                                Our hotel is the perfect place to relax and have fun with many activities available. We offer an extraordinary escape with our meticulously designed, opulent rooms and suites, providing the pinnacle of comfort and sophistication.
                            </p>
                            <p>
                                Each space is thoughtfully curated to ensure a stay like no other in the heart of Kwali. Complementing our luxurious accommodations, our exceptional services include personalized concierge assistance. Our dedicated team is committed to exceeding your expectations, ensuring every moment of your stay is marked by elegance and indulgence.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 3. Our Values Section */}
            <div className="values-section">
                <div className="container">

                    {/* Centered Heading */}
                    <div className="values-header">
                        <span className="values-pretitle">Our Values</span>
                        <h2 className="values-title">What We Stand For</h2>
                        <p className="values-subtitle">
                            Our core values guide everything we do, ensuring exceptional experiences for every guest.
                        </p>
                    </div>

                    {/* 4 Cards Grid */}
                    <div className="values-grid">
                        {/* Excellence */}
                        <motion.div
                            className="value-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="value-icon">
                                <FaRegStar />
                            </div>
                            <h3>Excellence</h3>
                            <p>We strive for excellence in every aspect of our service, ensuring top-notch quality.</p>
                        </motion.div>

                        {/* Guest-Centric */}
                        <motion.div
                            className="value-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="value-icon">
                                <FaRegUser />
                            </div>
                            <h3>Guest-Centric</h3>
                            <p>Our guests are at the heart of everything we do. Your comfort is our priority.</p>
                        </motion.div>

                        {/* Hospitality */}
                        <motion.div
                            className="value-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="value-icon">
                                <FaRegHeart />
                            </div>
                            <h3>Hospitality</h3>
                            <p>Warm, genuine hospitality that makes you feel at home away from home.</p>
                        </motion.div>

                        {/* Trust */}
                        <motion.div
                            className="value-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="value-icon">
                                <FaRegCheckCircle />
                            </div>
                            <h3>Trust</h3>
                            <p>Building lasting relationships through trust, integrity, and reliability.</p>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* 4. Visual Footer / Signature */}
            <div className="about-footer">
                <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Comfort. Class. Culture.
                </motion.h2>
                <div className="signature-line"></div>
            </div>
        </div>
    );
};

export default About;
