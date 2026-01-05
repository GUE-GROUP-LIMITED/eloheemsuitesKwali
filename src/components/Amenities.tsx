import React from 'react';
import { rooms } from '../data/rooms';
import type { Room } from '../data/rooms';
import { motion } from 'framer-motion';
import { FaArrowRight, FaMapMarkerAlt, FaVideo, FaTag, FaBed, FaBuilding } from 'react-icons/fa';

interface AmenitiesProps {
    onBook: (room: Room) => void;
}

const categories = [
    { title: 'Standard Room', count: '10 Rooms', image: rooms.find(r => r.id === 'royal-room')?.images[0], icon: <FaBed /> },
    { title: 'Executive Suite', count: '5 Suites', image: rooms.find(r => r.id === 'executive-luxury-room')?.images[0], icon: <FaBuilding /> },
    { title: 'Event Hall', count: '2 Halls', image: rooms.find(r => r.id === 'golden-hall')?.images[0], icon: <FaVideo /> },
    { title: 'Grounds', count: '1 Ground', image: rooms.find(r => r.id === 'reception-ground')?.images[0], icon: <FaMapMarkerAlt /> },
];

const Amenities: React.FC<AmenitiesProps> = ({ onBook }) => {
    // Select first 3 rooms for the popular places grid
    const popularRooms = rooms.slice(0, 3);

    return (
        <section className="amenities-section">
            <div className="container">

                {/* Section 1: Find Your Residence Here */}
                <div className="residence-section">
                    <h2 className="section-title-left">Find Your Residence Here</h2>
                    <div className="residence-grid">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={index}
                                className="category-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="category-content">
                                    <div className="category-header">
                                        <div>
                                            <h3 className="category-title">{cat.title}</h3>
                                            <span className="category-count">{cat.count}</span>
                                        </div>
                                        <div className="arrow-icon-wrapper">
                                            <FaArrowRight />
                                        </div>
                                    </div>
                                </div>
                                <div className="category-img-wrapper">
                                    <img src={cat.image} alt={cat.title} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Section 2: Most Popular Places */}
                <div className="popular-section">
                    <div className="section-header-left">
                        <h2 className="section-title-left">Most Popular Places</h2>
                        <p className="section-desc">Find the most popular accommodations here</p>
                    </div>

                    <div className="popular-places-grid">
                        {popularRooms.map((room, index) => (
                            <motion.div
                                key={room.id}
                                className="place-card"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                onClick={() => onBook(room)}
                            >
                                {/* Card Image & Badges */}
                                <div className="place-img-wrapper">
                                    <img src={room.images[0]} alt={room.name} />
                                    <span className="badge-hotel">Hotel</span>
                                    <span className="badge-video"><FaVideo className="mr-1" /> Video</span>
                                </div>

                                {/* Card Content */}
                                <div className="place-content">
                                    <h3 className="place-title">{room.name}</h3>
                                    <div className="place-location">
                                        <FaMapMarkerAlt className="mr-1" /> Kwali, Abuja - Centra Area
                                    </div>

                                    <div className="place-pricing">
                                        <p className="price-start">starting from <span className="old-price">₦{(room.price * 1.5).toLocaleString()}</span></p>
                                        <div className="price-row">
                                            <span className="badge-discount">-30%</span>
                                            <span className="price-final">₦{room.price.toLocaleString()} <span className="price-suffix">/night</span></span>
                                        </div>
                                    </div>

                                    <div className="place-features">
                                        <span className="feature-tag"><FaTag className="mr-1" /> 3-Night Rental Discount</span>
                                        <span className="feature-tag"><FaTag className="mr-1" /> Breakfast Included</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Amenities;
