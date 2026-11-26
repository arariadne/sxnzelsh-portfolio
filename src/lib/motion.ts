/** Motion tokens. Defined once, reused everywhere. */

export const ease = [0.22, 1, 0.36, 1] as const;

export const dur = {
  hover: 0.25,
  reveal: 0.8,
  fast: 0.45,
} as const;

export const stagger = {
  base: 0.06,
  panels: 0.08,
} as const;

/** Hover lift for hard-shadow elements. */
export const lift = { x: -4, y: -4 } as const;

export const reveal = {
  transition: { duration: dur.reveal, ease },
};
