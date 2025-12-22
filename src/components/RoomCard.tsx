import React from 'react';
import { motion } from 'framer-motion';
import type { Room } from '../data/rooms';

interface RoomCardProps {
    room: Room;
    onBook: (room: Room) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onBook }) => {
    return (
        <motion.div
            className="room-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <img
                src={room.images[0]}
                alt={room.name}
                className="room-card-image"
            />

            <h3 className="room-card-title">{room.name}</h3>
            <p className="room-card-desc line-clamp-2">{room.description}</p>

            <div className="room-card-buttons">
                <button className="btn-more-info">
                    More Info
                </button>
                <button
                    onClick={() => onBook(room)}
                    className="btn-book-now"
                >
                    Book Now
                </button>
            </div>
        </motion.div>
    );
};

export default RoomCard;
