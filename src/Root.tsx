import React from "react";
import { Composition } from "remotion";
import { NovaXLaunchVideo } from "./Video";

// Total frames: 240 + 240 + 240 + 240 + 180 = 1140 frames = 19s at 60fps
const TOTAL_FRAMES = 1140;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NovaXLaunchVideo"
        component={NovaXLaunchVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};
