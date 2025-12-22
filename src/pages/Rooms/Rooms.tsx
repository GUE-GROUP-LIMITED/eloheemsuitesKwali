import React, { useState } from 'react';
import RoomCard from '../../components/RoomCard';
import { rooms } from '../../data/rooms';
import type { Room } from '../../data/rooms';
import BookingModal from '../../components/BookingModal';

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
        <div className="rooms-section pt-32"> {/* Added padding for fixed navbar */}
            <div className="container">
                <h2>HOTEL LUXURY ACCOMMODATIONS</h2>
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
