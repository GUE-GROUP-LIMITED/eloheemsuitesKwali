import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaPhoneAlt } from 'react-icons/fa';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="notfound-page">
            <div className="notfound-content">
                <motion.div
                    className="notfound-text"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="notfound-label">Oops!</span>
                    <h1 className="notfound-code">404</h1>
                    <h2 className="notfound-title">Page Not Found</h2>
                    <p className="notfound-desc">
                        The page you're looking for doesn't exist or has been moved.
                        Let us help you find your way back.
                    </p>

                    <div className="notfound-actions">
                        <button className="btn-notfound-primary" onClick={() => navigate('/')}>
                            <FaHome /> Back to Home
                        </button>
                        <button className="btn-notfound-secondary" onClick={() => navigate('/contact')}>
                            <FaPhoneAlt /> Contact Us
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="notfound-visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <div className="visual-circle"></div>
                    <div className="visual-decorations">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
