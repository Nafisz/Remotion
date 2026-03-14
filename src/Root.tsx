import React from "react";
import { Composition } from "remotion";
import { NovaXLaunchVideo } from "./Video";

// Total frames: 120 + 120 + 120 + 120 + 90 = 570 frames = 19s at 30fps
const TOTAL_FRAMES = 570;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NovaXLaunchVideo"
        component={NovaXLaunchVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
