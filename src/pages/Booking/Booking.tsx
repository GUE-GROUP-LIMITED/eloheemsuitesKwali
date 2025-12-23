import React, { useState } from 'react';
import { rooms } from '../../data/rooms';
import { useNavigate } from 'react-router-dom';
import BookingModal from '../../components/BookingModal'; // Reusing logic but maybe in full page form later
import { motion, AnimatePresence } from 'framer-motion';

const Booking: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // This page acts as a catalog to initiate booking or a direct booking form.
    // Given the prompt "create the book now page", it could be a page listing rooms to select for booking 
    // OR a full page form. Since we have a modal, a full page form is redundant unless it replaces the modal.
    // Let's make it a nice selection page that opens the modal or leads to it.

    const handleRoomSelect = (id: string) => {
        setSelectedRoomId(id);
        setIsModalOpen(true);
    };

    const selectedRoom = rooms.find(r => r.id === selectedRoomId);

    return (
        <div className="pt-24 min-h-screen bg-gray-50 pb-20">
            <div className="bg-[#0f1f1f] text-white py-16 text-center mb-10">
                <h1 className="text-4xl font-serif">Plan Your Stay</h1>
                <p className="opacity-70 mt-4">Select a room to begin your reservation</p>
            </div>

            <div className="container mx-auto px-4 max-w-5xl">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {/* Sidebar Room List */}
                        <div className="bg-gray-50 border-r border-gray-100 p-6">
                            <h3 className="text-lg font-bold mb-6 text-gray-800 uppercase tracking-wider">Select Room Type</h3>
                            <div className="space-y-3">
                                {rooms.map(room => (
                                    <button
                                        key={room.id}
                                        onClick={() => setSelectedRoomId(room.id)}
                                        className={`w-full text-left p-4 rounded-lg transition-all border ${selectedRoomId === room.id ? 'bg-[#c9a66b] text-white border-[#c9a66b] shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:border-[#c9a66b] hover:text-[#c9a66b]'}`}
                                    >
                                        <div className="font-bold text-sm mb-1">{room.name}</div>
                                        <div className={`text-xs ${selectedRoomId === room.id ? 'text-white/90' : 'text-gray-400'}`}>
                                            ₦{room.price.toLocaleString()}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Content Preview */}
                        <div className="md:col-span-2 p-8">
                            <AnimatePresence mode='wait'>
                                {selectedRoom && (
                                    <motion.div
                                        key={selectedRoom.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="h-64 rounded-xl overflow-hidden mb-6 relative group">
                                            <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                                <h2 className="text-white text-3xl font-serif">{selectedRoom.name}</h2>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6 mb-8 text-sm text-gray-600">
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <span className="block text-gray-400 text-xs uppercase mb-1">Price per night</span>
                                                <span className="text-xl font-bold text-[#0f3d3e]">₦{selectedRoom.price.toLocaleString()}</span>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <span className="block text-gray-400 text-xs uppercase mb-1">Max Occupancy</span>
                                                <span className="text-xl font-bold text-[#0f3d3e]">2 Adults</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 leading-relaxed mb-8">
                                            {selectedRoom.description}
                                        </p>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => navigate(`/rooms/${selectedRoom.id}`)}
                                                className="flex-1 py-4 border border-[#0f3d3e] text-[#0f3d3e] font-bold rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                View Details
                                            </button>
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="flex-1 py-4 bg-[#0f3d3e] text-white font-bold rounded-lg hover:bg-[#165253] shadow-lg hover:shadow-xl transition-all"
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
