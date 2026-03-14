import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { DataCard } from "../components/DataCard";
import { PopupCard } from "../components/PopupCard";
import { COLORS, FONT_FAMILY, fadeIn, fillProgress } from "../lib/animations";

const SELECTED_ANSWER = "Analisis data penjualan dan identifikasi pola";

const IMPLICATIONS = [
  { type: "success" as const, text: "Revenue analysis accuracy: +40%" },
  { type: "success" as const, text: "Waktu identifikasi masalah: 2 minggu" },
  { type: "warning" as const, text: "Risiko: butuh data historis yang lengkap" },
];

const BARS = [
  { label: "A", value: 8 },
  { label: "B", value: 72 },
  { label: "C", value: 15 },
  { label: "D", value: 5 },
];

export const SocialPopupScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background card dims slightly
  const bgDim = interpolate(frame, [0, 15], [1, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgBlur = interpolate(frame, [0, 15], [0, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Confidence meter (static, already filled)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const confidenceValue = 78;
  const strokeDashoffset =
    circumference - (confidenceValue / 100) * circumference;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT_FAMILY,
        position: "relative",
      }}
    >
      {/* Background: previous scene data (dimmed) */}
      <div
        style={{
          opacity: bgDim,
          filter: `blur(${bgBlur}px)`,
          display: "flex",
          alignItems: "center",
          gap: 40,
        }}
      >
        <DataCard
          selectedAnswer={SELECTED_ANSWER}
          implications={IMPLICATIONS}
          frame={999} // fully visible
          staggerStart={0}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ position: "relative", width: 100, height: 100 }}>
            <svg
              width={100}
              height={100}
              style={{ transform: "rotate(-90deg)" }}
            >
              <circle
                cx={50}
                cy={50}
                r={radius}
                fill="none"
                stroke={COLORS.gray100}
                strokeWidth={8}
              />
              <circle
                cx={50}
                cy={50}
                r={radius}
                fill="none"
                stroke={COLORS.accent}
                strokeWidth={8}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 100,
                height: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 700,
                color: COLORS.text,
              }}
            >
              {confidenceValue}%
            </div>
          </div>
          <span
            style={{
              marginTop: 10,
              fontSize: 13,
              fontWeight: 500,
              color: COLORS.gray500,
            }}
          >
            Confidence
          </span>
        </div>
      </div>

      {/* Social popup */}
      <PopupCard
        name="Rizky Ananda"
        initials="RA"
        message="72% peserta memilih jawaban yang sama denganmu"
        bars={BARS}
      />
    </div>
  );
};
