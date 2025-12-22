import React from 'react';
import { FaCamera, FaVideo, FaUtensils, FaWifi, FaCar, FaUserShield } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
    const services = [
        {
            icon: FaCamera,
            title: "Photography",
            description: "Capture your precious moments with our professional photography services available on requests.",
            price: "₦10,000 / Session"
        },
        {
            icon: FaVideo,
            title: "Projector Rental",
            description: "High-definition projectors for your business meetings, seminars, and movie nights.",
            price: "₦5,000 / Day"
        },
        {
            icon: FaUtensils,
            title: "Catering",
            description: "Exquisite local and international cuisine prepared by our top chefs for your events.",
            price: "Custom Quotes"
        },
        {
            icon: FaWifi,
            title: "High-Speed WiFi",
            description: "Stay connected with our complimentary 24/7 high-speed internet access throughout the premises.",
            price: "Free"
        },
        {
            icon: FaCar,
            title: "Ample Parking",
            description: "Secure and spacious parking space for all our guests and event attendees.",
            price: "Free"
        },
        {
            icon: FaUserShield,
            title: "24/7 Security",
            description: "Your safety is our priority with round-the-clock security personnel and surveillance.",
            price: "Included"
        }
    ];

    return (
        <div className="pt-24 min-h-screen bg-[#f3f4f6]">
            <div className="bg-[#0f1f1f] text-white py-20 text-center mb-10">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-serif"
                >
                    Our Services
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="opacity-70 mt-4 text-[#c9a66b] uppercase tracking-widest text-sm"
                >
                    More Than Just A Stay
                </motion.p>
            </div>

            <div className="container mx-auto px-4 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100"
                        >
                            <div className="h-14 w-14 bg-[#f0f0f0] group-hover:bg-[#c9a66b] rounded-full flex items-center justify-center mb-6 text-[#1e1e1e] group-hover:text-white text-2xl transition-colors duration-300">
                                <service.icon />
                            </div>
                            <h3 className="text-xl font-serif font-bold mb-3 text-[#1e1e1e]">{service.title}</h3>
                            <p className="text-gray-600 mb-6 leading-relaxed text-sm">{service.description}</p>
                            <div className="pt-4 border-t border-gray-100">
                                <span className="text-[#0f3d3e] font-bold text-lg">{service.price}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;

