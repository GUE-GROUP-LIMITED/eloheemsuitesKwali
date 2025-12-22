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
        });
    };

    const triggerPayment = (e: React.FormEvent) => {
        e.preventDefault();
        handlePayment();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="modal-content"
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                >
                    {/* Header */}
                    <div className="modal-header">
                        <div>
                            <h3>Book {room?.name}</h3>
                            <p>₦{room?.price.toLocaleString()} / night</p>
                        </div>
                        <button onClick={onClose} className="modal-close-btn">
                            <FaTimes size={24} />
                        </button>
                    </div>

                    {/* Body */}
                    <form onSubmit={triggerPayment} className="modal-body">
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-500 mb-1">Check-in</label>
                                <input
                                    type="date"
                                    name="checkIn"
                                    required
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-500 mb-1">Check-out</label>
                                <input
                                    type="date"
                                    name="checkOut"
                                    required
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>

                        {/* Summary */}
                        {days > 0 && (
                            <div className="modal-summary">
                                <span>Total for {days} nights:</span>
                                <span>₦{totalPrice.toLocaleString()}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn-confirm"
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
