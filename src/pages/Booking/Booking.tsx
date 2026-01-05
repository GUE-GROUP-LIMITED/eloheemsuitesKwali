import React, { useState } from 'react';
import { rooms } from '../../data/rooms';
import { useNavigate } from 'react-router-dom';
import BookingModal from '../../components/BookingModal';
import PageHero from '../../components/PageHero';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserFriends, FaBed, FaCheck } from 'react-icons/fa';

const Booking: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const selectedRoom = rooms.find(r => r.id === selectedRoomId);

    return (
        <div className="booking-page">
            <PageHero
                title="Book Your Stay"
                subtitle="RESERVATIONS"
                description="Choose your perfect room and secure your luxury experience"
                backgroundImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                height="50vh"
            />

            <section className="booking-section">
                <div className="container">
                    <div className="booking-layout">

                        {/* Sidebar */}
                        <div className="booking-sidebar">
                            <h3 className="sidebar-title">Select Room Type</h3>
                            <div className="room-list">
                                {rooms.map(room => (
                                    <button
                                        key={room.id}
                                        onClick={() => setSelectedRoomId(room.id)}
                                        className={`room-select-item ${selectedRoomId === room.id ? 'active' : ''}`}
                                    >
                                        <span className="room-name">{room.name}</span>
                                        <span className="room-price">₦{room.price.toLocaleString()}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Preview Area */}
                        <div className="booking-preview-area">
                            <AnimatePresence mode='wait'>
                                {selectedRoom && (
                                    <motion.div
                                        key={selectedRoom.id}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.4 }}
                                        className="preview-card"
                                    >
                                        <div className="preview-image">
                                            <img src={selectedRoom.images[0]} alt={selectedRoom.name} />
                                            <div className="preview-overlay">
                                                <h2>{selectedRoom.name}</h2>
                                            </div>
                                        </div>

                                        <div className="preview-body">
                                            <div className="preview-meta">
                                                <div className="meta-item">
                                                    <FaBed />
                                                    <span>King Size Bed</span>
                                                </div>
                                                <div className="meta-item">
                                                    <FaUserFriends />
                                                    <span>2 Adults</span>
                                                </div>
                                            </div>

                                            <div className="preview-price-box">
                                                <span className="price-label">Price per night</span>
                                                <span className="price-value">₦{selectedRoom.price.toLocaleString()}</span>
                                            </div>

                                            <p className="preview-description">{selectedRoom.description}</p>

                                            <ul className="preview-features">
                                                <li><FaCheck /> Complimentary Breakfast</li>
                                                <li><FaCheck /> Free High-Speed WiFi</li>
                                                <li><FaCheck /> 24/7 Room Service</li>
                                            </ul>

                                            <div className="preview-actions">
                                                <button className="btn-book-primary" onClick={() => setIsModalOpen(true)}>
                                                    Book This Room
                                                </button>
                                                <button className="btn-view-details" onClick={() => navigate(`/rooms/${selectedRoom.id}`)}>
                                                    View Full Details
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                room={selectedRoom}
            />
        </div>
    );
};

export default Booking;
