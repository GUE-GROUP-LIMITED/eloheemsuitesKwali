// API Service Layer
// Handles all API calls to Supabase

import { createClient } from '@supabase/supabase-js';
import type {
    Room,
    BookingStatus
} from '../../backend/types/database.types';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create an untyped Supabase client for API calls
// This avoids strict type checking issues while maintaining runtime correctness
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

// =====================================================
// ROOMS API
// =====================================================
export const roomsApi = {
    // Get all available rooms
    getAll: async () => {
        const { data, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('is_available', true)
            .order('display_order');
        return { data, error };
    },

    // Get room by slug or ID
    getBySlug: async (slug: string) => {
        const { data, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('slug', slug)
            .single();
        return { data, error };
    },

    // Get rooms by category
    getByCategory: async (category: 'accommodation' | 'event_space') => {
        const { data, error } = await supabase
            .from('rooms')
            .select('*')
            .eq('category', category)
            .eq('is_available', true)
            .order('display_order');
        return { data, error };
    },

    // Check availability
    checkAvailability: async (roomId: string, checkIn: string, checkOut: string) => {
        const { data, error } = await supabase
            .rpc('check_room_availability', {
                p_room_id: roomId,
                p_check_in: checkIn,
                p_check_out: checkOut
            });
        return { isAvailable: data, error };
    },

    // Get available rooms for dates
    getAvailable: async (checkIn: string, checkOut: string, category?: string) => {
        const { data, error } = await supabase
            .rpc('get_available_rooms', {
                p_check_in: checkIn,
                p_check_out: checkOut,
                p_category: category || null
            });
        return { data, error };
    }
};

// =====================================================
// BOOKINGS API
// =====================================================
export const bookingsApi = {
    // Create new booking
    create: async (bookingData: {
        room_id: string;
        check_in: string;
        check_out: string;
        guest_email: string;
        guest_name: string;
        guest_phone: string;
        num_adults?: number;
        num_children?: number;
        special_requests?: string;
    }) => {
        const { data, error } = await supabase.rpc('create_booking', {
            p_room_id: bookingData.room_id,
            p_check_in: bookingData.check_in,
            p_check_out: bookingData.check_out,
            p_guest_email: bookingData.guest_email,
            p_guest_name: bookingData.guest_name,
            p_guest_phone: bookingData.guest_phone,
            p_num_adults: bookingData.num_adults || 1,
            p_num_children: bookingData.num_children || 0,
            p_special_requests: bookingData.special_requests || null
        });
        return { data, error };
    },

    // Get booking by reference
    getByRef: async (bookingRef: string) => {
        const { data, error } = await supabase
            .from('bookings')
            .select(`
                *,
                rooms (name, type, images),
                guests (first_name, last_name, email, phone)
            `)
            .eq('booking_ref', bookingRef)
            .single();
        return { data, error };
    },

    // Get guest's bookings
    getMyBookings: async () => {
        const { data, error } = await supabase
            .from('bookings')
            .select(`
                *,
                rooms (name, type, images)
            `)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    // Cancel booking
    cancel: async (bookingId: string, reason?: string) => {
        const { data, error } = await supabase.rpc('cancel_booking', {
            p_booking_id: bookingId,
            p_reason: reason || null
        });
        return { data, error };
    }
};

// =====================================================
// REVIEWS API
// =====================================================
export const reviewsApi = {
    // Get approved reviews
    getApproved: async (limit?: number) => {
        let query = supabase
            .from('reviews')
            .select('*')
            .eq('is_approved', true)
            .order('created_at', { ascending: false });

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;
        return { data, error };
    },

    // Get featured reviews
    getFeatured: async () => {
        const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('is_approved', true)
            .eq('is_featured', true)
            .order('created_at', { ascending: false });
        return { data, error };
    },

    // Submit a review
    submit: async (reviewData: {
        booking_id?: string;
        room_id?: string;
        rating: number;
        title?: string;
        content: string;
        guest_name: string;
        guest_location?: string;
    }) => {
        const { data, error } = await supabase
            .from('reviews')
            .insert({
                ...reviewData,
                is_approved: false,
                is_featured: false
            })
            .select()
            .single();
        return { data, error };
    }
};

// =====================================================
// SERVICES API
// =====================================================
export const servicesApi = {
    // Get all services
    getAll: async () => {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('is_available', true)
            .order('display_order');
        return { data, error };
    },

    // Get services by category
    getByCategory: async (category: string) => {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('category', category)
            .eq('is_available', true);
        return { data, error };
    }
};

// =====================================================
// INQUIRIES API
// =====================================================
export const inquiriesApi = {
    // Submit contact form
    submit: async (formData: {
        name: string;
        email: string;
        phone?: string;
        subject?: string;
        message: string;
        inquiry_type?: string;
    }) => {
        const { data, error } = await supabase
            .from('inquiries')
            .insert({
                name: formData.name,
                email: formData.email,
                phone: formData.phone || null,
                subject: formData.subject || null,
                message: formData.message,
                inquiry_type: formData.inquiry_type || 'general',
                status: 'new'
            })
            .select()
            .single();
        return { data, error };
    }
};

// =====================================================
// ADMIN API (Requires authentication)
// =====================================================
export const adminApi = {
    // Dashboard stats
    getDashboardStats: async () => {
        const { data, error } = await supabase.rpc('get_dashboard_stats');
        return { data, error };
    },

    // Bookings management
    bookings: {
        getAll: async (filters?: { status?: BookingStatus; limit?: number }) => {
            let query = supabase
                .from('bookings')
                .select(`
                    *,
                    rooms (name, type),
                    guests (first_name, last_name, email)
                `)
                .order('created_at', { ascending: false });

            if (filters?.status) {
                query = query.eq('status', filters.status);
            }
            if (filters?.limit) {
                query = query.limit(filters.limit);
            }

            const { data, error } = await query;
            return { data, error };
        },

        confirm: async (bookingId: string) => {
            const { data: { user } } = await supabase.auth.getUser();
            const { data, error } = await supabase.rpc('confirm_booking', {
                p_booking_id: bookingId,
                p_admin_user_id: user?.id || null
            });
            return { data, error };
        },

        cancel: async (bookingId: string, reason: string) => {
            const { data, error } = await supabase.rpc('cancel_booking', {
                p_booking_id: bookingId,
                p_reason: reason
            });
            return { data, error };
        },

        updateStatus: async (bookingId: string, status: BookingStatus) => {
            const { data, error } = await supabase
                .from('bookings')
                .update({ status })
                .eq('id', bookingId)
                .select()
                .single();
            return { data, error };
        }
    },

    // Rooms management
    rooms: {
        getAll: async () => {
            const { data, error } = await supabase
                .from('rooms')
                .select('*')
                .order('display_order');
            return { data, error };
        },

        update: async (roomId: string, updates: Partial<Room>) => {
            const { data, error } = await supabase
                .from('rooms')
                .update(updates)
                .eq('id', roomId)
                .select()
                .single();
            return { data, error };
        },

        toggleAvailability: async (roomId: string, isAvailable: boolean) => {
            const { data, error } = await supabase
                .from('rooms')
                .update({ is_available: isAvailable })
                .eq('id', roomId)
                .select()
                .single();
            return { data, error };
        }
    },

    // Reviews management
    reviews: {
        getPending: async () => {
            const { data, error } = await supabase
                .from('reviews')
                .select('*')
                .eq('is_approved', false)
                .order('created_at', { ascending: false });
            return { data, error };
        },

        approve: async (reviewId: string) => {
            const { data: { user } } = await supabase.auth.getUser();
            const { data, error } = await supabase
                .from('reviews')
                .update({
                    is_approved: true,
                    approved_by: user?.id,
                    approved_at: new Date().toISOString()
                })
                .eq('id', reviewId)
                .select()
                .single();
            return { data, error };
        },

        reject: async (reviewId: string) => {
            const { error } = await supabase
                .from('reviews')
                .delete()
                .eq('id', reviewId);
            return { error };
        },

        toggleFeatured: async (reviewId: string, isFeatured: boolean) => {
            const { data, error } = await supabase
                .from('reviews')
                .update({ is_featured: isFeatured })
                .eq('id', reviewId)
                .select()
                .single();
            return { data, error };
        }
    },

    // Inquiries management
    inquiries: {
        getAll: async (status?: string) => {
            let query = supabase
                .from('inquiries')
                .select('*')
                .order('created_at', { ascending: false });

            if (status) {
                query = query.eq('status', status);
            }

            const { data, error } = await query;
            return { data, error };
        },

        updateStatus: async (inquiryId: string, status: string, notes?: string) => {
            const { data, error } = await supabase
                .from('inquiries')
                .update({
                    status,
                    response_notes: notes,
                    responded_at: ['resolved', 'closed'].includes(status)
                        ? new Date().toISOString()
                        : null
                })
                .eq('id', inquiryId)
                .select()
                .single();
            return { data, error };
        }
    }
};

export default {
    rooms: roomsApi,
    bookings: bookingsApi,
    reviews: reviewsApi,
    services: servicesApi,
    inquiries: inquiriesApi,
    admin: adminApi
};
