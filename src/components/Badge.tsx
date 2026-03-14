import React from "react";
import { spring, useVideoConfig } from "remotion";
import { COLORS, FONT_FAMILY } from "../lib/animations";

interface BadgeProps {
  text: string;
  frame: number;
  delay: number;
}

export const Badge: React.FC<BadgeProps> = ({ text, frame, delay }) => {
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.6 },
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 18px",
        backgroundColor: COLORS.gray100,
        borderRadius: 20,
        fontSize: 15,
        fontWeight: 600,
        color: COLORS.text,
        fontFamily: FONT_FAMILY,
        transform: `scale(${scale})`,
        gap: 6,
      }}
    >
      {text}
    </div>
  );
};
