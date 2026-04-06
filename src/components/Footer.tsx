import React from 'react';
import { BsArrowUpRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="footer-homedine">
            <div className="container footer-inner">
                {/* Top Section */}
                <div className="footer-top">
                    <div className="footer-intro section-left">
                        <p className="footer-intro-text">
                            Eloheem promotes sustainable hospitality with beautifully crafted <span className="italic-highlight">Comfort & Style!</span>
                        </p>
                        <Link to="/booking" className="btn-footer-join">
                            Book Now <BsArrowUpRight className="ml-2" />
                        </Link>
                    </div>

                    <div className="footer-nav-menu section-right">
                        <Link to="/">Home</Link>
                        <Link to="/rooms">Rooms</Link>
                        <Link to="/amenities">Amenities</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom-row">
                    <h1 className="footer-big-text">Eloheem</h1>

                    <div className="footer-social-stack">
                        <a href="#">Twitter <BsArrowUpRight /></a>
                        <a href="#">Instagram <BsArrowUpRight /></a>
                        <a href="#">LinkedIn <BsArrowUpRight /></a>
                    </div>
                </div>

                {/* Copyright/Privacy - Minimalist Strip */}
                <div className="footer-copyright-minimal">
                    <div className="flex gap-4">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms & Conditions</a>
                    </div>
                    <p>&copy; 2026 Eloheem Suites.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
