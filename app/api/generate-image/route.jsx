import { storage } from "@/configs/FirebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        const input = {
            prompt: prompt,
            height: 1280,
            width: 1024,
            num_outputs: 1,
        };

        const output = await replicate
            .run("bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637", { input })
            .catch((error) => {
                console.error("Error calling Replicate API:", error);
                throw new Error("Failed to generate image");
            });

        // Convert image URL to base64
        const base64Image = "data:image/png;base64," + (await ConvertImage(output[0]));

        // Save to Firebase Storage
        const fileName = "ai-short-video-files/" + Date.now() + ".png";
        const storageRef = ref(storage, fileName);

        await uploadString(storageRef, base64Image, "data_url");
        const downloadUrl = await getDownloadURL(storageRef);

        console.log("Image saved to Firebase:", downloadUrl);

        // Return the Firebase download URL
        return NextResponse.json({ result: downloadUrl });
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: "Failed to process the request" }, { status: 500 });
    }
}

const ConvertImage = async (imageUrl) => {
    try {
        const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
        return Buffer.from(resp.data).toString("base64");
    } catch (error) {
        console.error("Error converting image to base64:", error);
        throw error;
    }
};
