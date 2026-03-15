import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { SelectionScene } from "./scenes/SelectionScene";
import { ImplikasiScene } from "./scenes/ImplikasiScene";
import { SocialPopupScene } from "./scenes/SocialPopupScene";
import { CookedScene } from "./scenes/CookedScene";
import { EndCardScene } from "./scenes/EndCardScene";
import { COLORS, FONT_FAMILY } from "./lib/animations";

// Scene durations in frames (60fps)
const SCENE_1_DURATION = 240; // 0s-4s
const SCENE_2_DURATION = 240; // 4s-8s
const SCENE_3_DURATION = 240; // 8s-12s
const SCENE_4_DURATION = 240; // 12s-16s
const SCENE_5_DURATION = 180; // 16s-19s

export const NovaXLaunchVideo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.white,
        fontFamily: FONT_FAMILY,
      }}
    >
      <Series>
        <Series.Sequence durationInFrames={SCENE_1_DURATION}>
          <SelectionScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_2_DURATION}>
          <ImplikasiScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_3_DURATION}>
          <SocialPopupScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_4_DURATION}>
          <CookedScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE_5_DURATION}>
          <EndCardScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
