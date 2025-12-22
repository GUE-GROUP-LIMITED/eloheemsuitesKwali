import React, { useState } from 'react';
import { rooms, Room } from '../data/rooms';
import SectionHeading from './SectionHeading';
import RoomCard from './RoomCard';
import { AnimatePresence, motion } from 'framer-motion';

interface RoomsProps {
    onBook: (room: Room) => void;
}

const Rooms: React.FC<RoomsProps> = ({ onBook }) => {
    const [filter, setFilter] = useState('ALL');

    const accommodationRooms = rooms.filter(room =>
        ['ROYAL', 'QUEENS_KINGS', 'EXECUTIVE_LUXURY'].includes(room.type)
    );

    return (
        <section id="rooms" className="py-24 bg-[#f3f4f6]">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Luxury Accommodations"
                    subtitle="Stay in Comfort"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
