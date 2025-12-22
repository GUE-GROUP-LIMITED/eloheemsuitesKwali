import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0f1f1f] text-gray-400 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-serif text-white mb-4">ELOHEEM<span className="text-[#c9a66b]">SUITES</span></h3>
                        <p className="mb-6 opacity-80">
                            Comfort is our culture, creativity is our passion, and perfection is our drive.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#c9a66b] hover:text-white transition-all">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#c9a66b] hover:text-white transition-all">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#c9a66b] hover:text-white transition-all">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-serif text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {['Home', 'Rooms', 'Amenities', 'Reviews', 'Contact'].map(link => (
                                <li key={link}>
                                    <a href={`#${link.toLowerCase()}`} className="hover:text-[#c9a66b] transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter (Optional) */}
                    <div>
                        <h4 className="text-white font-serif text-lg mb-6">Newsletter</h4>
                        <p className="mb-4 opacity-80">Subscribe to receive special offers and news.</p>
                        <form className="flex">
                            <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full" />
                            <button className="bg-[#c9a66b] text-white px-4 py-2 rounded-r-md hover:bg-[#b08d55]">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm opacity-60">
                    <p>&copy; 2025 Eloheem Suites. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
