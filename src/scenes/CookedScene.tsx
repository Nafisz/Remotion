import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { XPBar } from "../components/XPBar";
import { Badge } from "../components/Badge";
import { COLORS, FONT_FAMILY, fadeIn } from "../lib/animations";

const TITLE_TEXT = "COOKED";
const SUBTITLE_TEXT = "Arena selesai. Skor kamu: 847/1000";
const BADGES = ["🏆 Top 15%", "🔥 3 Arena Streak"];

export const CookedScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text bounce in
  const titleScale = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 180, mass: 0.8 },
  });

  // Rotation shake
  const shakeRotation =
    frame < 40
      ? interpolate(frame, [10, 16, 22, 28, 34], [-2, 2, -1, 1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  // Subtitle
  const subtitleOpacity = fadeIn(frame, 30, 24);
  const subtitleTranslateY = interpolate(frame, [30, 54], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flame icon scale
  const flameScale = spring({
    frame: frame - 6,
    fps,
    config: { damping: 6, stiffness: 200, mass: 0.5 },
  });

  // Particles (subtle floating dots)
  const particles = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const baseRadius = 200;
    const particleFrame = frame - 20;
    const radius = particleFrame > 0 ? baseRadius * Math.min(particleFrame / 60, 1) : 0;
    const x = Math.cos(angle + frame * 0.01) * radius;
    const y = Math.sin(angle + frame * 0.01) * radius;
    const particleOpacity = interpolate(
      frame,
      [20, 40, 180, 220],
      [0, 0.3, 0.3, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    return { x, y, opacity: particleOpacity, size: 4 + (i % 3) * 2 };
  });

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
        overflow: "hidden",
      }}
    >
      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? COLORS.accent : "#F59E0B",
            opacity: p.opacity,
            transform: `translate(${p.x}px, ${p.y}px)`,
          }}
        />
      ))}

      {/* Main title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          transform: `scale(${titleScale}) rotate(${shakeRotation}deg)`,
        }}
      >
        <span
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: COLORS.text,
            letterSpacing: -2,
          }}
        >
          {TITLE_TEXT}
        </span>
        <span
          style={{
            fontSize: 72,
            transform: `scale(${flameScale})`,
            display: "inline-block",
          }}
        >
          🔥
        </span>
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 22,
          color: COLORS.gray500,
          fontWeight: 500,
          marginTop: 12,
          marginBottom: 32,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleTranslateY}px)`,
        }}
      >
        {SUBTITLE_TEXT}
      </p>

      {/* XP Bar */}
      <div style={{ opacity: fadeIn(frame, 50, 24), width: 400 }}>
        <XPBar
          frame={frame}
          startFrame={60}
          duration={90}
          targetPercent={84.7}
          label="XP Progress"
        />
      </div>

      {/* Badges */}
      <div
        style={{
          display: "flex",
          gap: 14,
          marginTop: 28,
        }}
      >
        {BADGES.map((badge, i) => (
          <Badge key={i} text={badge} frame={frame} delay={100 + i * 16} />
        ))}
      </div>
    </div>
  );
};
