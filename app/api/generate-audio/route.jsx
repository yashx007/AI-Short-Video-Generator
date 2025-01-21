import textToSpeech from "@google-cloud/text-to-speech";
import { NextResponse } from "next/server";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/FirebaseConfig";
import { getDownloadURL } from "firebase/storage";

// Ensure you have set GOOGLE_APPLICATION_CREDENTIALS in your environment variables
const client = new textToSpeech.TextToSpeechClient();

export async function POST(req) {
    try {
        // Parse request body
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json(
                { error: "Text is required." },
                { status: 400 }
            );
        }

        // Reference for the file in Firebase Storage
        const storageRef = ref(storage, "ai-short-video-files/audio.mp3");

        // Prepare the request for Google Cloud Text-to-Speech
        const request = {
            input: { text },
            voice: { languageCode: "en-US", ssmlGender: "MALE" },
            audioConfig: { audioEncoding: "MP3" },
        };

        // Call the API to generate speech
        const [response] = await client.synthesizeSpeech(request);

        // Convert audio content to a buffer
        const audioBuffer = Buffer.from(response.audioContent, "binary");

        // Upload the audio file to Firebase Storage
        await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });

        // Generate the public download URL for the uploaded file
        const downloadUrl = await getDownloadURL(storageRef);

        // Return the download URL as the response
        return NextResponse.json({ result: downloadUrl });
    } catch (error) {
        console.error("Error generating audio:", error);
        return NextResponse.json(
            { result: "Error", message: error.message },
            { status: 500 }
        );
    }
}
