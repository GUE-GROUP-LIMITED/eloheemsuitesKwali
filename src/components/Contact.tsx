import React from 'react';
import SectionHeading from './SectionHeading';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact: React.FC = () => {
    return (
        <section id="contact" className="py-24 bg-[#1e1e1e] text-white">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Contact Us"
                    subtitle="Get In Touch"
                    light={true}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Contact Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="bg-[#121212] p-8 rounded-xl border border-gray-800">
                            <h3 className="text-2xl font-serif mb-6">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-gray-300">
                                    <FaPhoneAlt className="text-[#c9a66b]" />
                                    <span>07061266542, 08050699165</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <FaEnvelope className="text-[#c9a66b]" />
                                    <span>info@eloheemsuites.com</span>
                                </div>
                                <div className="flex items-center gap-4 text-gray-300">
                                    <FaMapMarkerAlt className="text-[#c9a66b]" />
                                    <span>Kwali, Abuja, Nigeria</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[300px] w-full rounded-xl overflow-hidden border border-gray-800">
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
                        className="bg-white text-gray-800 p-8 rounded-xl shadow-xl"
                    >
                        <h3 className="text-2xl font-serif mb-6">Send a Message</h3>
                        <form action="https://formspree.io/f/your_formspree_id" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                                <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a66b] transition-all" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                <input type="email" id="email" name="email" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a66b] transition-all" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-500 mb-1">Message</label>
                                <textarea id="message" name="message" rows={4} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a66b] transition-all"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-[#0f3d3e] text-white py-3 rounded-lg font-semibold hover:bg-[#165253] transition-colors">
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
