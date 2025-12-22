import React from 'react';
import { rooms } from '../data/rooms';
import type { Room } from '../data/rooms';
import { motion } from 'framer-motion';

interface AmenitiesProps {
    onBook: (room: Room) => void;
}

const Amenities: React.FC<AmenitiesProps> = ({ onBook }) => {
    const eventSpaces = rooms.filter(room =>
        ['GOLDEN_HALL', 'RECEPTION_GROUND'].includes(room.type)
    );

    return (
        <section id="amenities" className="amenities-section">
            <div className="container">
                <div className="text-center mb-10">
                    <span style={{ color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>Host With Us</span>
                    <h2 style={{ fontSize: '3rem', margin: '10px 0' }}>Events & Halls</h2>
                </div>

                <div className="amenities-grid">
                    {eventSpaces.map((space, index) => (
                        <motion.div
                            key={space.id}
                            className="amenity-card group"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src={space.images[0]}
                                alt={space.name}
                                className="amenity-img"
                            />
                            <div className="amenity-overlay" />

                            <div className="amenity-content">
                                <h3 className="amenity-title">{space.name}</h3>
                                <p className="amenity-desc">{space.description}</p>
                                <div className="amenity-actions">
                                    <div className="amenity-price">
                                        <span>Starting Rate</span>
                                        ₦{space.price.toLocaleString()}
                                    </div>
                                    <button
                                        onClick={() => onBook(space)}
                                        className="btn-book-event"
                                    >
                                        Book Event
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="services-list text-center">
                    <p style={{ width: '100%', marginBottom: '20px', fontSize: '1.2rem', color: '#999' }}>Additional Services</p>
                    <span className="service-badge">Photography (₦10,000)</span>
                    <span className="service-badge">Projector (₦5,000/day)</span>
                    <span className="service-badge">Catering Services</span>
                </div>
            </div>
        </section>
    );
};

export default Amenities;
