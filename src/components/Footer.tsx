import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">

                    {/* Brand */}
                    <div className="footer-brand">
                        <h3>ELOHEEM<span>SUITES</span></h3>
                        <p style={{ marginTop: '15px', lineHeight: '1.6', fontSize: '0.9rem' }}>
                            Comfort is our culture, creativity is our passion, and perfection is our drive.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link"><FaFacebookF /></a>
                            <a href="#" className="social-link"><FaTwitter /></a>
                            <a href="#" className="social-link"><FaInstagram /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>Quick Links</h4>
                        <ul>
                            {['Home', 'Rooms', 'Amenities', 'Reviews', 'Contact'].map(link => (
                                <li key={link}>
                                    {/* Note: Internal links should typically use Link from react-router-dom, but keeping anchors for now as requested/structure */}
                                    <a href={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`}>{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>Newsletter</h4>
                        <p style={{ marginBottom: '15px', fontSize: '0.9rem' }}>Subscribe to receive special offers and news.</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Your email" className="newsletter-input" />
                            <button className="newsletter-btn">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 Eloheem Suites. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
