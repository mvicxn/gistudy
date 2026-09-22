export const tokens = {
  color: {
    bg: "var(--bg)",
    surface: "var(--surface)",
    surfaceElevated: "var(--surface-elevated)",
    glass: "var(--glass)",
    border: "var(--border)",
    textPrimary: "var(--text-primary)",
    textSecondary: "var(--text-secondary)",
    textMuted: "var(--text-muted)",
    purple: "var(--purple)",
    violet: "var(--violet)",
    lilac: "var(--lilac)",
    pink: "var(--pink)",
    success: "var(--success)",
    warning: "var(--warning)",
    focus: "var(--focus)",
    locked: "var(--locked)",
  },
  type: {
    display: "var(--type-display)",
    h1: "var(--type-h1)",
    h2: "var(--type-h2)",
    h3: "var(--type-h3)",
    bodyLarge: "var(--type-body-lg)",
    body: "var(--type-body)",
    bodySmall: "var(--type-body-sm)",
    caption: "var(--type-caption)",
    label: "var(--type-label)",
    button: "var(--type-button)",
  },
  motion: {
    fast: "var(--motion-fast)",
    normal: "var(--motion-normal)",
    slow: "var(--motion-slow)",
    celebration: "var(--motion-celebration)",
  },
  space: {
    1: "var(--space-1)",
    2: "var(--space-2)",
    3: "var(--space-3)",
    4: "var(--space-4)",
    5: "var(--space-5)",
    6: "var(--space-6)",
    8: "var(--space-8)",
    10: "var(--space-10)",
    12: "var(--space-12)",
    16: "var(--space-16)",
  },
  z: {
    nav: "var(--z-nav)",
    sheet: "var(--z-sheet)",
    toast: "var(--z-toast)",
    focus: "var(--z-focus)",
  },
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
    pill: "var(--radius-pill)",
  },
} as const;

export type MapNodeState =
  | "locked"
  | "available"
  | "inProgress"
  | "completed"
  | "mastered";

export type ProfessorTone =
  | "introduction"
  | "explanation"
  | "success"
  | "almost"
  | "hint"
  | "celebration";
