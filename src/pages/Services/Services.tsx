import React from 'react';

const Services: React.FC = () => {
    return (
        <div className="pt-24 min-h-screen bg-[#f9f9f9]">
            <div className="bg-[#0f1f1f] text-white py-20 text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-serif">Our Services</h1>
                <p className="opacity-70 mt-4">More Than Just A Stay</p>
            </div>

            <div className="container mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Service 1 */}
                    <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all">
                        <div className="h-12 w-12 bg-[#c9a66b] rounded-full flex items-center justify-center mb-6 text-white text-xl">
                            <i className="fas fa-camera"></i> {/* Assuming FontAwesome or similar, or replace with icon */}
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3">Photography</h3>
                        <p className="text-gray-600 mb-4">Capture your precious moments with our professional photography services available on requests.</p>
                        <span className="text-[#0f3d3e] font-bold">₦10,000 / Session</span>
                    </div>

                    {/* Service 2 */}
                    <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all">
                        <div className="h-12 w-12 bg-[#c9a66b] rounded-full flex items-center justify-center mb-6 text-white text-xl">
                            <i className="fas fa-video"></i>
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3">Projector Rental</h3>
                        <p className="text-gray-600 mb-4">High-definition projectors for your business meetings, seminars, and movie nights.</p>
                        <span className="text-[#0f3d3e] font-bold">₦5,000 / Day</span>
                    </div>

                    {/* Service 3 */}
                    <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all">
                        <div className="h-12 w-12 bg-[#c9a66b] rounded-full flex items-center justify-center mb-6 text-white text-xl">
                            <i className="fas fa-utensils"></i>
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3">Catering</h3>
                        <p className="text-gray-600 mb-4">Exquisite local and international cuisine prepared by our top chefs for your events.</p>
                        <span className="text-[#0f3d3e] font-bold">Custom Quotes</span>
                    </div>

                    {/* Service 4 */}
                    <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all">
                        <div className="h-12 w-12 bg-[#c9a66b] rounded-full flex items-center justify-center mb-6 text-white text-xl">
                            <i className="fas fa-wifi"></i>
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3">High-Speed WiFi</h3>
                        <p className="text-gray-600 mb-4">Stay connected with our complimentary 24/7 high-speed internet access throughout the premises.</p>
                        <span className="text-[#0f3d3e] font-bold">Free</span>
                    </div>

                    {/* Service 5 */}
                    <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all">
                        <div className="h-12 w-12 bg-[#c9a66b] rounded-full flex items-center justify-center mb-6 text-white text-xl">
                            <i className="fas fa-car"></i>
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3">Ample Parking</h3>
                        <p className="text-gray-600 mb-4">Secure and spacious parking space for all our guests and event attendees.</p>
                        <span className="text-[#0f3d3e] font-bold">Free</span>
                    </div>

                    {/* Service 6 */}
                    <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all">
                        <div className="h-12 w-12 bg-[#c9a66b] rounded-full flex items-center justify-center mb-6 text-white text-xl">
                            <i className="fas fa-user-shield"></i>
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3">24/7 Security</h3>
                        <p className="text-gray-600 mb-4">Your safety is our priority with round-the-clock security personnel and surveillance.</p>
                        <span className="text-[#0f3d3e] font-bold">Included</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
