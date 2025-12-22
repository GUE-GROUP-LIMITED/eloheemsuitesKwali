import React, { useState } from 'react';
import SectionHeading from '../../components/SectionHeading';
import RoomCard from '../../components/RoomCard';
import { rooms } from '../../data/rooms';
import { Room } from '../../data/rooms';
import BookingModal from '../../components/BookingModal'; // Assuming we want booking here too

const RoomsPage: React.FC = () => {
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBook = (room: Room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const accommodationRooms = rooms.filter(room =>
        ['ROYAL', 'QUEENS_KINGS', 'EXECUTIVE_LUXURY'].includes(room.type)
    );

    return (
        <div className="pt-24 min-h-screen bg-[#f9f9f9]">
            <div className="bg-[#0f1f1f] text-white py-20 text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-serif">Our Rooms</h1>
                <p className="opacity-70 mt-4">Luxury & Comfort Defined</p>
            </div>

            <div className="container mx-auto px-4 pb-20">
                <div className="room-grid">
                    {accommodationRooms.map(room => (
                        <RoomCard key={room.id} room={room} onBook={handleBook} />
                    ))}
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

export default RoomsPage;
