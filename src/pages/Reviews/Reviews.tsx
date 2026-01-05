import React from 'react';
import ReviewsComponent from '../../components/Reviews';
import PageHero from '../../components/PageHero';

const Reviews: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
            <PageHero
                title="Guest Reviews"
                subtitle="TESTIMONIALS"
                description="What our guests say about their stay with us."
                backgroundImage="https://codesnippet-741238344.imgix.net/eloheem/_11A2439.JPG"
            />

            <div className="pb-20">
                <ReviewsComponent />
            </div>
        </div>
    );
};

export default Reviews;
