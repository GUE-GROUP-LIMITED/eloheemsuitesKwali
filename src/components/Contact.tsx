import React from 'react';
import SectionHeading from './SectionHeading';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <SectionHeading
                    title="Contact Us"
                    subtitle="Get In Touch"
                    light={true}
                />

                <div className="contact-layout">
                    {/* Contact Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="contact-left"
                    >
                        <div className="contact-info-card">
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>Contact Information</h3>
                            <div className="contact-details">
                                <div>
                                    <FaPhoneAlt />
                                    <span>07061266542, 08050699165</span>
                                </div>
                                <div>
                                    <FaEnvelope />
                                    <span>info@eloheemsuites.com</span>
                                </div>
                                <div>
                                    <FaMapMarkerAlt />
                                    <span>Kwali, Abuja, Nigeria</span>
                                </div>
                            </div>
                        </div>

                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509445!2d7.483240315209711!3d9.07261499348601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDQnMjEuNCJOIDfCsDI4JzU5LjciRQ!5e0!3m2!1sen!2sng!4v1699876543210!5m2!1sen!2sng"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                title="Eloheem Suites Location"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="contact-form-card"
                    >
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>Send a Message</h3>
                        <form action="https://formspree.io/f/your_formspree_id" method="POST">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" required className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows={4} required className="form-control"></textarea>
                            </div>
                            <button type="submit" className="btn-submit">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
