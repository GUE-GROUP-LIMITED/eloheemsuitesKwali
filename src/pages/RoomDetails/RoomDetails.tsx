import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // No useLocation/Link needed yet?
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
            navigate('/rooms'); // Redirect if not found
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
        <div className="pt-24 min-h-screen bg-[#f3f4f6]">
            {/* Hero Image Section */}
            <div className="h-[50vh] md:h-[60vh] relative overflow-hidden bg-black">
                <img
                    src={room.images[activeImage]}
                    alt={room.name}
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-10">
                    <div className="container mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-serif text-white mb-2"
                        >
                            {room.name}
                        </motion.h1>
                        <p className="text-[#c9a66b] text-xl font-bold">₦{room.price.toLocaleString()} / night</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-serif font-bold mb-6 text-[#1e1e1e]">Room Overview</h2>
                            <p className="text-gray-600 leading-loose text-lg">
                                {room.description}
                                <br /><br />
                                Experience the epitome of comfort in our {room.name}.
                                Designed with your relaxation in mind, this room features modern decor,
                                premium bedding, and all the diverse amenities you need for a perfect stay
                                in Kwali, Abuja.
                            </p>
                        </div>

                        {/* Facilities */}
                        <div>
                            <h2 className="text-2xl font-serif font-bold mb-6 text-[#1e1e1e]">Room Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {facilities.map((fac, idx) => (
                                    <div key={idx} className="flex items-center gap-4 text-gray-700">
                                        <div className="text-[#c9a66b] text-xl">
                                            <fac.icon />
                                        </div>
                                        <span>{fac.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Gallery Thumbs */}
                        <div>
                            <h2 className="text-2xl font-serif font-bold mb-6 text-[#1e1e1e]">Gallery</h2>
                            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                                {room.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[#c9a66b] scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-xl shadow-xl sticky top-32 border-t-4 border-[#c9a66b]">
                            <h3 className="text-2xl font-serif font-bold mb-2">Book This Room</h3>
                            <p className="text-gray-500 mb-6 text-sm">Best rates guaranteed</p>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Base Rate</span>
                                    <span className="font-bold">₦{room.price.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Service Charge</span>
                                    <span className="font-bold">Included</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span className="text-gray-600">Taxes</span>
                                    <span className="font-bold">Included</span>
                                </div>
                                <div className="flex justify-between items-center py-3 text-lg text-[#0f3d3e]">
                                    <span className="font-bold">Total</span>
                                    <span className="font-bold">₦{room.price.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-8">
                                <div className="flex items-start gap-3 text-sm text-gray-500">
                                    <FaCheck className="text-green-500 mt-1" />
                                    <span>Free cancellation up to 24h before check-in</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-gray-500">
                                    <FaCheck className="text-green-500 mt-1" />
                                    <span>Instant confirmation</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsBookingModalOpen(true)}
                                className="w-full bg-[#0f3d3e] text-white py-4 rounded-lg font-bold uppercase tracking-wider hover:bg-[#165253] transition-all shadow-lg hover:shadow-xl active:scale-95"
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
