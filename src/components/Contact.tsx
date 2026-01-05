import React, { useState } from 'react';
import SectionHeading from './SectionHeading';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaSpinner, FaCheck } from 'react-icons/fa';
import { inquiriesApi } from '../lib/api';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const { error: submitError } = await inquiriesApi.submit({
                name: formData.name,
                email: formData.email,
                phone: formData.phone || undefined,
                subject: formData.subject || undefined,
                message: formData.message,
                inquiry_type: 'general'
            });

            if (submitError) {
                setError('Failed to send message. Please try again.');
                console.error('Submit error:', submitError);
            } else {
                setSuccess(true);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                // Reset success message after 5 seconds
                setTimeout(() => setSuccess(false), 5000);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

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

                        {success && (
                            <div className="form-success">
                                <FaCheck /> Thank you! Your message has been sent successfully. We'll get back to you soon.
                            </div>
                        )}

                        {error && (
                            <div className="form-error">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-row-2">
                                <div className="form-group">
                                    <label htmlFor="name">Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                            <div className="form-row-2">
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="+234 XXX XXX XXXX"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="">Select a topic</option>
                                        <option value="Room Booking Inquiry">Room Booking Inquiry</option>
                                        <option value="Event Booking Inquiry">Event Booking Inquiry</option>
                                        <option value="Pricing Question">Pricing Question</option>
                                        <option value="Feedback">Feedback</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <FaSpinner className="spin" /> Sending...
                                    </>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

