import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
    title: string;
    subtitle?: string;
    description?: string;
    backgroundImage: string;
    height?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
    title,
    subtitle,
    description,
    backgroundImage,
    height = '60vh'
}) => {
    return (
        <div className="page-hero" style={{ height }}>
            <div
                className="page-hero-bg"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>
            <div className="page-hero-overlay"></div>

            <div className="page-hero-content">
                {subtitle && (
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="page-hero-subtitle"
                    >
                        {subtitle}
                    </motion.span>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="page-hero-title"
                >
                    {title}
                </motion.h1>

                {description && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="page-hero-desc"
                    >
                        {description}
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default PageHero;
