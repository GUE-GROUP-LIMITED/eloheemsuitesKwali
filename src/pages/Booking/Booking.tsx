import React, { useState } from 'react';
import { rooms } from '../../data/rooms';
import { useNavigate } from 'react-router-dom';
import BookingModal from '../../components/BookingModal';
import { motion, AnimatePresence } from 'framer-motion';

const Booking: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const selectedRoom = rooms.find(r => r.id === selectedRoomId);

    return (
        <div className="booking-page-container">
            <div className="booking-header">
                <h1 className="booking-title">Plan Your Stay</h1>
                <p className="booking-subtitle">Select a room to begin your reservation</p>
            </div>

            <div className="container">
                <div className="booking-interface">
                    <div className="booking-grid">
                        {/* Sidebar Room List */}
                        <div className="booking-room-list">
                            <h3 className="list-title">Select Room Type</h3>
                            <div className="list-items">
                                {rooms.map(room => (
                                    <button
                                        key={room.id}
                                        onClick={() => setSelectedRoomId(room.id)}
                                        className={`room-select-btn ${selectedRoomId === room.id ? 'active' : ''}`}
                                    >
                                        <div className="room-btn-name">{room.name}</div>
                                        <div className="room-btn-price">
                                            ₦{room.price.toLocaleString()}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Content Preview */}
                        <div className="booking-preview">
                            <AnimatePresence mode='wait'>
                                {selectedRoom && (
                                    <motion.div
                                        key={selectedRoom.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="preview-content"
                                    >
                                        <div className="preview-image-container group">
                                            <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="preview-img" />
                                            <div className="preview-overlay">
                                                <h2>{selectedRoom.name}</h2>
                                            </div>
                                        </div>

                                        <div className="preview-stats">
                                            <div className="stat-box">
                                                <span className="stat-label">Price per night</span>
                                                <span className="stat-value">₦{selectedRoom.price.toLocaleString()}</span>
                                            </div>
                                            <div className="stat-box">
                                                <span className="stat-label">Max Occupancy</span>
                                                <span className="stat-value">2 Adults</span>
                                            </div>
                                        </div>

                                        <p className="preview-desc">
                                            {selectedRoom.description}
                                        </p>

                                        <div className="preview-actions">
                                            <button
                                                onClick={() => navigate(`/rooms/${selectedRoom.id}`)}
                                                className="btn-view-details"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="btn-book-now-large"
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                room={selectedRoom}
            />
        </div>
    );
};

export default Booking;
