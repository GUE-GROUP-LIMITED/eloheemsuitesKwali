import React, { useState } from 'react';
import { rooms } from '../../data/rooms';
import type { Room } from '../../data/rooms';
import BookingModal from '../../components/BookingModal';
import PageHero from '../../components/PageHero';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaUserFriends, FaWifi, FaSnowflake, FaTv, FaArrowRight } from 'react-icons/fa';

const RoomsPage: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'accommodations' | 'events'>('accommodations');

    const handleBook = (room: Room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const accommodationRooms = rooms.filter(room =>
        ['ROYAL', 'QUEENS_KINGS', 'EXECUTIVE_LUXURY'].includes(room.type)
    );

    const eventSpaces = rooms.filter(room =>
        ['GOLDEN_HALL', 'RECEPTION_GROUND'].includes(room.type)
    );

    const displayedRooms = activeTab === 'accommodations' ? accommodationRooms : eventSpaces;

    const cardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.5 }
        })
    };

    return (
        <div className="rooms-page">
            <PageHero
                title="Our Rooms & Spaces"
                subtitle="ACCOMMODATIONS"
                description="Discover our collection of luxurious rooms and versatile event spaces"
                backgroundImage="https://codesnippet-741238344.imgix.net/eloheem/eloheem5.jpg"
            />

            {/* Category Tabs */}
            <section className="rooms-tabs-section">
                <div className="container">
                    <div className="rooms-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'accommodations' ? 'active' : ''}`}
                            onClick={() => setActiveTab('accommodations')}
                        >
                            <span className="tab-count">{accommodationRooms.length}</span>
                            Luxury Rooms
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
                            onClick={() => setActiveTab('events')}
                        >
                            <span className="tab-count">{eventSpaces.length}</span>
                            Event Spaces
                        </button>
                    </div>
                </div>
            </section>

            {/* Rooms Grid */}
            <section className="rooms-grid-section">
                <div className="container">
                    <div className="rooms-intro">
                        <h2 className="rooms-section-title">
                            {activeTab === 'accommodations'
                                ? 'Hotel Luxury Accommodations'
                                : 'Event Venues & Halls'}
                        </h2>
                        <p className="rooms-section-desc">
                            {activeTab === 'accommodations'
                                ? 'Each room is designed with your comfort in mind, featuring modern amenities and elegant furnishings.'
                                : 'From intimate gatherings to grand celebrations, our venues provide the perfect backdrop for your events.'}
                        </p>
                    </div>

                    <div className="rooms-grid">
                        {displayedRooms.map((room, index) => (
                            <motion.div
                                key={room.id}
                                className="room-card-premium"
                                custom={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={cardVariants}
                            >
                                <div className="room-card-image">
                                    <img src={room.images[0]} alt={room.name} />
                                    <div className="room-card-overlay">
                                        <button
                                            className="btn-quick-view"
                                            onClick={() => navigate(`/rooms/${room.id}`)}
                                        >
                                            View Details <FaArrowRight />
                                        </button>
                                    </div>
                                    <div className="room-card-badge">
                                        {room.type === 'EXECUTIVE_LUXURY' && 'Premium'}
                                        {room.type === 'QUEENS_KINGS' && 'Popular'}
                                        {room.type === 'ROYAL' && 'Classic'}
                                        {room.type === 'GOLDEN_HALL' && 'Intimate'}
                                        {room.type === 'RECEPTION_GROUND' && 'Grand'}
                                    </div>
                                </div>

                                <div className="room-card-body">
                                    <h3 className="room-card-title">{room.name}</h3>

                                    <div className="room-card-features">
                                        {activeTab === 'accommodations' ? (
                                            <>
                                                <span><FaBed /> King Bed</span>
                                                <span><FaUserFriends /> 2 Guests</span>
                                                <span><FaWifi /> Free WiFi</span>
                                                <span><FaSnowflake /> A/C</span>
                                                <span><FaTv /> Smart TV</span>
                                            </>
                                        ) : (
                                            <>
                                                <span><FaUserFriends /> {room.type === 'GOLDEN_HALL' ? '40-70 Guests' : '500-800 Guests'}</span>
                                                <span><FaSnowflake /> Climate Control</span>
                                                <span><FaWifi /> WiFi</span>
                                            </>
                                        )}
                                    </div>

                                    <p className="room-card-desc">{room.description}</p>

                                    <div className="room-card-footer">
                                        <div className="room-price">
                                            <span className="price-amount">₦{room.price.toLocaleString()}</span>
                                            <span className="price-unit">/ {activeTab === 'accommodations' ? 'night' : 'event'}</span>
                                        </div>
                                        <button
                                            className="btn-book-room"
                                            onClick={() => handleBook(room)}
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="rooms-cta-banner">
                <div className="container">
                    <motion.div
                        className="cta-banner-content"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Need Help Choosing?</h2>
                        <p>Our team is ready to assist you in finding the perfect room or venue for your needs.</p>
                        <button className="btn-cta-contact" onClick={() => navigate('/contact')}>
                            Contact Us
                        </button>
                    </motion.div>
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

export default RoomsPage;
