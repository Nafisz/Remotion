import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS, FONT_FAMILY, fadeIn } from "../lib/animations";

interface BarData {
  label: string;
  value: number;
}

interface PopupCardProps {
  name: string;
  initials: string;
  message: string;
  bars: BarData[];
}

export const PopupCard: React.FC<PopupCardProps> = ({
  name,
  initials,
  message,
  bars,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 150, mass: 0.8 },
  });

  const translateY = interpolate(slideIn, [0, 1], [120, 0]);
  const opacity = interpolate(slideIn, [0, 1], [0, 1]);

  const avatarScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 10, stiffness: 200, mass: 0.5 },
  });

  const fadeOut = interpolate(frame, [180, 220], [1, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const maxBarValue = Math.max(...bars.map((b) => b.value));

  return (
    <div
      style={{
        position: "absolute",
        bottom: 60,
        right: 60,
        opacity: opacity * fadeOut,
        transform: `translateY(${translateY}px)`,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        padding: "24px 28px",
        width: 340,
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366F1, #2563EB)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 15,
            fontWeight: 700,
            transform: `scale(${avatarScale})`,
          }}
        >
          {initials}
        </div>
        <span style={{ fontSize: 15, fontWeight: 600, color: COLORS.text }}>
          {name}
        </span>
      </div>

      <p
        style={{
          fontSize: 14,
          color: COLORS.gray500,
          margin: "0 0 18px 0",
          lineHeight: 1.5,
        }}
      >
        {message}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {bars.map((bar, i) => {
          const barProgress = interpolate(
            frame,
            [30 + i * 10, 70 + i * 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const barWidth = bar.value * barProgress;
          return (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: COLORS.gray500,
                  width: 16,
                }}
              >
                {bar.label}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 18,
                  backgroundColor: COLORS.gray100,
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${barWidth}%`,
                    backgroundColor:
                      bar.value === Math.max(...bars.map((b) => b.value))
                        ? COLORS.accent
                        : COLORS.gray300,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: barWidth > 15 ? 6 : 0,
                  }}
                >
                  {barWidth > 15 && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "white",
                      }}
                    >
                      {Math.round(barWidth)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 14,
          fontSize: 13,
          color: COLORS.accent,
          fontWeight: 500,
          opacity: fadeIn(frame, 80, 30),
        }}
      >
        Lihat detail →
      </div>
    </div>
  );
};
