import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    light?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, light = false }) => {
    return (
        <div className="text-center mb-16 px-4">
            {subtitle && (
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`block text-sm uppercase tracking-[0.2em] mb-3 font-semibold ${light ? 'text-[#c9a66b]' : 'text-[#c9a66b]'}`}
                >
                    {subtitle}
                </motion.span>
            )}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`text-4xl md:text-5xl font-serif ${light ? 'text-white' : 'text-[#1e1e1e]'}`}
            >
                {title}
            </motion.h2>
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="w-24 h-1 bg-[#c9a66b] mx-auto mt-6"
            />
        </div>
    );
};

export default SectionHeading;
