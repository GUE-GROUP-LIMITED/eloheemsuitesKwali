import React, { useState } from 'react';
import Hero from '../../components/Hero';
import { rooms } from '../../data/rooms';
import type { Room } from '../../data/rooms';
import BookingModal from '../../components/BookingModal';
import Reviews from '../../components/Reviews';
import Contact from '../../components/Contact';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaUserFriends, FaWifi, FaArrowRight, FaStar, FaShieldAlt, FaLeaf, FaConciergeBell } from 'react-icons/fa';
import OptimizedImage from '../../components/OptimizedImage';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBook = (room: Room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const accommodationRooms = rooms.filter(room =>
        ['QUEENS_KINGS', 'EXECUTIVE_LUXURY'].includes(room.type)
    );

    const values = [
        { icon: FaStar, title: "Luxury", desc: "Premium amenities and elegant design" },
        { icon: FaShieldAlt, title: "Security", desc: "24/7 surveillance and protection" },
        { icon: FaLeaf, title: "Comfort", desc: "Peaceful and serene environment" },
        { icon: FaConciergeBell, title: "Service", desc: "Dedicated staff at your service" },
    ];

    return (
        <div className="home-page">
            <Hero />

            {/* About Section - Premium Redesign */}
            <section className="home-about-section">
                <div className="container">
                    <div className="about-layout">
                        {/* Image Column */}
                        <motion.div
                            className="about-image-col"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="about-img-wrapper">
                                <OptimizedImage
                                    src="/images/Kings&Queens_special/kings-queens-2.jpeg"
                                    alt="Eloheem Suites Interior"
                                />
                                <div className="about-img-badge">
                                    <span className="badge-number">5+</span>
                                    <span className="badge-text">Years of Excellence</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Text Column */}
                        <motion.div
                            className="about-text-col"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <span className="about-label">About Us</span>
                            <h2 className="about-title">Welcome to <br />Eloheem Suites</h2>
                            <p className="about-desc">
                                Experience luxury and comfort at our premier destination in Kwali, Abuja.
                                Comfort is our culture, creativity is our passion, and perfection is our drive.
                                Whether you're here for business or leisure, we offer an unforgettable stay
                                with world-class amenities and exceptional service.
                            </p>

                            <div className="about-values-grid">
                                {values.map((item, index) => (
                                    <div key={index} className="about-value-item">
                                        <div className="value-icon">
                                            <item.icon />
                                        </div>
                                        <div className="value-text">
                                            <h4>{item.title}</h4>
                                            <p>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="btn-about-cta" onClick={() => navigate('/about')}>
                                Learn More About Us <FaArrowRight />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Rooms Section - Premium Redesign */}
            <section className="home-rooms-section">
                <div className="container">
                    <div className="home-section-header">
                        <span className="section-label">Accommodations</span>
                        <h2 className="home-section-title">Luxury Rooms & Suites</h2>
                        <p className="home-section-subtitle">
                            Discover our collection of elegantly designed rooms, each offering the perfect blend of comfort and sophistication.
                        </p>
                    </div>

                    <div className="home-rooms-grid">
                        {accommodationRooms.map((room, index) => (
                            <motion.div
                                key={room.id}
                                className="home-room-card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                            >
                                <div className="home-room-image">
                                    <OptimizedImage src={room.images[0]} alt={room.name} />
                                    <div className="home-room-overlay">
                                        <button
                                            className="btn-room-view"
                                            onClick={() => navigate(`/rooms/${room.id}`)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                                <div className="home-room-body">
                                    <h3>{room.name}</h3>
                                    <div className="home-room-features">
                                        <span><FaBed /> King Bed</span>
                                        <span><FaUserFriends /> 2 Guests</span>
                                        <span><FaWifi /> WiFi</span>
                                    </div>
                                    <div className="home-room-footer">
                                        <div className="home-room-price">
                                            <span className="price">₦{room.price.toLocaleString()}</span>
                                            <span className="unit">/night</span>
                                        </div>
                                        <button className="btn-book-now" onClick={() => handleBook(room)}>
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="home-rooms-cta">
                        <button className="btn-view-all" onClick={() => navigate('/rooms')}>
                            View All Rooms <FaArrowRight />
                        </button>
                    </div>
                </div>
            </section>

            <Reviews />

            <Contact />

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                room={selectedRoom}
            />
        </div>
    );
};

export default Home;
