"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [durationInFrame, setDurationInFrame] = useState(100);

  const router = useRouter();

  // Memoize GetVideoData so it can be used safely in effect deps
  const GetVideoData = React.useCallback(async () => {
    try {
      const response = await fetch(`/api/videoData?videoId=${videoId}`);
      const data = await response.json();

      if (response.ok) {
        console.log("Fetched Data:", data); // Log the fetched data
        setVideoData(data); // Set the video data
      } else {
        console.error(data.error || "Error fetching video data");
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  }, [videoId]);

  // Effect to control the dialog opening and fetch video data
  useEffect(() => {
    if (playVideo && videoId) {
      setOpenDialog(true); // Open dialog only when `playVideo` is true and `videoId` is valid
      GetVideoData(); // Fetch the video data
    }
  }, [playVideo, videoId, GetVideoData]);

  // Function to fetch video data
  // (implementation moved above and memoized)

  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-white flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold my-5">
            Your Video is Ready
          </DialogTitle>
          <DialogDescription>
            <Player
              component={RemotionVideo}
              durationInFrames={Number(durationInFrame.toFixed(0))}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              controls={true}
              inputProps={{
                ...videoData,
                setDurationInFrame: (frameValue) => setDurationInFrame(frameValue),
              }}
            />

            <div className="flex gap-10 mt-10">
              <Button
                variant="ghost"
                onClick={() => {
                  router.replace("/dashboard");
                  setOpenDialog(false); // Close the dialog
                }}
              >
                Cancel
              </Button>
              <Button>Export</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PlayerDialog;
