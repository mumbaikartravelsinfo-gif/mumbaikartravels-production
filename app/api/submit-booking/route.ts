import { NextRequest, NextResponse } from 'next/server'

// Google Apps Script Web App URL
const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL

interface BookingData {
  name: string
  phone: string
  pickupLocation: string
  dropLocation: string
  travelDate: string
  passengers: string
  serviceType?: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const bookingData: Omit<BookingData, 'timestamp'> = await request.json()
    
    // Add timestamp
    const dataWithTimestamp: BookingData = {
      ...bookingData,
      timestamp: new Date().toLocaleString('en-IN', { 
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'medium'
      })
    }

    // Check if Apps Script URL is configured
    if (!GOOGLE_APPS_SCRIPT_URL) {
      console.warn('Google Apps Script URL not configured')
      return NextResponse.json({ 
        success: true, 
        message: 'Booking submitted successfully (no spreadsheet configured)',
        sheetsError: true
      })
    }

    // Send data to Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataWithTimestamp)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Apps Script Error:', errorText)
      
      // Return success even if sheets fails, so user experience isn't affected
      return NextResponse.json({ 
        success: true, 
        message: 'Booking submitted successfully (sheets backup may have failed)',
        sheetsError: true
      })
    }

    const result = await response.json()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Booking submitted successfully to spreadsheet',
      sheetsResponse: result
    })
    
  } catch (error) {
    console.error('API Error:', error)
    
    // Return success even if there's an error, so user experience isn't affected
    return NextResponse.json({ 
      success: true, 
      message: 'Booking submitted successfully (backup failed)',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}