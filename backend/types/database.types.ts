// TypeScript types generated from database schema
// These types are used throughout the frontend for type safety

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            rooms: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    type: string
                    category: 'accommodation' | 'event_space'
                    description: string | null
                    short_description: string | null
                    price: number
                    capacity_adults: number
                    capacity_children: number
                    bed_type: string | null
                    size_sqm: number | null
                    images: string[]
                    amenities: string[]
                    is_available: boolean
                    is_featured: boolean
                    display_order: number
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['rooms']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['rooms']['Insert']>
            }
            guests: {
                Row: {
                    id: string
                    auth_user_id: string | null
                    email: string
                    phone: string | null
                    first_name: string
                    last_name: string
                    address: string | null
                    city: string | null
                    state: string | null
                    country: string
                    id_type: string | null
                    id_number: string | null
                    notes: string | null
                    total_bookings: number
                    total_spent: number
                    is_vip: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['guests']['Row'], 'id' | 'created_at' | 'updated_at' | 'total_bookings' | 'total_spent'>
                Update: Partial<Database['public']['Tables']['guests']['Insert']>
            }
            bookings: {
                Row: {
                    id: string
                    booking_ref: string
                    guest_id: string | null
                    room_id: string | null
                    check_in_date: string
                    check_out_date: string
                    num_adults: number
                    num_children: number
                    num_nights: number
                    room_rate: number
                    subtotal: number
                    tax_amount: number
                    discount_amount: number
                    total_amount: number
                    status: 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
                    payment_status: 'unpaid' | 'partial' | 'paid' | 'refunded'
                    guest_name: string | null
                    guest_email: string | null
                    guest_phone: string | null
                    special_requests: string | null
                    arrival_time: string | null
                    confirmed_by: string | null
                    confirmed_at: string | null
                    cancelled_at: string | null
                    cancellation_reason: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'booking_ref' | 'num_nights' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['bookings']['Insert']>
            }
            payments: {
                Row: {
                    id: string
                    booking_id: string | null
                    amount: number
                    currency: string
                    payment_method: string | null
                    gateway: string | null
                    gateway_ref: string | null
                    gateway_response: Json | null
                    status: 'pending' | 'successful' | 'failed' | 'refunded'
                    paid_at: string | null
                    refunded_at: string | null
                    notes: string | null
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['payments']['Insert']>
            }
            reviews: {
                Row: {
                    id: string
                    booking_id: string | null
                    guest_id: string | null
                    room_id: string | null
                    rating: number
                    title: string | null
                    content: string
                    guest_name: string | null
                    guest_location: string | null
                    guest_avatar: string | null
                    is_approved: boolean
                    is_featured: boolean
                    approved_by: string | null
                    approved_at: string | null
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['reviews']['Insert']>
            }
            services: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    category: string | null
                    icon: string | null
                    price: number | null
                    price_unit: string | null
                    is_complimentary: boolean
                    is_available: boolean
                    display_order: number
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['services']['Insert']>
            }
            inquiries: {
                Row: {
                    id: string
                    name: string
                    email: string
                    phone: string | null
                    subject: string | null
                    message: string
                    inquiry_type: string
                    status: 'new' | 'in_progress' | 'resolved' | 'closed'
                    assigned_to: string | null
                    responded_at: string | null
                    response_notes: string | null
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['inquiries']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['inquiries']['Insert']>
            }
            events: {
                Row: {
                    id: string
                    booking_id: string
                    event_type: string | null
                    event_name: string | null
                    expected_guests: number | null
                    event_date: string
                    start_time: string | null
                    end_time: string | null
                    setup_time: string | null
                    catering_required: boolean
                    decoration_required: boolean
                    photography_required: boolean
                    projector_required: boolean
                    special_requirements: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['events']['Insert']>
            }
            admin_users: {
                Row: {
                    id: string
                    auth_user_id: string
                    email: string
                    full_name: string
                    role: 'super_admin' | 'admin' | 'manager' | 'staff'
                    avatar_url: string | null
                    phone: string | null
                    is_active: boolean
                    last_login_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['admin_users']['Insert']>
            }
            settings: {
                Row: {
                    id: string
                    key: string
                    value: Json
                    description: string | null
                    updated_by: string | null
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['settings']['Row'], 'id' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['settings']['Insert']>
            }
        }
        Functions: {
            check_room_availability: {
                Args: {
                    p_room_id: string
                    p_check_in: string
                    p_check_out: string
                    p_exclude_booking_id?: string
                }
                Returns: boolean
            }
            get_available_rooms: {
                Args: {
                    p_check_in: string
                    p_check_out: string
                    p_category?: string
                }
                Returns: Database['public']['Tables']['rooms']['Row'][]
            }
            create_booking: {
                Args: {
                    p_room_id: string
                    p_check_in: string
                    p_check_out: string
                    p_guest_email: string
                    p_guest_name: string
                    p_guest_phone: string
                    p_num_adults?: number
                    p_num_children?: number
                    p_special_requests?: string
                }
                Returns: Json
            }
            confirm_booking: {
                Args: {
                    p_booking_id: string
                    p_admin_user_id?: string
                }
                Returns: Json
            }
            cancel_booking: {
                Args: {
                    p_booking_id: string
                    p_reason?: string
                }
                Returns: Json
            }
            get_dashboard_stats: {
                Args: Record<string, never>
                Returns: Json
            }
        }
    }
}

// Convenience types
export type Room = Database['public']['Tables']['rooms']['Row']
export type Guest = Database['public']['Tables']['guests']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type Payment = Database['public']['Tables']['payments']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type Inquiry = Database['public']['Tables']['inquiries']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type AdminUser = Database['public']['Tables']['admin_users']['Row']

export type BookingStatus = Booking['status']
export type PaymentStatus = Booking['payment_status']
export type InquiryStatus = Inquiry['status']
export type AdminRole = AdminUser['role']
