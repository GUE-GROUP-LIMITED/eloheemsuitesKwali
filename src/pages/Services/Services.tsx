import React from 'react';
import { FaCamera, FaVideo, FaUtensils, FaWifi, FaCar, FaUserShield, FaTshirt, FaPaintBrush, FaShuttleVan, FaArrowRight, FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Services: React.FC = () => {
    const navigate = useNavigate();

    const services = [
        {
            icon: FaCamera,
            title: "PHOTOGRAPHY",
            description: "Capture your precious moments with our professional photography services available on request.",
        },
        {
            icon: FaVideo,
            title: "PROJECTOR RENTAL",
            description: "High-definition projectors for your business meetings, seminars, and movie nights.",
        },
        {
            icon: FaUtensils,
            title: "CATERING",
            description: "Exquisite local and international cuisine prepared by our top chefs for your events.",
        },
        {
            icon: FaWifi,
            title: "HIGH-SPEED WIFI",
            description: "Stay connected with our complimentary 24/7 high-speed internet access.",
        },
        {
            icon: FaCar,
            title: "AMPLE PARKING",
            description: "Secure and spacious parking space for all our guests and event attendees.",
        },
        {
            icon: FaUserShield,
            title: "24/7 SECURITY",
            description: "Your safety is our priority with round-the-clock security personnel and surveillance.",
        },
        {
            icon: FaTshirt,
            title: "LAUNDRY SERVICE",
            description: "Professional laundry and dry cleaning services to keep you looking your best.",
        },
        {
            icon: FaPaintBrush,
            title: "EVENT DECOR",
            description: "Transform our halls into your dream venue with our expert decoration partners.",
        },
        {
            icon: FaShuttleVan,
            title: "AIRPORT PICKUP",
            description: "Convenient and safe transportation to and from the airport on request.",
        }
    ];

    return (
        <div className="services-page-container">
            <div className="container services-inner">

                {/* Top Section */}
                <div className="services-hero">
                    <div className="services-hero-text">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="offer-tag"
                        >
                            <div className="tag-line"></div>
                            <span>What We Offer</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            OUR<br />SERVICES
                        </motion.h1>
                    </div>

                    <div className="services-hero-desc">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            We provide top-notch hospitality services tailored to your needs. From high-speed internet to exquisite dining, we ensure your stay is comfortable and memorable.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="btn-all-services"
                            onClick={() => navigate('/contact')}
                        >
                            Contact For Services
                        </motion.button>
                    </div>
                </div>

                <div className="services-main-content">
                    {/* Sidebar Indicator */}
                    <div className="services-sidebar">
                        <span className="scrolldown-text">SCROLL DOWN</span>
                        <div className="scroll-line"></div>
                        <div className="scroll-circle">
                            <FaArrowDown size={12} />
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="service-card-new group"
                            >
                                <div className="service-icon-new">
                                    <service.icon />
                                </div>
                                <h3 className="service-title-new">{service.title}</h3>
                                <p className="service-desc-new">
                                    {service.description}
                                </p>

                                <div className="service-readmore">
                                    <span>READ MORE</span>
                                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                                </div>

                                {/* Bottom Border Highlight */}
                                <div className="service-highlight"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Services;
