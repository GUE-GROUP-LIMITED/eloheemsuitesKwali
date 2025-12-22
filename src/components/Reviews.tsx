import React from 'react';
import SectionHeading from './SectionHeading';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const reviews = [
    {
        text: "A wonderful stay! The Royal Room was cozy and the staff were incredibly welcoming.",
        author: "Sarah M.",
        location: "UK",
        rating: 4
    },
    {
        text: "The Golden Hall was perfect for our family event. Everything was flawless!",
        author: "Ahmed K.",
        location: "Nigeria",
        rating: 5
    },
    {
        text: "Luxury at its best! The Executive Suite exceeded my expectations.",
        author: "Emily R.",
        location: "USA",
        rating: 4
    }
];

const Reviews: React.FC = () => {
    return (
        <section id="reviews" className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Guest Reviews"
                    subtitle="What People Say"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            className="bg-[#f9f9f9] p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <FaQuoteLeft className="text-4xl text-[#c9a66b] opacity-20 absolute top-6 left-6" />
                            <p className="text-gray-600 mb-6 italic relative z-10 pt-4">"{review.text}"</p>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-serif font-bold text-lg">{review.author}</h4>
                                    <span className="text-xs text-gray-400 uppercase">{review.location}</span>
                                </div>
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
