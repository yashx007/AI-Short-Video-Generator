// app/api/videoData/route.js
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function GET(req) {
    const url = new URL(req.url);
    const videoId = url.searchParams.get('videoId');
  
    if (!videoId) {
      return new Response(
        JSON.stringify({ error: 'videoId is required' }),
        { status: 400 }
      );
    }
  
    try {
      const result = await db
        .select()
        .from(VideoData)
        .where(eq(VideoData.id, videoId));
  
      // Log the result of the database query to the server console
      console.log('Database Result:', result);
  
      if (result.length === 0) {
        return new Response(
          JSON.stringify({ error: 'Video not found' }),
          { status: 404 }
        );
      }
  
      return new Response(JSON.stringify(result[0]), { status: 200 });
    } catch (error) {
      console.error('Error fetching video data:', error);
      return new Response(
        JSON.stringify({ error: 'Error fetching video data' }),
        { status: 500 }
      );
    }
  }
  