"use client"
import React, { useState } from 'react';
import { Thumbnail } from '@remotion/player';
import RemotionVideo from './RemotionVideo';
import PlayerDialog from './PlayerDialog';

function VideoList({ videoList }) {
  const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
  const [videoId, setVideoId] = useState();

  const handleVideoClick = (video) => {
    setOpenPlayerDialog(Date.now()); // Ensure a unique key for PlayerDialog to trigger a re-render
    setVideoId(video.id); // Set the current video ID
  };

  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
      {videoList.map((video, index) => (
        <div
          key={index}
          className="cursor-pointer hover:scale-105 transition-all"
          onClick={() => handleVideoClick(video)} // Pass the current video
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={380}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{
              borderRadius: 15,
            }}
            inputProps={{
              ...video,
              setDurationInFrame: (v) => console.log(`Duration set: ${v}`),
            }}
          />
        </div>
      ))}
      {/* Render PlayerDialog when a video is clicked */}
      {openPlayerDialog && (
        <PlayerDialog
          playVideo={openPlayerDialog}
          videoId={videoId}
          onClose={() => setOpenPlayerDialog(false)} // Close the dialog
        />
      )}
    </div>
  );
}

export default VideoList;
