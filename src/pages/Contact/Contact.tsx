import React from 'react';
import ContactSection from '../../components/Contact'; // Reuse the existing detailed contact section

const ContactPage: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen">
            <div className="bg-[#0f1f1f] text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-serif">Contact Us</h1>
                <p className="opacity-70 mt-4">We'd Love to Hear From You</p>
            </div>
            {/* The reusable Contact component already has padding and layout we need */}
            <ContactSection />
        </div>
    );
};

export default ContactPage;
