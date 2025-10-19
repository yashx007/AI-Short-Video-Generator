"use client"
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { useUser  } from "@clerk/nextjs";
import PlayerDialog from "../_components/PlayerDialog";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { Users } from "@/configs/schema";
import { toast } from "sonner";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const { videoData, setVideoData } = useContext(VideoDataContext);
  const [playVideo,setPlayVideo]=useState()
  const [videoId,setVideoId]=useState()
  const {userDetail,setUserDetail}=useContext(UserDetailContext)

  const { user } = useUser ();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = async () => {
    if (userDetail?.credits < 10) {
      toast("You don't have enough Credits");
      return;
    }
    try {
      await GetVideoScript();
    } catch (error) {
      console.error("Error during video creation workflow:", error);
    }
  };
  

  const GetVideoScript = async () => {
    setLoading(true);
    const prompt = `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scene and give me result in JSON format with imagePrompt and ContentText as fields`;

    try {
      const response = await axios.post("/api/get-video-script", { prompt });
      if (!response.data?.result) throw new Error("No video script received");

      setVideoData((prev) => ({
        ...prev,
        videoScript: response.data.result,
      }));
      setVideoScript(response.data.result);
      await GenerateAudioFile(response.data.result);
    } catch (error) {
      console.error("Error generating video script:", error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";

    if (Array.isArray(videoScriptData)) {
      script = videoScriptData.map((item) => item.ContentText).join(" ");
    } else {
      script = videoScriptData || "";
    }

    if (!script.trim()) {
      console.error("Script text is empty or invalid.");
      setLoading(false);
      return;
    }

    const id = uuidv4();
    try {
      const response = await axios.post("/api/generate-audio", {
        text: script,
        id,
      });
      if (!response.data?.result) throw new Error("No audio file generated");

      setVideoData((prev) => ({
        ...prev,
        audioFileUrl: response.data.result,
      }));
      setAudioFileUrl(response.data.result);
      await GenerateAudioCaption(response.data.result, videoScriptData);
    } catch (error) {
      console.error("Error generating audio:", error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateAudioCaption = async (fileUrl, videoScriptData) => {
    if (!fileUrl) {
      console.error("Audio file URL is missing.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/generate-caption", {
        audioFileUrl: fileUrl,
      });
      if (!response.data?.result) throw new Error("No captions generated");

      setCaptions(response.data.result);
      setVideoData((prev) => ({
        ...prev,
        captions: response.data.result,
      }));

      await GenerateImage(videoScriptData);
    } catch (error) {
      console.error("Error generating captions:", error);
    } finally {
      setLoading(false);
    }
  };

  const GenerateImage = async (videoScriptData) => {
    if (!Array.isArray(videoScriptData) || videoScriptData.length === 0) {
      console.error("Video script data is missing or invalid.");
      return;
    }
  
    try {
      const imagePromises = videoScriptData.map(async (element) => {
        try {
          const response = await axios.post("/api/generate-image", {
            prompt: element?.imagePrompt,
          });
          // Assuming the response contains the Firebase URL in `response.data.result`
          return response.data?.result || null;
        } catch (error) {
          console.error("Error generating image for prompt:", element?.imagePrompt, error);
          return null;
        }
      });
  
      const images = (await Promise.all(imagePromises)).filter((img) => img !== null);
  
      setVideoData((prev) => ({
        ...prev,
        imageList: images, // Store the URLs directly
      }));
      setImageList(images);
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setLoading(false);
    }
  };
  

  // Persist video data once it's populated. SaveVideoData is memoized to
  // keep a stable reference for the effect dependency array.
  const UpdateUserCredits = React.useCallback(async () => {
    try {
      // Call server API to update credits instead of touching DB from client
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      await axios.post('/api/updateUserCredits', {
        email,
        creditsToDeduct: 10,
      });

      // Update local user detail state
      setUserDetail((prev) => ({ ...prev, credits: (prev?.credits || 0) - 10 }));

      setVideoData(null);
    } catch (error) {
      console.error('Error updating credits:', error);
    }
  }, [user, setUserDetail, setVideoData]);

  const SaveVideoData = React.useCallback(async (videoDataParam) => {
    try {
      const createdBy = user?.primaryEmailAddress?.emailAddress;
      if (!createdBy) {
        console.error('CreatedBy is missing');
        return;
      }

      if (!videoDataParam || !videoDataParam.videoScript || !videoDataParam.audioFileUrl || !videoDataParam.imageList) {
        console.error('Missing required fields in videoData');
        return;
      }

      const response = await axios.post('/api/save', {
        videoData: {
          script: videoDataParam.videoScript,
          audioFileUrl: videoDataParam.audioFileUrl,
          captions: videoDataParam.captions,
          imageList: videoDataParam.imageList,
        },
        createdBy,
      });

      const savedId = response.data?.result?.[0]?.id;
      if (savedId) {
        await UpdateUserCredits();
        setVideoId(savedId);
        setPlayVideo(true);
      }

      console.log('Video data saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving video data:', error.response ? error.response.data : error.message);
    }
  }, [user, UpdateUserCredits]);

  useEffect(() => {
    if (videoData && Object.keys(videoData).length >= 4) {
      SaveVideoData(videoData);
    }
  }, [videoData, SaveVideoData]);



  
  // old client-side SaveVideoData/UpdateUserCredits removed in favor of
  // memoized versions above that call the server APIs.
  
  
  
  
  
  

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">Create New</h2>
      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className="mt-10 w-full" onClick={onCreateClickHandler}>
          Create Short Video
 </Button>
      </div>
      <CustomLoading loading={loading} />
      <PlayerDialog playVideo={playVideo} videoId={videoId}/>
    </div>
  );
}

export default CreateNew;