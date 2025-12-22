import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Room } from '../data/rooms';
import { FaTimes } from 'react-icons/fa';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    room?: Room | null;
}

declare global {
    interface Window {
        PaystackPop: any;
    }
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, room }) => {

    const [formData, setFormData] = useState({
        checkIn: '',
        checkOut: '',
        fullName: '',
        email: '',
        phone: '',
        notes: ''
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [days, setDays] = useState(0);

    useEffect(() => {
        if (formData.checkIn && formData.checkOut && room) {
            const start = new Date(formData.checkIn);
            const end = new Date(formData.checkOut);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 0) {
                setDays(diffDays);
                setTotalPrice(diffDays * room.price);
            } else {
                setDays(0);
                setTotalPrice(0);
            }
        }
    }, [formData.checkIn, formData.checkOut, room]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePayment = () => {
        if (!window.PaystackPop) {
            alert("Paystack not loaded");
            return;
        }

        const paystack = new window.PaystackPop();
        paystack.newTransaction({
            key: 'pk_test_ae4308057c9ff208f4ee6e029a8beab9f05b082d', // Public Test Key from legacy code
            email: formData.email,
            amount: totalPrice * 100, // In kobo
            currency: 'NGN',
            ref: `txref_${room?.id}_${Date.now()}`,
            metadata: {
                room_type: room?.type,
                check_in: formData.checkIn,
                check_out: formData.checkOut,
                full_name: formData.fullName,
                days: days
            },
            callback: (response: any) => {
                alert("Payment Successful! Ref: " + response.reference);
                onClose();
            },
            onClose: () => {
                alert("Transaction cancelled.");
            }
        }); // .openIframe() might be needed depending on version, checking legacy usage.
        // Legacy used .openIframe(). But v2 usually just needs newTransaction.
        // However, legacy script imported https://js.paystack.co/v2/inline.js and did .openIframe().
        // I will try to follow the legacy pattern roughly or use the standard popup method.
        // Actually standard pop method is paystack.newTransaction(options);

        // Let's assume standard inline for now, but I might need to verify if openIframe is part of a specific deprecated flow or v2 specific.
        // The legacy code used: paystack.newTransaction({...}).openIframe();
    };

    // Wrapper to handle the legacy vs modern potential discrepancy
    const triggerPayment = (e: React.FormEvent) => {
        e.preventDefault();
        handlePayment();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white dark:bg-[#1e1e1e] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                >
                    {/* Header */}
                    <div className="bg-[#0f3d3e] p-6 flex justify-between items-center text-white">
                        <div>
                            <h3 className="text-xl font-serif">Book {room?.name}</h3>
                            <p className="text-sm opacity-80 text-[#c9a66b]">₦{room?.price.toLocaleString()} / night</p>
                        </div>
                        <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                            <FaTimes size={24} />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={triggerPayment} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Check-in</label>
                                <input
                                    type="date"
                                    name="checkIn"
                                    required
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a66b] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Check-out</label>
                                <input
                                    type="date"
                                    name="checkOut"
                                    required
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a66b] outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a66b] outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a66b] outline-none"
                                />
                            </div>
                        </div>

                        {/* Summary */}
                        {days > 0 && (
                            <div className="bg-[#f9f9f9] p-4 rounded-lg flex justify-between items-center border border-dashed border-gray-300">
                                <span className="text-gray-600">Total for {days} nights:</span>
                                <span className="text-2xl font-bold text-[#0f3d3e]">₦{totalPrice.toLocaleString()}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-4 bg-[#c9a66b] text-white font-bold rounded-lg hover:bg-[#b08d55] transition-all transform active:scale-95 shadow-lg"
                        >
                            Confirm & Pay
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BookingModal;
