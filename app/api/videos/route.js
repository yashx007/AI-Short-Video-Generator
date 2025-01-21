import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email'); // Get email from query parameters

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.createdBy, email));
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
