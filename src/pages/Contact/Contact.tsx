import React from 'react';
import ContactSection from '../../components/Contact'; // Reuse the existing detailed contact section

const ContactPage: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Hero Section */}
            <div className="hero" style={{ height: '70vh' }}>
                <div className="hero-overlay" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
                <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                    alt="Luxury Hotel"
                    className="hero-image"
                />
                <div className="hero-content">
                    <h1 className="hero-title" style={{ fontSize: '4rem', marginBottom: '1rem' }}>Contact Us</h1>
                    <p className="hero-subtitle" style={{ fontSize: '1.5rem', opacity: 0.9, letterSpacing: '3px' }}>WE'D LOVE TO HEAR FROM YOU</p>
                </div>
            </div>

            {/* The reusable Contact component already has padding and layout we need */}
            <ContactSection />
        </div>
    );
};

export default ContactPage;
