import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../../lib/supabase';
import { adminApi } from '../../lib/api';
import {
    FaCalendarCheck, FaBed, FaStar, FaEnvelope,
    FaSignOutAlt, FaChartLine, FaBars, FaTimes,
    FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaSave
} from 'react-icons/fa';

interface Room {
    id: string;
    name: string;
    slug: string;
    type: string;
    category: string;
    description: string;
    price: number;
    capacity_adults: number;
    bed_type: string;
    images: string[];
    amenities: string[];
    is_available: boolean;
    is_featured: boolean;
}

const AdminRooms: React.FC = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        type: 'ROYAL',
        category: 'accommodation',
        description: '',
        price: 0,
        capacity_adults: 2,
        bed_type: 'King Size',
        images: [''],
        amenities: ['WiFi', 'Air Conditioning'],
        is_available: true,
        is_featured: false
    });

    useEffect(() => {
        checkAuth();
        loadRooms();
    }, []);

    const checkAuth = async () => {
        const { user } = await auth.getUser();
        if (!user) {
            navigate('/admin/login');
        }
    };

    const loadRooms = async () => {
        setLoading(true);
        try {
            const { data } = await adminApi.rooms.getAll();
            if (data) {
                setRooms(data as Room[]);
            }
        } catch (error) {
            console.error('Error loading rooms:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/admin/login');
    };

    const openAddModal = () => {
        setEditingRoom(null);
        setFormData({
            name: '',
            slug: '',
            type: 'ROYAL',
            category: 'accommodation',
            description: '',
            price: 0,
            capacity_adults: 2,
            bed_type: 'King Size',
            images: [''],
            amenities: ['WiFi', 'Air Conditioning'],
            is_available: true,
            is_featured: false
        });
        setIsModalOpen(true);
    };

    const openEditModal = (room: Room) => {
        setEditingRoom(room);
        setFormData({
            name: room.name,
            slug: room.slug,
            type: room.type,
            category: room.category,
            description: room.description || '',
            price: room.price,
            capacity_adults: room.capacity_adults,
            bed_type: room.bed_type || 'King Size',
            images: room.images?.length ? room.images : [''],
            amenities: room.amenities || [],
            is_available: room.is_available,
            is_featured: room.is_featured
        });
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editingRoom) {
                // Update existing room
                await adminApi.rooms.update(editingRoom.id, formData);
            } else {
                // For now, we'll use the update API - in production you'd have a create endpoint
                console.log('Creating new room:', formData);
            }
            setIsModalOpen(false);
            loadRooms();
        } catch (error) {
            console.error('Error saving room:', error);
        }
    };

    const handleToggleAvailability = async (roomId: string, currentStatus: boolean) => {
        try {
            await adminApi.rooms.toggleAvailability(roomId, !currentStatus);
            loadRooms();
        } catch (error) {
            console.error('Error toggling availability:', error);
        }
    };

    const handleDelete = async (roomId: string) => {
        if (window.confirm('Are you sure you want to delete this room?')) {
            try {
                // In production, you'd have a delete endpoint
                console.log('Delete room:', roomId);
                loadRooms();
            } catch (error) {
                console.error('Error deleting room:', error);
            }
        }
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
                            className={`nav-item ${item.id === 'rooms' ? 'active' : ''}`}
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
                    <h1>Rooms Management</h1>
                    <button className="btn-add-new" onClick={openAddModal}>
                        <FaPlus /> Add Room
                    </button>
                </header>

                <div className="dashboard-content">
                    {loading ? (
                        <div className="loading-state">Loading rooms...</div>
                    ) : rooms.length === 0 ? (
                        <div className="empty-state">No rooms found</div>
                    ) : (
                        <div className="rooms-admin-grid">
                            {rooms.map((room, index) => (
                                <motion.div
                                    key={room.id}
                                    className={`room-admin-card ${!room.is_available ? 'unavailable' : ''}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <div className="room-admin-image">
                                        <img src={room.images?.[0] || '/placeholder.jpg'} alt={room.name} />
                                        {room.is_featured && <span className="featured-badge">Featured</span>}
                                        {!room.is_available && <div className="unavailable-overlay">Unavailable</div>}
                                    </div>

                                    <div className="room-admin-body">
                                        <h3>{room.name}</h3>
                                        <span className="room-type">{room.type.replace('_', ' ')}</span>
                                        <p className="room-price">{formatCurrency(room.price)}/night</p>
                                        <p className="room-capacity">{room.capacity_adults} Adults • {room.bed_type}</p>

                                        <div className="room-admin-actions">
                                            <button
                                                className="btn-icon edit"
                                                onClick={() => openEditModal(room)}
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className={`btn-icon ${room.is_available ? 'hide' : 'show'}`}
                                                onClick={() => handleToggleAvailability(room.id, room.is_available)}
                                                title={room.is_available ? 'Hide' : 'Show'}
                                            >
                                                {room.is_available ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                            <button
                                                className="btn-icon delete"
                                                onClick={() => handleDelete(room.id)}
                                                title="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Edit/Add Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="admin-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        <motion.div
                            className="admin-modal"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header">
                                <h2>{editingRoom ? 'Edit Room' : 'Add New Room'}</h2>
                                <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Room Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. Royal Room"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Slug</label>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            placeholder="e.g. royal-room"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Type</label>
                                        <select
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option value="ROYAL">Royal</option>
                                            <option value="QUEENS_KINGS">Queens & Kings</option>
                                            <option value="EXECUTIVE_LUXURY">Executive Luxury</option>
                                            <option value="GOLDEN_HALL">Golden Hall</option>
                                            <option value="RECEPTION_GROUND">Reception Ground</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="accommodation">Accommodation</option>
                                            <option value="event_space">Event Space</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Price (₦)</label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Capacity (Adults)</label>
                                        <input
                                            type="number"
                                            value={formData.capacity_adults}
                                            onChange={(e) => setFormData({ ...formData, capacity_adults: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Bed Type</label>
                                        <input
                                            type="text"
                                            value={formData.bed_type}
                                            onChange={(e) => setFormData({ ...formData, bed_type: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                        placeholder="Room description..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Image URL</label>
                                    <input
                                        type="text"
                                        value={formData.images[0]}
                                        onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="form-row checkboxes">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_available}
                                            onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                                        />
                                        Available for Booking
                                    </label>
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.is_featured}
                                            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                        />
                                        Featured Room
                                    </label>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                                <button className="btn-save" onClick={handleSave}>
                                    <FaSave /> {editingRoom ? 'Update Room' : 'Create Room'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminRooms;
