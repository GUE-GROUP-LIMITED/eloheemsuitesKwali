import React from 'react';
import Hero from '../../components/Hero';
import SectionHeading from '../../components/SectionHeading';
import Rooms from '../../components/Rooms';
import Amenities from '../../components/Amenities';
import Reviews from '../../components/Reviews';
import Contact from '../../components/Contact';

const Home: React.FC = () => {
    // We need to pass dummy handlers since we are reusing components that expect props
    // In a real app, these would be connected to the modal context
    const handleBook = () => { console.log('Book clicked'); };

    return (
        <div className="home-page">
            <Hero />

            <section className="section-padding bg-light">
                <div className="container mx-auto px-4 text-center">
                    <SectionHeading title="Welcome to Eloheem Suites" subtitle="About Us" />
                    <p className="max-w-2xl mx-auto text-dark">
                        Experience luxury and comfort at our holiness camp ground in Kwali, Abuja.
                        Comfort is our culture, creativity is our passion, and perfection is our drive.
                        Whether you are here for business or leisure, we offer an unforgettable stay.
                    </p>
                </div>
            </section>

            {/* We reuse the Rooms component but normally we'd refactor it to not be a full section if needed */}
            <Rooms onBook={handleBook} />

            <Amenities onBook={handleBook} />

            <Reviews />

            <Contact />
        </div>
    );
};

export default Home;
