import React from 'react';
import { rooms } from '../data/rooms';
import type { Room } from '../data/rooms';
import RoomCard from './RoomCard';
import { motion } from 'framer-motion';

interface RoomsProps {
    onBook: (room: Room) => void;
}

const Rooms: React.FC<RoomsProps> = ({ onBook }) => {
    const accommodationRooms = rooms.filter(room =>
        ['QUEENS_KINGS', 'EXECUTIVE_LUXURY'].includes(room.type)
    );

    return (
        <section id="rooms" className="rooms-section">
            <div className="container">
                <h2>Hotel Luxury Accommodations</h2>

                <div className="room-grid">
                    {accommodationRooms.map((room, index) => (
                        <motion.div
                            key={room.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <RoomCard room={room} onBook={onBook} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rooms;
