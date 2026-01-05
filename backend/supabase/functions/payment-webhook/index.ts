// Supabase Edge Function: Payment Webhook
// Handles Paystack payment webhooks

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { createHmac } from "https://deno.land/std@0.168.0/node/crypto.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-paystack-signature',
}

interface PaystackEvent {
    event: string
    data: {
        reference: string
        amount: number
        currency: string
        status: string
        gateway_response: string
        metadata: {
            booking_id?: string
            booking_ref?: string
        }
    }
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        // Verify Paystack signature
        const signature = req.headers.get('x-paystack-signature')
        const body = await req.text()
        const paystackSecret = Deno.env.get('PAYSTACK_SECRET_KEY')!

        const hash = createHmac('sha512', paystackSecret)
            .update(body)
            .digest('hex')

        if (hash !== signature) {
            console.error('Invalid Paystack signature')
            return new Response('Invalid signature', { status: 401 })
        }

        // Parse event
        const event: PaystackEvent = JSON.parse(body)
        console.log('Paystack event:', event.event)

        // Initialize Supabase
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        const supabase = createClient(supabaseUrl, supabaseKey)

        // Handle different event types
        switch (event.event) {
            case 'charge.success': {
                const { reference, amount, metadata } = event.data
                const bookingId = metadata.booking_id

                if (!bookingId) {
                    console.error('No booking_id in metadata')
                    return new Response('ok', { status: 200 })
                }

                // Record payment
                const { data, error } = await supabase.rpc('record_payment', {
                    p_booking_id: bookingId,
                    p_amount: amount / 100, // Paystack sends amount in kobo
                    p_payment_method: 'card',
                    p_gateway: 'paystack',
                    p_gateway_ref: reference
                })

                if (error) {
                    console.error('Error recording payment:', error)
                } else {
                    console.log('Payment recorded:', data)

                    // Auto-confirm booking if fully paid
                    if (data.remaining <= 0) {
                        await supabase.rpc('confirm_booking', {
                            p_booking_id: bookingId
                        })
                        console.log('Booking auto-confirmed')
                    }
                }
                break
            }

            case 'charge.failed': {
                console.log('Payment failed:', event.data.reference)
                // Could update booking or send notification
                break
            }

            case 'refund.processed': {
                console.log('Refund processed:', event.data.reference)
                // Handle refund
                break
            }

            default:
                console.log('Unhandled event type:', event.event)
        }

        return new Response('ok', { status: 200, headers: corsHeaders })

    } catch (error) {
        console.error('Webhook error:', error)
        return new Response('Error', { status: 500 })
    }
})
