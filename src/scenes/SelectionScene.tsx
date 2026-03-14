import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { OptionButton } from "../components/OptionButton";
import { COLORS, FONT_FAMILY, fadeIn, slideUp } from "../lib/animations";

const QUESTION_TEXT =
  "Klien mengeluhkan penurunan penjualan 30% dalam 3 bulan terakhir. Langkah pertama yang paling tepat adalah...";

const OPTIONS = [
  "Langsung tawarkan diskon besar-besaran",
  "Analisis data penjualan dan identifikasi pola",
  "Tanya kompetitor mereka melakukan apa",
  "Rekrut tim sales baru",
];

const SELECTED_INDEX = 1;
const SELECTION_FRAME = 75; // ~2.5s
const CONFIRM_FRAME = 105; // ~3.5s

export const SelectionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardOpacity = fadeIn(frame, 0, 12);
  const cardTranslateY = slideUp(frame, 0, 12, 30);

  const questionOpacity = fadeIn(frame, 5, 12);

  // Confirm button
  const confirmVisible = frame >= CONFIRM_FRAME;
  const confirmScale = confirmVisible
    ? spring({
        frame: frame - CONFIRM_FRAME,
        fps,
        config: { damping: 10, stiffness: 200, mass: 0.6 },
      })
    : 0;

  // Exit animation
  const exitStart = 110;
  const exitScale = interpolate(frame, [exitStart, 120], [1, 0.92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic),
  });
  const exitOpacity = interpolate(frame, [exitStart, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
          maxWidth: 700,
          width: "90%",
          backgroundColor: COLORS.white,
          borderRadius: 16,
          boxShadow: COLORS.cardShadow,
          padding: "36px 40px",
          opacity: cardOpacity * exitOpacity,
          transform: `translateY(${cardTranslateY}px) scale(${exitScale})`,
        }}
      >
        <p
          style={{
            fontSize: 19,
            lineHeight: 1.6,
            color: COLORS.text,
            fontWeight: 500,
            marginBottom: 28,
            marginTop: 0,
            opacity: questionOpacity,
          }}
        >
          {QUESTION_TEXT}
        </p>

        <div
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          {OPTIONS.map((opt, i) => (
            <OptionButton
              key={i}
              label={opt}
              index={i}
              isSelected={i === SELECTED_INDEX}
              selectionFrame={SELECTION_FRAME}
            />
          ))}
        </div>

        {confirmVisible && (
          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                backgroundColor: COLORS.accent,
                color: COLORS.white,
                padding: "12px 32px",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                transform: `scale(${confirmScale})`,
                cursor: "pointer",
              }}
            >
              Konfirmasi
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
