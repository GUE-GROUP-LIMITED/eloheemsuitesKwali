import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Room } from '../data/rooms';
import { FaTimes, FaCalendarAlt, FaWhatsapp } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../datepicker-custom.css';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    room?: Room | null;
}

const WHATSAPP_NUMBER = '2349028873258';

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

    const formatDate = (date: Date | null) =>
        date ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A';

    const sendToWhatsApp = (e: React.FormEvent) => {
        e.preventDefault();

        const message = [
            `🏨 *New Booking Request – Eloheems Suites Kwali*`,
            ``,
            `📋 *Room:* ${room?.name ?? 'N/A'}`,
            `💰 *Price per Night:* ₦${room?.price.toLocaleString() ?? 'N/A'}`,
            ``,
            `📅 *Check-in:* ${formatDate(formData.checkIn)}`,
            `📅 *Check-out:* ${formatDate(formData.checkOut)}`,
            `🌙 *Duration:* ${days} night${days !== 1 ? 's' : ''}`,
            `💵 *Total Price:* ₦${totalPrice.toLocaleString()}`,
            ``,
            `👤 *Guest Name:* ${formData.fullName}`,
            `📧 *Email:* ${formData.email}`,
            `📞 *Phone:* ${formData.phone || 'Not provided'}`,
            formData.notes ? `📝 *Special Requests:* ${formData.notes}` : '',
        ].filter(Boolean).join('\n');

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        onClose();
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
                    <form onSubmit={sendToWhatsApp} className="modal-body">
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

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                placeholder="+234 800 000 0000"
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Special Requests <span style={{ opacity: 0.6, fontWeight: 400 }}>(optional)</span></label>
                            <textarea
                                name="notes"
                                rows={3}
                                placeholder="Any special requests or requirements..."
                                onChange={handleInputChange}
                                className="form-control"
                                style={{ resize: 'vertical' }}
                            />
                        </div>

                        {/* Summary */}
                        {days > 0 && (
                            <div className="modal-summary">
                                <span>Total for {days} night{days !== 1 ? 's' : ''}:</span>
                                <span>₦{totalPrice.toLocaleString()}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn-confirm"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                        >
                            <FaWhatsapp size={20} />
                            Send Booking via WhatsApp
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BookingModal;
