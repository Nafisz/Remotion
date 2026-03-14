import React from "react";
import { interpolate, Easing } from "remotion";
import { COLORS, FONT_FAMILY } from "../lib/animations";

interface XPBarProps {
  frame: number;
  startFrame: number;
  duration: number;
  targetPercent: number;
  label?: string;
}

export const XPBar: React.FC<XPBarProps> = ({
  frame,
  startFrame,
  duration,
  targetPercent,
  label = "XP",
}) => {
  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, targetPercent],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  return (
    <div style={{ width: "100%", maxWidth: 400, fontFamily: FONT_FAMILY }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontSize: 14,
          fontWeight: 600,
          color: COLORS.gray500,
        }}
      >
        <span>{label}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div
        style={{
          width: "100%",
          height: 12,
          backgroundColor: COLORS.gray100,
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${COLORS.accent}, #6366F1)`,
            borderRadius: 6,
          }}
        />
      </div>
    </div>
  );
};
