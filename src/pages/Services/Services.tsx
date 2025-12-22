import React from 'react';
import { FaCamera, FaVideo, FaUtensils, FaWifi, FaCar, FaUserShield, FaTshirt, FaPaintBrush, FaShuttleVan, FaArrowRight, FaArrowDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
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
            <div className="container relative mx-auto px-4 pt-32 pb-20">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-10">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 mb-4"
                        >
                            <div className="h-[2px] w-10 bg-[#c9a66b]"></div>
                            <span className="text-[#c9a66b] uppercase tracking-widest text-xs font-bold">What We Offer</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-sans font-bold text-white leading-tight"
                        >
                            OUR<br />SERVICES
                        </motion.h1>
                    </div>

                    <div className="lg:w-1/2 flex flex-col items-start lg:items-end">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 max-w-md mb-8 lg:text-right leading-relaxed"
                        >
                            There are many variations of services available, but the majority have suffered alteration in some form. We provide top-notch hospitality services tailored to your needs.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="btn-all-services"
                        >
                            Contact For Services
                        </motion.button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Sidebar Indicator */}
                    <div className="hidden lg:flex flex-col items-center justify-start pt-10 w-24 flex-shrink-0">
                        <span className="scrolldown-text">SCROLL DOWN</span>
                        <div className="h-24 w-[1px] bg-gray-700 my-4"></div>
                        <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-white animate-bounce">
                            <FaArrowDown size={12} />
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
