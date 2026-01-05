import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../../lib/supabase';
import { adminApi } from '../../lib/api';
import {
    FaCalendarCheck, FaBed, FaStar, FaEnvelope,
    FaSignOutAlt, FaChartLine, FaBars, FaTimes,
    FaCheck, FaTimes as FaReject, FaStar as FaFeature
} from 'react-icons/fa';

interface Review {
    id: string;
    rating: number;
    title: string;
    content: string;
    guest_name: string;
    guest_location: string;
    guest_avatar: string;
    is_approved: boolean;
    is_featured: boolean;
    created_at: string;
    room_id?: string;
}

const AdminReviews: React.FC = () => {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'featured'>('all');

    useEffect(() => {
        checkAuth();
        loadReviews();
    }, [filter]);

    const checkAuth = async () => {
        const { user } = await auth.getUser();
        if (!user) {
            navigate('/admin/login');
        }
    };

    const loadReviews = async () => {
        setLoading(true);
        try {
            let data;
            if (filter === 'pending') {
                const result = await adminApi.reviews.getPending();
                data = result.data;
            } else {
                // Get all reviews - we'll filter client-side for now
                const approved = await adminApi.reviews.getPending();
                // For demo, using pending endpoint - in production you'd have getAllReviews
                data = approved.data || [];
            }
            setReviews(data as Review[] || []);
        } catch (error) {
            console.error('Error loading reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/admin/login');
    };

    const handleApprove = async (reviewId: string) => {
        try {
            await adminApi.reviews.approve(reviewId);
            loadReviews();
        } catch (error) {
            console.error('Error approving review:', error);
        }
    };

    const handleReject = async (reviewId: string) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await adminApi.reviews.reject(reviewId);
                loadReviews();
            } catch (error) {
                console.error('Error rejecting review:', error);
            }
        }
    };

    const handleToggleFeatured = async (reviewId: string, currentStatus: boolean) => {
        try {
            await adminApi.reviews.toggleFeatured(reviewId, !currentStatus);
            loadReviews();
        } catch (error) {
            console.error('Error toggling featured:', error);
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-NG', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const renderStars = (rating: number) => {
        return Array(5).fill(0).map((_, i) => (
            <FaStar key={i} className={i < rating ? 'star-filled' : 'star-empty'} />
        ));
    };

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: FaChartLine, path: '/admin/dashboard' },
        { id: 'bookings', label: 'Bookings', icon: FaCalendarCheck, path: '/admin/bookings' },
        { id: 'rooms', label: 'Rooms', icon: FaBed, path: '/admin/rooms' },
        { id: 'reviews', label: 'Reviews', icon: FaStar, path: '/admin/reviews' },
        { id: 'inquiries', label: 'Inquiries', icon: FaEnvelope, path: '/admin/inquiries' },
    ];

    // Sample data for demo (will be replaced by actual data from Supabase)
    const sampleReviews: Review[] = [
        {
            id: '1',
            rating: 5,
            title: 'Wonderful Stay!',
            content: 'A wonderful stay! The Royal Room was cozy and the staff were incredibly welcoming. The attention to detail and the quality of service exceeded all my expectations.',
            guest_name: 'Sarah Mitchell',
            guest_location: 'United Kingdom',
            guest_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
            is_approved: true,
            is_featured: true,
            created_at: '2025-01-02T10:00:00Z'
        },
        {
            id: '2',
            rating: 5,
            title: 'Perfect Event Venue',
            content: 'The Golden Hall was perfect for our family event. Everything was flawless!',
            guest_name: 'Ahmed Khalil',
            guest_location: 'Nigeria',
            guest_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
            is_approved: true,
            is_featured: false,
            created_at: '2025-01-01T10:00:00Z'
        },
        {
            id: '3',
            rating: 4,
            title: 'Great experience',
            content: 'Very nice hotel, clean rooms and friendly staff. Would recommend!',
            guest_name: 'Pending User',
            guest_location: 'Lagos, Nigeria',
            guest_avatar: '',
            is_approved: false,
            is_featured: false,
            created_at: '2025-01-05T10:00:00Z'
        }
    ];

    const displayReviews = reviews.length > 0 ? reviews : sampleReviews;
    const filteredReviews = displayReviews.filter(review => {
        if (filter === 'pending') return !review.is_approved;
        if (filter === 'approved') return review.is_approved;
        if (filter === 'featured') return review.is_featured;
        return true;
    });

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
                            className={`nav-item ${item.id === 'reviews' ? 'active' : ''}`}
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
                    <h1>Reviews Management</h1>
                </header>

                <div className="dashboard-content">
                    {/* Filter Tabs */}
                    <div className="filter-tabs reviews-filter">
                        {(['all', 'pending', 'approved', 'featured'] as const).map(status => (
                            <button
                                key={status}
                                className={`filter-tab ${filter === status ? 'active' : ''}`}
                                onClick={() => setFilter(status)}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                {status === 'pending' && (
                                    <span className="badge">{displayReviews.filter(r => !r.is_approved).length}</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="loading-state">Loading reviews...</div>
                    ) : filteredReviews.length === 0 ? (
                        <div className="empty-state">No reviews found</div>
                    ) : (
                        <div className="reviews-admin-grid">
                            {filteredReviews.map((review, index) => (
                                <motion.div
                                    key={review.id}
                                    className={`review-admin-card ${!review.is_approved ? 'pending' : ''} ${review.is_featured ? 'featured' : ''}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <div className="review-admin-header">
                                        <div className="reviewer-info">
                                            <img
                                                src={review.guest_avatar || 'https://via.placeholder.com/50'}
                                                alt={review.guest_name}
                                                className="reviewer-avatar"
                                            />
                                            <div>
                                                <h4>{review.guest_name}</h4>
                                                <span className="reviewer-location">{review.guest_location}</span>
                                            </div>
                                        </div>
                                        <div className="review-rating">
                                            {renderStars(review.rating)}
                                        </div>
                                    </div>

                                    <div className="review-admin-body">
                                        {review.title && <h3>{review.title}</h3>}
                                        <p>{review.content}</p>
                                        <span className="review-date">{formatDate(review.created_at)}</span>
                                    </div>

                                    <div className="review-admin-footer">
                                        <div className="review-status">
                                            {!review.is_approved && (
                                                <span className="status-badge pending">Pending Approval</span>
                                            )}
                                            {review.is_approved && (
                                                <span className="status-badge approved">Approved</span>
                                            )}
                                            {review.is_featured && (
                                                <span className="status-badge featured">Featured</span>
                                            )}
                                        </div>

                                        <div className="review-actions">
                                            {!review.is_approved && (
                                                <button
                                                    className="btn-icon approve"
                                                    onClick={() => handleApprove(review.id)}
                                                    title="Approve"
                                                >
                                                    <FaCheck />
                                                </button>
                                            )}
                                            {review.is_approved && (
                                                <button
                                                    className={`btn-icon feature ${review.is_featured ? 'active' : ''}`}
                                                    onClick={() => handleToggleFeatured(review.id, review.is_featured)}
                                                    title={review.is_featured ? 'Unfeature' : 'Feature'}
                                                >
                                                    <FaFeature />
                                                </button>
                                            )}
                                            <button
                                                className="btn-icon delete"
                                                onClick={() => handleReject(review.id)}
                                                title="Delete"
                                            >
                                                <FaReject />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminReviews;
