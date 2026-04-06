import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Room } from '../data/rooms';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker-custom.css';

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
        checkIn: null as Date | null,
        checkOut: null as Date | null,
        fullName: '',
        email: '',
        phone: '',
        notes: ''
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [days, setDays] = useState(0);

    useEffect(() => {
        if (formData.checkIn && formData.checkOut && room) {
            const diffTime = Math.abs(formData.checkOut.getTime() - formData.checkIn.getTime());
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
                check_in: formData.checkIn?.toISOString().split('T')[0] || '',
                check_out: formData.checkOut?.toISOString().split('T')[0] || '',
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
                                <label>Check-in Date</label>
                                <div className="date-picker-wrapper">
                                    <FaCalendarAlt className="date-picker-icon" />
                                    <DatePicker
                                        selected={formData.checkIn}
                                        onChange={(date: Date | null) => setFormData(prev => ({ ...prev, checkIn: date }))}
                                        selectsStart
                                        startDate={formData.checkIn}
                                        endDate={formData.checkOut}
                                        minDate={new Date()}
                                        placeholderText="Select check-in date"
                                        dateFormat="MMMM d, yyyy"
                                        className="form-control date-picker-input"
                                        withPortal
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Check-out Date</label>
                                <div className="date-picker-wrapper">
                                    <FaCalendarAlt className="date-picker-icon" />
                                    <DatePicker
                                        selected={formData.checkOut}
                                        onChange={(date: Date | null) => setFormData(prev => ({ ...prev, checkOut: date }))}
                                        selectsEnd
                                        startDate={formData.checkIn}
                                        endDate={formData.checkOut}
                                        minDate={formData.checkIn || new Date()}
                                        placeholderText="Select check-out date"
                                        dateFormat="MMMM d, yyyy"
                                        className="form-control date-picker-input"
                                        withPortal
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    placeholder="John Doe"
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="john@example.com"
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
