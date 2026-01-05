import React from 'react';
import SectionHeading from '../../components/SectionHeading';
import PageHero from '../../components/PageHero';
import { motion } from 'framer-motion';

const About: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
            <PageHero
                title="About Us"
                subtitle="OUR STORY"
                description="A premier hospitality destination in the heart of Kwali, Abuja."
                backgroundImage="https://codesnippet-741238344.imgix.net/eloheem/eloheem2.jpg"
            />

            <div className="container mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <SectionHeading title="Eloheem Suites" subtitle="Welcome" />

                    <div className="text-lg text-gray-600 leading-relaxed space-y-6">
                        <p>
                            Eloheem Suites is a premier hospitality destination located in the heart of Kwali, Abuja.
                            We pride ourselves on offering an exceptional blend of luxury, comfort, and Nigerian hospitality.
                        </p>
                        <p>
                            Our facility is designed to cater to both business and leisure travelers, providing state-of-the-art amenities,
                            exquisite dining options, and secure, serene surroundings.
                            Our team is dedicated to ensuring that your stay is nothing short of perfect.
                        </p>
                        <p>
                            Whether you are here for a conference in our Golden Hall, a wedding reception, or a weekend getaway,
                            Eloheem Suites offers the perfect setting for memorable experiences.
                        </p>
                    </div>

                    {/* Signature or visual element could go here */}
                    <div style={{ marginTop: '50px', fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--secondary-color)' }}>
                        Comfort. Class. Culture.
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
