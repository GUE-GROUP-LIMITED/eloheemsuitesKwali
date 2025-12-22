import React from 'react';
import { rooms, Room } from '../data/rooms';
import SectionHeading from './SectionHeading';
import { motion } from 'framer-motion';

interface AmenitiesProps {
    onBook: (room: Room) => void;
}

const Amenities: React.FC<AmenitiesProps> = ({ onBook }) => {
    const eventSpaces = rooms.filter(room =>
        ['GOLDEN_HALL', 'RECEPTION_GROUND'].includes(room.type)
    );

    return (
        <section id="amenities" className="py-24 bg-[#121212] text-white">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Events & Halls"
                    subtitle="Host With Us"
                    light={true}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    {eventSpaces.map((space, index) => (
                        <motion.div
                            key={space.id}
                            className="relative group overflow-hidden rounded-xl h-[400px]"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src={space.images[0]}
                                alt={space.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-50"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h3 className="text-3xl font-serif mb-2">{space.name}</h3>
                                <p className="text-gray-300 mb-4">{space.description}</p>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <span className="text-xs text-[#c9a66b] uppercase tracking-wider block mb-1">Starting Rate</span>
                                        <span className="text-2xl font-bold">₦{space.price.toLocaleString()}</span>
                                    </div>
                                    <button
                                        onClick={() => onBook(space)}
                                        className="px-6 py-2 bg-[#c9a66b] text-white rounded-full hover:bg-[#b08d55] transition-colors cursor-pointer"
                                    >
                                        Book Event
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center text-gray-400">
                    <p className="mb-4 text-lg">Additional Services</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <span className="border border-gray-700 px-4 py-2 rounded-full hover:border-[#c9a66b] hover:text-[#c9a66b] transition-colors cursor-default">Photography (₦10,000)</span>
                        <span className="border border-gray-700 px-4 py-2 rounded-full hover:border-[#c9a66b] hover:text-[#c9a66b] transition-colors cursor-default">Projector (₦5,000/day)</span>
                        <span className="border border-gray-700 px-4 py-2 rounded-full hover:border-[#c9a66b] hover:text-[#c9a66b] transition-colors cursor-default">Catering Services</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Amenities;
