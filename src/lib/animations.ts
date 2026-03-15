import { interpolate, spring, Easing } from "remotion";

export const COLORS = {
  white: "#FFFFFF",
  text: "#111827",
  accent: "#2563EB",
  success: "#059669",
  warning: "#D97706",
  cardShadow: "0 4px 24px rgba(0,0,0,0.08)",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
} as const;

export const FONT_FAMILY =
  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

export function fadeIn(
  frame: number,
  startFrame: number,
  duration: number = 15
): number {
  return interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

export function slideUp(
  frame: number,
  startFrame: number,
  duration: number = 15,
  distance: number = 20
): number {
  return interpolate(
    frame,
    [startFrame, startFrame + duration],
    [distance, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );
}

export function scaleIn(
  frame: number,
  startFrame: number,
  fps: number,
  config?: Partial<Parameters<typeof spring>[0]>
): number {
  return spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 12,
      stiffness: 200,
      mass: 0.5,
      ...config,
    },
  });
}

export function bounceScale(
  frame: number,
  startFrame: number,
  fps: number
): number {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: {
      damping: 8,
      stiffness: 200,
      mass: 0.8,
    },
  });
  return progress;
}

export function fillProgress(
  frame: number,
  startFrame: number,
  duration: number,
  targetValue: number
): number {
  return interpolate(
    frame,
    [startFrame, startFrame + duration],
    [0, targetValue],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );
}
