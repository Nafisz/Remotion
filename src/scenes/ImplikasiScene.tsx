import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { DataCard } from "../components/DataCard";
import { COLORS, FONT_FAMILY, fadeIn, fillProgress } from "../lib/animations";

const SELECTED_ANSWER = "Analisis data penjualan dan identifikasi pola";

const IMPLICATIONS = [
  { type: "success" as const, text: "Revenue analysis accuracy: +40%" },
  {
    type: "success" as const,
    text: "Waktu identifikasi masalah: 2 minggu",
  },
  {
    type: "warning" as const,
    text: "Risiko: butuh data historis yang lengkap",
  },
];

const CONFIDENCE_TARGET = 78;

export const ImplikasiScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Camera expand: scale from 1.5 to 1.0
  const cameraScale = interpolate(frame, [0, 48], [1.5, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const cameraOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Confidence meter
  const confidenceValue = fillProgress(frame, 80, 90, CONFIDENCE_TARGET);

  // SVG arc for confidence
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
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
      }}
    >
      <div
        style={{
          transform: `scale(${cameraScale})`,
          opacity: cameraOpacity,
          display: "flex",
          alignItems: "center",
          gap: 40,
        }}
      >
        <DataCard
          selectedAnswer={SELECTED_ANSWER}
          implications={IMPLICATIONS}
          frame={frame}
          staggerStart={30}
        />

        {/* Confidence meter */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: fadeIn(frame, 100, 30),
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
              {Math.round(confidenceValue)}%
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
    </div>
  );
};
