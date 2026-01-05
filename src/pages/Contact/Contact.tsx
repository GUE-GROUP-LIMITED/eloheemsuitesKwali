import React from 'react';
import PageHero from '../../components/PageHero';
import ContactSection from '../../components/Contact';

const ContactPage: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
            <PageHero
                title="Contact Us"
                subtitle="GET IN TOUCH"
                description="WE'D LOVE TO HEAR FROM YOU"
                backgroundImage="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            />

            <div style={{ paddingBottom: '60px' }}>
                <ContactSection />
            </div>
        </div>
    );
};

export default ContactPage;
