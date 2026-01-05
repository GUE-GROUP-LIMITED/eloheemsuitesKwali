import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { rooms } from '../../data/rooms';
import { motion } from 'framer-motion';
import { FaWifi, FaCoffee, FaTv, FaBath, FaSnowflake, FaCheck } from 'react-icons/fa';
import BookingModal from '../../components/BookingModal';

const RoomDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [room, setRoom] = useState(rooms.find(r => r.id === id));
    const [activeImage, setActiveImage] = useState(0);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    useEffect(() => {
        const found = rooms.find(r => r.id === id);
        if (found) {
            setRoom(found);
            setActiveImage(0);
        } else {
            navigate('/rooms');
        }
    }, [id, navigate]);

    if (!room) return null;

    const facilities = [
        { icon: FaWifi, name: "Free High-Speed WiFi" },
        { icon: FaTv, name: "Flat Screen TV" },
        { icon: FaSnowflake, name: "Air Conditioning" },
        { icon: FaCoffee, name: "Coffee Maker" },
        { icon: FaBath, name: "Private Bathroom" },
    ];

    return (
        <div className="room-details-page">
            {/* Hero Image Section */}
            <div className="room-hero">
                <img
                    src={room.images[activeImage]}
                    alt={room.name}
                    className="room-hero-img"
                />
                <div className="room-hero-overlay">
                    <div className="container">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="room-hero-title"
                        >
                            {room.name}
                        </motion.h1>
                        <p className="room-hero-price">₦{room.price.toLocaleString()} / night</p>
                    </div>
                </div>
            </div>

            <div className="container room-content-wrapper">
                <div className="room-content-grid">
                    {/* Left Content */}
                    <div className="room-main-info">
                        {/* Description */}
                        <div className="info-block">
                            <h2 className="info-title">Room Overview</h2>
                            <p className="info-text">
                                {room.description}
                                <br /><br />
                                Experience the epitome of comfort in our {room.name}.
                                Designed with your relaxation in mind, this room features modern decor,
                                premium bedding, and all the diverse amenities you need for a perfect stay
                                in Kwali, Abuja.
                            </p>
                        </div>

                        {/* Facilities */}
                        <div className="info-block">
                            <h2 className="info-title">Room Amenities</h2>
                            <div className="amenities-grid">
                                {facilities.map((fac, idx) => (
                                    <div key={idx} className="amenity-item">
                                        <div className="amenity-icon">
                                            <fac.icon />
                                        </div>
                                        <span>{fac.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gallery Thumbs */}
                        <div className="info-block">
                            <h2 className="info-title">Gallery</h2>
                            <div className="gallery-thumbs">
                                {room.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`gallery-thumb ${activeImage === idx ? 'active' : ''}`}
                                    >
                                        <img src={img} alt={`Thumb ${idx}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Booking Card */}
                    <div className="room-sidebar">
                        <div className="booking-card-sticky">
                            <h3 className="booking-card-title">Book This Room</h3>
                            <p className="booking-card-subtitle">Best rates guaranteed</p>

                            <div className="price-breakdown">
                                <div className="pb-row">
                                    <span>Base Rate</span>
                                    <span className="bold">₦{room.price.toLocaleString()}</span>
                                </div>
                                <div className="pb-row">
                                    <span>Service Charge</span>
                                    <span className="bold">Included</span>
                                </div>
                                <div className="pb-row">
                                    <span>Taxes</span>
                                    <span className="bold">Included</span>
                                </div>
                                <div className="pb-total">
                                    <span>Total</span>
                                    <span>₦{room.price.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="booking-perks">
                                <div className="perk-item">
                                    <FaCheck className="check-icon" />
                                    <span>Free cancellation up to 24h before check-in</span>
                                </div>
                                <div className="perk-item">
                                    <FaCheck className="check-icon" />
                                    <span>Instant confirmation</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsBookingModalOpen(true)}
                                className="btn-book-room"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                room={room}
            />
        </div>
    );
};

export default RoomDetails;
