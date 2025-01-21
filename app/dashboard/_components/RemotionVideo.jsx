import React, { useEffect, useMemo } from 'react';
import { AbsoluteFill, Sequence, useVideoConfig, Img, useCurrentFrame, interpolate } from 'remotion';
import { Audio } from 'remotion';

function RemotionVideo({ script, imageList = [], audioFileUrl, captions = [], setDurationInFrame }) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Calculate duration once
  useEffect(() => {
    if (captions.length > 0) {
      const lastCaptionEnd = captions[captions.length - 1]?.end / 1000;
      const durationInFrames = lastCaptionEnd * fps;
      setDurationInFrame(durationInFrames); // Update the parent state here
    }
  }, [captions, fps, setDurationInFrame]);

  const getDurationFrame = useMemo(() => {
    return captions.length > 0 ? (captions[captions.length - 1]?.end / 1000) * fps : 0;
  }, [captions, fps]);

  const currentCaption = useMemo(() => {
    const currentTime = (frame / fps) * 1000; // Convert frame number to milliseconds
    return captions.find((word) => currentTime >= word.start && currentTime <= word.end)?.text || '';
  }, [frame, captions, fps]);

  return (
    <AbsoluteFill className="bg-black">
      {imageList.map((item, index) =>
      
      {

        const startTime=(index * getDurationFrame) / imageList.length
        const duration=getDurationFrame;

        const scale=(index)=>interpolate(
            frame,
            [startTime,startTime+duration/2,startTime+duration], //zoom in zoom out logic
            index%2==0?[1,1.8,1]:[1.8,1,1.8],
            {extrapolateLeft:'clamp',extrapolateRight:'clamp'}
        )

        return (
        <Sequence
          key={index}
          from={startTime}
          durationInFrames={getDurationFrame}
        >
          <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Img
              src={item}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform:`scale(${scale(index)})`
              }}
            />
            <AbsoluteFill
              style={{
                color: 'white',
                justifyContent: 'center',
                bottom: 50,
                height: 150,
                textAlign: 'center',
                width: '100%',
              }}
            >
              <h2 className="text-2xl">{currentCaption}</h2>
            </AbsoluteFill>
          </AbsoluteFill>
        </Sequence>
      )})}

      {audioFileUrl && <Audio src={audioFileUrl} />}
    </AbsoluteFill>
  );
}

export default RemotionVideo;
