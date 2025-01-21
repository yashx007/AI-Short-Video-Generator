import { NextResponse } from 'next/server'; // Used for returning responses
import { db } from '@/configs/db'; // Database connection/config
import { Users } from '@/configs/schema'; // Database schema
import { eq } from 'drizzle-orm'; // Used for query conditions

// Define the GET handler
export async function GET(req) {
  try {
    // Parse the URL to extract query parameters
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email'); // Get the 'email' query parameter

    // Check if the email is provided
    if (!email) {
      return NextResponse.json(
        { error: 'Email query parameter is required' },
        { status: 400 }
      );
    }

    // Query the database for the user details based on email
    const userDetails = await db.select().from(Users).where(eq(Users.email, email));

    // Check if user exists
    if (userDetails.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return the user details as JSON
    return NextResponse.json(userDetails[0]);
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
