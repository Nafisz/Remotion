import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { COLORS, FONT_FAMILY } from "../lib/animations";

interface OptionButtonProps {
  label: string;
  index: number;
  isSelected: boolean;
  selectionFrame: number;
}

export const OptionButton: React.FC<OptionButtonProps> = ({
  label,
  index,
  isSelected,
  selectionFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterDelay = index * 10; // ~150ms apart at 60fps
  const opacity = interpolate(frame, [enterDelay, enterDelay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(
    frame,
    [enterDelay, enterDelay + 20],
    [15, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const selectionProgress = isSelected
    ? interpolate(frame, [selectionFrame, selectionFrame + 20], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  const bgColor = isSelected
    ? interpolateColor(selectionProgress, COLORS.white, "#EFF6FF")
    : COLORS.white;

  const borderColor = isSelected
    ? interpolateColor(selectionProgress, COLORS.gray200, COLORS.accent)
    : COLORS.gray200;

  const radioFill = isSelected ? selectionProgress : 0;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "16px 20px",
        borderRadius: 8,
        border: `2px solid ${borderColor}`,
        backgroundColor: bgColor,
        fontFamily: FONT_FAMILY,
        cursor: "pointer",
        transition: "none",
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          border: `2px solid ${isSelected && selectionProgress > 0 ? COLORS.accent : COLORS.gray300}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: COLORS.accent,
            transform: `scale(${radioFill})`,
          }}
        />
      </div>
      <span
        style={{
          fontSize: 17,
          color: COLORS.text,
          fontWeight: isSelected && selectionProgress > 0 ? 600 : 400,
          lineHeight: 1.4,
        }}
      >
        {label}
      </span>
    </div>
  );
};

function interpolateColor(
  progress: number,
  from: string,
  to: string
): string {
  if (progress <= 0) return from;
  if (progress >= 1) return to;
  return to;
}
