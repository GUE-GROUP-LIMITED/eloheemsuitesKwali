import React from 'react';
import { rooms } from '../../data/rooms';

const Gallery: React.FC = () => {
    // Gather all images from rooms for the gallery
    const allImages = rooms.flatMap(room => room.images);
    // Remove duplicates if any
    const uniqueImages = [...new Set(allImages)];

    return (
        <div className="pt-24 min-h-screen bg-[#f9f9f9]">
            <div className="bg-[#0f1f1f] text-white py-20 text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-serif">Gallery</h1>
                <p className="opacity-70 mt-4">A Glimpse of Eloheem</p>
            </div>

            <div className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {uniqueImages.map((img, index) => (
                        <div key={index} className="overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all h-64 group">
                            <img
                                src={img}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
