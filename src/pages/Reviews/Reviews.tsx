import React from 'react';
import ReviewsComponent from '../../components/Reviews';

const Reviews: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-[#f9f9f9]">
            <div className="bg-[#0f1f1f] text-white py-20 text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-serif">Guest Reviews</h1>
                <p className="opacity-70 mt-4">What our guests say about us</p>
            </div>

            {/* We stick to the component but we can wrap it or just render it */}
            <div className="pb-20">
                <ReviewsComponent />
            </div>
        </div>
    );
};

export default Reviews;
