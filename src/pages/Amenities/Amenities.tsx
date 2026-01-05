import React from 'react';
import PageHero from '../../components/PageHero';
import { motion } from 'framer-motion';
import {
    FaWifi, FaSwimmingPool, FaParking, FaShieldAlt,
    FaUtensils, FaConciergeBell, FaTv, FaBolt,
    FaSnowflake, FaCar
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Amenities: React.FC = () => {
    const navigate = useNavigate();

    const amenities = [
        { icon: FaBolt, title: "24/7 Power Supply", desc: "Uninterrupted electricity with industrial standby generators ensuring your comfort is never compromised." },
        { icon: FaWifi, title: "High-Speed WiFi", desc: "Complimentary fiber-optic internet connection throughout the hotel for seamless connectivity." },
        { icon: FaShieldAlt, title: "24/7 Security", desc: "Round-the-clock CCTV surveillance and trained security personnel for your peace of mind." },
        { icon: FaSwimmingPool, title: "Outdoor Pool", desc: "Take a refreshing dip in our crystal-clear swimming pool with poolside service." },
        { icon: FaUtensils, title: "Fine Dining", desc: "Savor exquisite local and continental cuisine prepared by our world-class chefs." },
        { icon: FaConciergeBell, title: "Room Service", desc: "24-hour in-room dining and prompt service at the touch of a button." },
        { icon: FaSnowflake, title: "Climate Control", desc: "Individually controlled air conditioning in all rooms and public spaces." },
        { icon: FaTv, title: "Entertainment", desc: "Smart TVs with DSTV, Netflix, and premium streaming services in every room." },
        { icon: FaParking, title: "Secure Parking", desc: "Ample, well-lit, and secure parking space for all our valued guests." },
        { icon: FaCar, title: "Airport Shuttle", desc: "Convenient airport pickup and drop-off services available upon request." },
    ];

    return (
        <div className="amenities-page">
            <PageHero
                title="Our Amenities"
                subtitle="LUXURY FEATURES"
                description="Experience world-class facilities designed for your ultimate comfort"
                backgroundImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            />

            {/* Main Amenities Grid */}
            <section className="amenities-grid-section">
                <div className="container">
                    <div className="amenities-intro">
                        <span className="section-label">What We Offer</span>
                        <h2 className="section-title-large">Premium Facilities & Services</h2>
                        <p className="section-subtitle">
                            Every detail has been thoughtfully curated to ensure your stay is nothing short of exceptional.
                        </p>
                    </div>

                    <div className="amenities-grid">
                        {amenities.map((item, index) => (
                            <motion.div
                                key={index}
                                className="amenity-card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.08, duration: 0.5 }}
                            >
                                <div className="amenity-icon-wrap">
                                    <item.icon />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="amenities-cta">
                <div className="container">
                    <motion.div
                        className="cta-content"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Ready to Experience Luxury?</h2>
                        <p>Book your stay today and indulge in our world-class amenities.</p>
                        <button className="btn-cta-gold" onClick={() => navigate('/booking')}>
                            Reserve Your Room
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Amenities;
