import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../../lib/supabase';
import { adminApi } from '../../lib/api';
import {
    FaCalendarCheck, FaBed, FaStar, FaEnvelope,
    FaSignOutAlt, FaChartLine, FaBars, FaTimes,
    FaReply, FaCheck, FaPhone, FaUser, FaClock
} from 'react-icons/fa';

interface Inquiry {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    inquiry_type: string;
    status: 'new' | 'in_progress' | 'resolved' | 'closed';
    created_at: string;
    responded_at: string | null;
    response_notes: string | null;
}

const AdminInquiries: React.FC = () => {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filter, setFilter] = useState<'all' | 'new' | 'in_progress' | 'resolved'>('all');
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [responseNote, setResponseNote] = useState('');

    useEffect(() => {
        checkAuth();
        loadInquiries();
    }, [filter]);

    const checkAuth = async () => {
        const { user } = await auth.getUser();
        if (!user) {
            navigate('/admin/login');
        }
    };

    const loadInquiries = async () => {
        setLoading(true);
        try {
            const status = filter !== 'all' ? filter : undefined;
            const { data } = await adminApi.inquiries.getAll(status);
            if (data) {
                setInquiries(data as Inquiry[]);
            }
        } catch (error) {
            console.error('Error loading inquiries:', error);
            // Use sample data if API fails
            setInquiries(sampleInquiries);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/admin/login');
    };

    const handleStatusChange = async (inquiryId: string, newStatus: string) => {
        try {
            await adminApi.inquiries.updateStatus(inquiryId, newStatus, responseNote || undefined);
            setSelectedInquiry(null);
            setResponseNote('');
            loadInquiries();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-NG', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            new: '#c62828',
            in_progress: '#ef6c00',
            resolved: '#2e7d32',
            closed: '#757575'
        };
        return colors[status] || '#888';
    };

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: FaChartLine, path: '/admin/dashboard' },
        { id: 'bookings', label: 'Bookings', icon: FaCalendarCheck, path: '/admin/bookings' },
        { id: 'rooms', label: 'Rooms', icon: FaBed, path: '/admin/rooms' },
        { id: 'reviews', label: 'Reviews', icon: FaStar, path: '/admin/reviews' },
        { id: 'inquiries', label: 'Inquiries', icon: FaEnvelope, path: '/admin/inquiries' },
    ];

    // Sample data for demo
    const sampleInquiries: Inquiry[] = [
        {
            id: '1',
            name: 'John Okafor',
            email: 'john.okafor@gmail.com',
            phone: '+234 803 123 4567',
            subject: 'Event Booking Inquiry',
            message: 'Hello, I would like to inquire about booking the Golden Hall for a wedding reception on March 15th, 2025. We expect about 200 guests. Could you please provide pricing and availability?',
            inquiry_type: 'booking',
            status: 'new',
            created_at: '2025-01-05T10:30:00Z',
            responded_at: null,
            response_notes: null
        },
        {
            id: '2',
            name: 'Amara Eze',
            email: 'amara.eze@yahoo.com',
            phone: '+234 806 789 0123',
            subject: 'Room Rates Question',
            message: 'Good day, I wanted to ask about your room rates for the Executive Luxury Suite. Do you offer any discounts for week-long stays?',
            inquiry_type: 'general',
            status: 'in_progress',
            created_at: '2025-01-04T14:15:00Z',
            responded_at: null,
            response_notes: null
        },
        {
            id: '3',
            name: 'David Adeyemi',
            email: 'david.a@company.com',
            phone: null,
            subject: 'Corporate Partnership',
            message: 'We are interested in establishing a corporate partnership for our company retreats. Please contact us to discuss potential arrangements.',
            inquiry_type: 'other',
            status: 'resolved',
            created_at: '2025-01-02T09:00:00Z',
            responded_at: '2025-01-03T11:30:00Z',
            response_notes: 'Forwarded to sales team. Meeting scheduled for next week.'
        }
    ];

    const displayInquiries = inquiries.length > 0 ? inquiries : sampleInquiries;
    const filteredInquiries = displayInquiries.filter(inquiry => {
        if (filter === 'all') return true;
        return inquiry.status === filter;
    });

    const newCount = displayInquiries.filter(i => i.status === 'new').length;

    return (
        <div className="admin-dashboard">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <img
                        src="https://codesnippet-741238344.imgix.net/eloheem/PHOTO-2025-03-18-14-28-32-removebg-preview.png"
                        alt="Eloheem Suites"
                        className="sidebar-logo"
                    />
                    <span>Admin Panel</span>
                    <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
                        <FaTimes />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map(item => (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`nav-item ${item.id === 'inquiries' ? 'active' : ''}`}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                            {item.id === 'inquiries' && newCount > 0 && (
                                <span className="nav-badge">{newCount}</span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="btn-logout" onClick={handleLogout}>
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-topbar">
                    <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
                        <FaBars />
                    </button>
                    <h1>Inquiries & Messages</h1>
                </header>

                <div className="dashboard-content">
                    {/* Filter Tabs */}
                    <div className="filter-tabs">
                        {(['all', 'new', 'in_progress', 'resolved'] as const).map(status => (
                            <button
                                key={status}
                                className={`filter-tab ${filter === status ? 'active' : ''}`}
                                onClick={() => setFilter(status)}
                            >
                                {status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
                                {status === 'new' && newCount > 0 && (
                                    <span className="badge">{newCount}</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="loading-state">Loading inquiries...</div>
                    ) : filteredInquiries.length === 0 ? (
                        <div className="empty-state">No inquiries found</div>
                    ) : (
                        <div className="inquiries-list">
                            {filteredInquiries.map((inquiry, index) => (
                                <motion.div
                                    key={inquiry.id}
                                    className={`inquiry-card ${inquiry.status}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <div className="inquiry-header">
                                        <div className="inquiry-sender">
                                            <div className="sender-avatar">
                                                <FaUser />
                                            </div>
                                            <div className="sender-info">
                                                <h3>{inquiry.name}</h3>
                                                <span className="sender-email">{inquiry.email}</span>
                                                {inquiry.phone && (
                                                    <span className="sender-phone">
                                                        <FaPhone /> {inquiry.phone}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="inquiry-meta">
                                            <span
                                                className="inquiry-status"
                                                style={{ background: getStatusColor(inquiry.status) }}
                                            >
                                                {inquiry.status.replace('_', ' ')}
                                            </span>
                                            <span className="inquiry-date">
                                                <FaClock /> {formatDate(inquiry.created_at)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="inquiry-body">
                                        {inquiry.subject && (
                                            <h4 className="inquiry-subject">{inquiry.subject}</h4>
                                        )}
                                        <p className="inquiry-message">{inquiry.message}</p>

                                        {inquiry.response_notes && (
                                            <div className="inquiry-response">
                                                <strong>Response Notes:</strong>
                                                <p>{inquiry.response_notes}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="inquiry-footer">
                                        <span className="inquiry-type">
                                            Type: {inquiry.inquiry_type}
                                        </span>

                                        <div className="inquiry-actions">
                                            {inquiry.status === 'new' && (
                                                <>
                                                    <button
                                                        className="btn-action-sm primary"
                                                        onClick={() => setSelectedInquiry(inquiry)}
                                                    >
                                                        <FaReply /> Respond
                                                    </button>
                                                    <button
                                                        className="btn-action-sm secondary"
                                                        onClick={() => handleStatusChange(inquiry.id, 'in_progress')}
                                                    >
                                                        Mark In Progress
                                                    </button>
                                                </>
                                            )}
                                            {inquiry.status === 'in_progress' && (
                                                <button
                                                    className="btn-action-sm success"
                                                    onClick={() => setSelectedInquiry(inquiry)}
                                                >
                                                    <FaCheck /> Mark Resolved
                                                </button>
                                            )}
                                            <a
                                                href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject || 'Your Inquiry'}`}
                                                className="btn-action-sm outline"
                                            >
                                                <FaEnvelope /> Email
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Response Modal */}
            {selectedInquiry && (
                <div className="admin-modal-overlay" onClick={() => setSelectedInquiry(null)}>
                    <motion.div
                        className="admin-modal small"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h2>Update Inquiry Status</h2>
                            <button className="modal-close" onClick={() => setSelectedInquiry(null)}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="modal-body">
                            <p className="modal-info">
                                <strong>From:</strong> {selectedInquiry.name}<br />
                                <strong>Subject:</strong> {selectedInquiry.subject || 'General Inquiry'}
                            </p>

                            <div className="form-group">
                                <label>Response Notes (Optional)</label>
                                <textarea
                                    value={responseNote}
                                    onChange={(e) => setResponseNote(e.target.value)}
                                    rows={4}
                                    placeholder="Add notes about how this inquiry was handled..."
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                className="btn-cancel"
                                onClick={() => setSelectedInquiry(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-save"
                                onClick={() => handleStatusChange(selectedInquiry.id, 'resolved')}
                            >
                                <FaCheck /> Mark as Resolved
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default AdminInquiries;
