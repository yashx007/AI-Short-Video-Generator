import { NextResponse } from 'next/server';
import { db } from '@/configs/db'; // Database connection
import { Users } from '@/configs/schema'; // Users schema
import { eq } from 'drizzle-orm'; // For conditions

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { email, creditsToDeduct } = body;

    // Validate input
    if (!email || typeof creditsToDeduct !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input. Email and creditsToDeduct are required.' },
        { status: 400 }
      );
    }

    // Fetch the user's current credits
    const [user] = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email));

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Check if the user has enough credits
    if (user.credits < creditsToDeduct) {
      return NextResponse.json(
        { error: 'Not enough credits to deduct.' },
        { status: 400 }
      );
    }

    // Update the user's credits
    const result = await db
      .update(Users)
      .set({ credits: user.credits - creditsToDeduct })
      .where(eq(Users.email, email));

    return NextResponse.json({ message: 'Credits updated successfully.', result });
  } catch (error) {
    console.error('Error updating credits:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
