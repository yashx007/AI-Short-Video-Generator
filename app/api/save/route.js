// app/api/save/route.js
import { NextResponse } from 'next/server';
import { getDb } from '@/configs/db';
import { VideoData } from '@/configs/schema';

export async function POST(req) {
  try {
    const { videoData, createdBy } = await req.json();

    // Validate the input
    if (!videoData || !videoData.script || !videoData.audioFileUrl || !videoData.captions || !Array.isArray(videoData.imageList)) {
      return new NextResponse(
        JSON.stringify({ error: 'Missing or invalid video data fields' }),
        { status: 400 }
      );
    }

    if (!createdBy || typeof createdBy !== 'string') {
      return new NextResponse(
        JSON.stringify({ error: 'Missing or invalid createdBy field' }),
        { status: 400 }
      );
    }

    // Ensure all entries in `imageList` are strings (extract `url` if necessary)
    const imageList = videoData.imageList.map((img) =>
      typeof img === 'object' && img.url ? img.url : String(img)
    );

    // Ensure createdBy is correctly passed
    console.log('Received createdBy field:', createdBy);

    // Save to database
    const db = await getDb();
    const result = await db.insert(VideoData).values({
      script: videoData.script,
      audioFileUrl: videoData.audioFileUrl,
      captions: videoData.captions,
      imageList, // Ensure properly serialized strings are saved
      createdBy
    });

    return new NextResponse(
      JSON.stringify({ message: 'Video data saved successfully', result }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving video data:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to save video data' }),
      { status: 500 }
    );
  }
}
