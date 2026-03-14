import React from "react";
import { COLORS, FONT_FAMILY, fadeIn } from "../lib/animations";

interface ImplicationItem {
  type: "success" | "warning";
  text: string;
}

interface DataCardProps {
  selectedAnswer: string;
  implications: ImplicationItem[];
  frame: number;
  staggerStart: number;
}

export const DataCard: React.FC<DataCardProps> = ({
  selectedAnswer,
  implications,
  frame,
  staggerStart,
}) => {
  return (
    <div
      style={{
        backgroundColor: COLORS.white,
        borderRadius: 12,
        boxShadow: COLORS.cardShadow,
        padding: "32px 36px",
        maxWidth: 620,
        width: "100%",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 24,
          opacity: fadeIn(frame, staggerStart, 10),
        }}
      >
        <span style={{ fontSize: 22 }}>💡</span>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.text,
            margin: 0,
          }}
        >
          Implikasi Keputusan
        </h2>
      </div>

      <div
        style={{
          display: "inline-block",
          backgroundColor: "#EFF6FF",
          border: `1px solid ${COLORS.accent}`,
          borderRadius: 20,
          padding: "6px 16px",
          fontSize: 14,
          fontWeight: 600,
          color: COLORS.accent,
          marginBottom: 20,
          opacity: fadeIn(frame, staggerStart + 6, 10),
        }}
      >
        {selectedAnswer}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {implications.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: fadeIn(frame, staggerStart + 12 + i * 6, 10),
              fontSize: 16,
              color: COLORS.text,
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor:
                  item.type === "success" ? COLORS.success : COLORS.warning,
                flexShrink: 0,
              }}
            />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
