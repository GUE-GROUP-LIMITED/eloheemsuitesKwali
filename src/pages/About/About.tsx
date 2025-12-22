import React from 'react';
import SectionHeading from '../../components/SectionHeading';

const About: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen">
            <div className="bg-[#0f1f1f] text-white py-20 text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-serif">About Us</h1>
                <p className="opacity-70 mt-4">Our Story & Standards</p>
            </div>

            <div className="container mx-auto px-4 pb-20">
                <div className="max-w-3xl mx-auto text-center">
                    <SectionHeading title="Eloheem Suites" subtitle="Welcome" />
                    <p style={{ marginBottom: '20px', lineHeight: '1.8', fontSize: '1.1rem', color: '#555' }}>
                        Eloheem Suites is a premier hospitality destination located in the heart of Kwali, Abuja.
                        We pride ourselves on offering an exceptional blend of luxury, comfort, and Nigerian hospitality.
                    </p>
                    <p style={{ marginBottom: '20px', lineHeight: '1.8', fontSize: '1.1rem', color: '#555' }}>
                        Our facility is designed to cater to both business and leisure travelers, providing state-of-the-art amenities,
                        exquisite dining options, and secure, serene surroundings.
                        Our team is dedicated to ensuring that your stay is nothing short of perfect.
                    </p>
                    <p style={{ marginBottom: '20px', lineHeight: '1.8', fontSize: '1.1rem', color: '#555' }}>
                        Whether you are here for a conference in our Golden Hall, a wedding reception, or a weekend getaway,
                        Eloheem Suites offers the perfect setting for memorable experiences.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
