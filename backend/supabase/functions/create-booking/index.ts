// Supabase Edge Function: Create Booking
// Handles booking creation with validation and notifications

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BookingRequest {
    room_id: string
    check_in: string
    check_out: string
    guest_email: string
    guest_name: string
    guest_phone: string
    num_adults?: number
    num_children?: number
    special_requests?: string
}

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // Initialize Supabase client
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        const supabase = createClient(supabaseUrl, supabaseKey)

        // Parse request body
        const body: BookingRequest = await req.json()

        // Validate required fields
        if (!body.room_id || !body.check_in || !body.check_out || !body.guest_email || !body.guest_name || !body.guest_phone) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: 'Missing required fields: room_id, check_in, check_out, guest_email, guest_name, guest_phone'
                }),
                {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                }
            )
        }

        // Validate dates
        const checkIn = new Date(body.check_in)
        const checkOut = new Date(body.check_out)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (checkIn < today) {
            return new Response(
                JSON.stringify({ success: false, error: 'Check-in date cannot be in the past' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        if (checkOut <= checkIn) {
            return new Response(
                JSON.stringify({ success: false, error: 'Check-out must be after check-in' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Call the create_booking function
        const { data, error } = await supabase.rpc('create_booking', {
            p_room_id: body.room_id,
            p_check_in: body.check_in,
            p_check_out: body.check_out,
            p_guest_email: body.guest_email,
            p_guest_name: body.guest_name,
            p_guest_phone: body.guest_phone,
            p_num_adults: body.num_adults || 1,
            p_num_children: body.num_children || 0,
            p_special_requests: body.special_requests || null
        })

        if (error) {
            console.error('Booking error:', error)
            return new Response(
                JSON.stringify({ success: false, error: error.message }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // If booking successful, trigger notification
        if (data.success) {
            // Get room details for email
            const { data: room } = await supabase
                .from('rooms')
                .select('name, price')
                .eq('id', body.room_id)
                .single()

            // Queue email notification (could call another edge function or use Supabase's built-in)
            console.log('Booking created:', data.booking_ref)
            console.log('Send confirmation email to:', body.guest_email)
        }

        return new Response(
            JSON.stringify(data),
            {
                status: data.success ? 200 : 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
        )

    } catch (error) {
        console.error('Unexpected error:', error)
        return new Response(
            JSON.stringify({ success: false, error: 'An unexpected error occurred' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
