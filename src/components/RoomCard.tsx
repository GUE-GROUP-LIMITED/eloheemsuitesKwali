import React from 'react';
import { motion } from 'framer-motion';
import { Room } from '../data/rooms';

interface RoomCardProps {
    room: Room;
    onBook: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onBook }) => {
    return (
        <motion.div
            className="group relative overflow-hidden rounded-xl bg-[#1e1e1e] shadow-lg"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
        >
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={room.images[0]}
                    alt={room.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-serif text-white mb-2">{room.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{room.description}</p>
                <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                    <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wider">Starts From</span>
                        <p className="text-[#c9a66b] font-bold text-xl">₦{room.price.toLocaleString()}</p>
                    </div>
                    <button
                        onClick={() => onBook(room)}
                        className="px-4 py-2 bg-transparent border border-[#c9a66b] text-[#c9a66b] rounded-full text-sm font-semibold hover:bg-[#c9a66b] hover:text-white transition-all outline-none"
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default RoomCard;
