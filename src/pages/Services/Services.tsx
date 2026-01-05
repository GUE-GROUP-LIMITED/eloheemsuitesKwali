import React from 'react';
import { FaCamera, FaVideo, FaUtensils, FaWifi, FaCar, FaUserShield, FaTshirt, FaPaintBrush, FaShuttleVan, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageHero from '../../components/PageHero';

const Services: React.FC = () => {
    const navigate = useNavigate();

    const services = [
        {
            icon: FaCamera,
            title: "Photography",
            description: "Capture your precious moments with our professional photography services available on request.",
            category: "Media"
        },
        {
            icon: FaVideo,
            title: "Projector Rental",
            description: "High-definition projectors for your business meetings, seminars, and movie nights.",
            category: "Equipment"
        },
        {
            icon: FaUtensils,
            title: "Fine Dining",
            description: "Exquisite local and international cuisine prepared by our award-winning chefs.",
            category: "Dining"
        },
        {
            icon: FaWifi,
            title: "High-Speed WiFi",
            description: "Stay connected with our complimentary 24/7 fiber-optic internet access.",
            category: "Connectivity"
        },
        {
            icon: FaCar,
            title: "Secure Parking",
            description: "Spacious and well-lit parking space with 24/7 security for all guests.",
            category: "Facilities"
        },
        {
            icon: FaUserShield,
            title: "24/7 Security",
            description: "Your safety is our priority with round-the-clock security and CCTV surveillance.",
            category: "Safety"
        },
        {
            icon: FaTshirt,
            title: "Laundry Service",
            description: "Professional laundry and dry cleaning services to keep you looking your best.",
            category: "Housekeeping"
        },
        {
            icon: FaPaintBrush,
            title: "Event Decoration",
            description: "Transform our halls into your dream venue with our expert decoration partners.",
            category: "Events"
        },
        {
            icon: FaShuttleVan,
            title: "Airport Shuttle",
            description: "Convenient and safe transportation to and from the airport upon request.",
            category: "Transport"
        }
    ];

    return (
        <div className="services-page">
            <PageHero
                title="Our Services"
                subtitle="WHAT WE OFFER"
                description="World-class hospitality services tailored to exceed your expectations"
                backgroundImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            />

            {/* Services Grid Section */}
            <section className="services-grid-section">
                <div className="container">
                    <div className="services-intro">
                        <span className="section-label">Premium Services</span>
                        <h2 className="services-section-title">Everything You Need</h2>
                        <p className="services-section-desc">
                            From the moment you arrive until your departure, our dedicated team ensures every aspect of your stay is exceptional.
                        </p>
                    </div>

                    <div className="services-grid">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className="service-card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.5 }}
                            >
                                <div className="service-card-inner">
                                    <span className="service-category">{service.category}</span>
                                    <div className="service-icon">
                                        <service.icon />
                                    </div>
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>
                                    <div className="service-hover-line"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="services-cta-section">
                <div className="container">
                    <motion.div
                        className="services-cta-content"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Need a Custom Service?</h2>
                        <p>Our concierge team is ready to accommodate any special requests to make your stay perfect.</p>
                        <div className="cta-buttons">
                            <button className="btn-cta-primary" onClick={() => navigate('/contact')}>
                                Contact Us <FaArrowRight />
                            </button>
                            <button className="btn-cta-secondary" onClick={() => navigate('/booking')}>
                                Book Your Stay
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;
