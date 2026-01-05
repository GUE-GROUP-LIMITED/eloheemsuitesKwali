import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../../lib/supabase';
import { adminApi } from '../../lib/api';
import {
    FaCalendarCheck, FaBed, FaStar, FaEnvelope,
    FaMoneyBillWave, FaSignOutAlt, FaChartLine,
    FaUserClock, FaClock, FaBars, FaTimes
} from 'react-icons/fa';

interface DashboardStats {
    total_bookings: number;
    pending_bookings: number;
    today_checkins: number;
    today_checkouts: number;
    total_revenue: number;
    monthly_revenue: number;
    pending_inquiries: number;
}

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        checkAuth();
        loadStats();
    }, []);

    const checkAuth = async () => {
        const { user } = await auth.getUser();
        if (!user) {
            navigate('/admin/login');
        }
    };

    const loadStats = async () => {
        try {
            const { data } = await adminApi.getDashboardStats();
            if (data) {
                setStats(data as DashboardStats);
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/admin/login');
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(amount);
    };

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
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
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
                {/* Top Bar */}
                <header className="admin-topbar">
                    <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
                        <FaBars />
                    </button>
                    <h1>Dashboard Overview</h1>
                    <div className="topbar-actions">
                        <span className="date-display">
                            {new Date().toLocaleDateString('en-NG', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="dashboard-content">
                    {loading ? (
                        <div className="loading-state">Loading dashboard...</div>
                    ) : (
                        <>
                            {/* Stats Grid */}
                            <div className="stats-grid">
                                <motion.div
                                    className="stat-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="stat-icon blue">
                                        <FaCalendarCheck />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats?.total_bookings || 0}</span>
                                        <span className="stat-label">Total Bookings</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="stat-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    <div className="stat-icon orange">
                                        <FaUserClock />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats?.pending_bookings || 0}</span>
                                        <span className="stat-label">Pending Bookings</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="stat-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="stat-icon green">
                                        <FaClock />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats?.today_checkins || 0}</span>
                                        <span className="stat-label">Today's Check-ins</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="stat-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 }}
                                >
                                    <div className="stat-icon purple">
                                        <FaEnvelope />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats?.pending_inquiries || 0}</span>
                                        <span className="stat-label">New Inquiries</span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Revenue Section */}
                            <div className="revenue-section">
                                <motion.div
                                    className="revenue-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="revenue-header">
                                        <h3>Revenue Overview</h3>
                                        <FaMoneyBillWave />
                                    </div>
                                    <div className="revenue-stats">
                                        <div className="revenue-item">
                                            <span className="revenue-label">This Month</span>
                                            <span className="revenue-value">
                                                {formatCurrency(stats?.monthly_revenue || 0)}
                                            </span>
                                        </div>
                                        <div className="revenue-item">
                                            <span className="revenue-label">All Time</span>
                                            <span className="revenue-value total">
                                                {formatCurrency(stats?.total_revenue || 0)}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="quick-actions"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                >
                                    <h3>Quick Actions</h3>
                                    <div className="actions-grid">
                                        <Link to="/admin/bookings" className="action-btn">
                                            <FaCalendarCheck /> View Bookings
                                        </Link>
                                        <Link to="/admin/rooms" className="action-btn">
                                            <FaBed /> Manage Rooms
                                        </Link>
                                        <Link to="/admin/reviews" className="action-btn">
                                            <FaStar /> Moderate Reviews
                                        </Link>
                                        <Link to="/admin/inquiries" className="action-btn">
                                            <FaEnvelope /> Check Messages
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Today's Activity */}
                            <motion.div
                                className="activity-section"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <h3>Today's Activity</h3>
                                <div className="activity-cards">
                                    <div className="activity-card checkin">
                                        <h4>Check-ins</h4>
                                        <span className="activity-count">{stats?.today_checkins || 0}</span>
                                        <p>guests arriving today</p>
                                    </div>
                                    <div className="activity-card checkout">
                                        <h4>Check-outs</h4>
                                        <span className="activity-count">{stats?.today_checkouts || 0}</span>
                                        <p>guests departing today</p>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
