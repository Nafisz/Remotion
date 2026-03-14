import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { COLORS, FONT_FAMILY, fadeIn, slideUp } from "../lib/animations";

const LOGO_TEXT = "NovaX Arena";
const TAGLINE = "Problem-Based Learning, Reimagined";
const URL_TEXT = "novaxarena.com";

export const EndCardScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
        position: "relative",
      }}
    >
      {/* Subtle accent line */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translateX(-50%)",
          width: interpolate(frame, [0, 20], [0, 60], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          }),
          height: 4,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${COLORS.accent}, #6366F1)`,
          marginBottom: 24,
        }}
      />

      {/* Logo */}
      <h1
        style={{
          fontSize: 52,
          fontWeight: 800,
          color: COLORS.text,
          margin: 0,
          letterSpacing: -1,
          opacity: fadeIn(frame, 5, 15),
          transform: `translateY(${slideUp(frame, 5, 15, 20)}px)`,
        }}
      >
        {LOGO_TEXT}
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontSize: 20,
          color: COLORS.gray500,
          fontWeight: 400,
          marginTop: 14,
          marginBottom: 0,
          opacity: fadeIn(frame, 14, 15),
          transform: `translateY(${slideUp(frame, 14, 15, 20)}px)`,
        }}
      >
        {TAGLINE}
      </p>

      {/* URL */}
      <p
        style={{
          fontSize: 18,
          color: COLORS.accent,
          fontWeight: 600,
          marginTop: 18,
          opacity: fadeIn(frame, 23, 15),
          transform: `translateY(${slideUp(frame, 23, 15, 20)}px)`,
        }}
      >
        {URL_TEXT}
      </p>
    </div>
  );
};
