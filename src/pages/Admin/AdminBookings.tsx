import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../../lib/supabase';
import { adminApi } from '../../lib/api';
import {
    FaCalendarCheck, FaBed, FaStar, FaEnvelope,
    FaSignOutAlt, FaChartLine, FaBars, FaTimes,
    FaCheck, FaTimes as FaCancel, FaEye, FaSearch
} from 'react-icons/fa';

const AdminBookings: React.FC = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        checkAuth();
        loadBookings();
    }, [filter]);

    const checkAuth = async () => {
        const { user } = await auth.getUser();
        if (!user) {
            navigate('/admin/login');
        }
    };

    const loadBookings = async () => {
        setLoading(true);
        try {
            const filters = filter !== 'all' ? { status: filter as any } : undefined;
            const { data } = await adminApi.bookings.getAll(filters);
            if (data) {
                setBookings(data);
            }
        } catch (error) {
            console.error('Error loading bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (bookingId: string) => {
        const { error } = await adminApi.bookings.confirm(bookingId);
        if (!error) {
            loadBookings();
        }
    };

    const handleCancel = async (bookingId: string) => {
        const reason = prompt('Enter cancellation reason:');
        if (reason) {
            const { error } = await adminApi.bookings.cancel(bookingId, reason);
            if (!error) {
                loadBookings();
            }
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/admin/login');
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-NG', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        const classes: Record<string, string> = {
            pending: 'badge-warning',
            confirmed: 'badge-success',
            checked_in: 'badge-info',
            checked_out: 'badge-secondary',
            cancelled: 'badge-danger'
        };
        return `status-badge ${classes[status] || ''}`;
    };

    const getPaymentBadge = (status: string) => {
        const classes: Record<string, string> = {
            unpaid: 'badge-danger',
            partial: 'badge-warning',
            paid: 'badge-success',
            refunded: 'badge-secondary'
        };
        return `payment-badge ${classes[status] || ''}`;
    };

    const filteredBookings = bookings.filter(booking => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        return (
            booking.booking_ref?.toLowerCase().includes(search) ||
            booking.guest_name?.toLowerCase().includes(search) ||
            booking.guest_email?.toLowerCase().includes(search)
        );
    });

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: FaChartLine, path: '/admin/dashboard' },
        { id: 'bookings', label: 'Bookings', icon: FaCalendarCheck, path: '/admin/bookings' },
        { id: 'rooms', label: 'Rooms', icon: FaBed, path: '/admin/rooms' },
        { id: 'reviews', label: 'Reviews', icon: FaStar, path: '/admin/reviews' },
        { id: 'inquiries', label: 'Inquiries', icon: FaEnvelope, path: '/admin/inquiries' },
    ];

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
                            className={`nav-item ${item.id === 'bookings' ? 'active' : ''}`}
                        >
                            <item.icon />
                            <span>{item.label}</span>
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
                    <h1>Bookings Management</h1>
                </header>

                <div className="dashboard-content">
                    {/* Filters */}
                    <div className="table-controls">
                        <div className="search-box">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Search by ref, name, or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="filter-tabs">
                            {['all', 'pending', 'confirmed', 'checked_in', 'cancelled'].map(status => (
                                <button
                                    key={status}
                                    className={`filter-tab ${filter === status ? 'active' : ''}`}
                                    onClick={() => setFilter(status)}
                                >
                                    {status.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Bookings Table */}
                    <div className="data-table-container">
                        {loading ? (
                            <div className="loading-state">Loading bookings...</div>
                        ) : filteredBookings.length === 0 ? (
                            <div className="empty-state">No bookings found</div>
                        ) : (
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Ref</th>
                                        <th>Guest</th>
                                        <th>Room</th>
                                        <th>Check-in</th>
                                        <th>Check-out</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Payment</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings.map((booking, index) => (
                                        <motion.tr
                                            key={booking.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.03 }}
                                        >
                                            <td className="booking-ref">{booking.booking_ref}</td>
                                            <td>
                                                <div className="guest-info">
                                                    <span className="guest-name">{booking.guest_name}</span>
                                                    <span className="guest-email">{booking.guest_email}</span>
                                                </div>
                                            </td>
                                            <td>{booking.rooms?.name || 'N/A'}</td>
                                            <td>{formatDate(booking.check_in_date)}</td>
                                            <td>{formatDate(booking.check_out_date)}</td>
                                            <td className="amount">{formatCurrency(booking.total_amount)}</td>
                                            <td>
                                                <span className={getStatusBadge(booking.status)}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={getPaymentBadge(booking.payment_status)}>
                                                    {booking.payment_status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    {booking.status === 'pending' && (
                                                        <>
                                                            <button
                                                                className="btn-action confirm"
                                                                onClick={() => handleConfirm(booking.id)}
                                                                title="Confirm"
                                                            >
                                                                <FaCheck />
                                                            </button>
                                                            <button
                                                                className="btn-action cancel"
                                                                onClick={() => handleCancel(booking.id)}
                                                                title="Cancel"
                                                            >
                                                                <FaCancel />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        className="btn-action view"
                                                        title="View Details"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminBookings;
