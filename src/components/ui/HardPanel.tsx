import type { ReactNode, CSSProperties } from 'react';

/**
 * Flat panel with a solid hard shadow. On hover it lifts by (-4px, -4px) while
 * the shadow stays, so the shadow appears to grow. Transforms only.
 */
export function HardPanel({
  children,
  shadow,
  offset,
  className = '',
  outerClassName = '',
  style,
}: {
  children: ReactNode;
  /** Tailwind background class for the shadow, e.g. "bg-plum". */
  shadow: string;
  /** Shadow offset in px; may differ per breakpoint via CSS var. */
  offset: number | string;
  className?: string;
  outerClassName?: string;
  style?: CSSProperties;
}) {
  const o = typeof offset === 'number' ? `${offset}px` : offset;
  return (
    <div className={`group relative ${outerClassName}`} style={style}>
      <div aria-hidden="true" className={`absolute inset-0 ${shadow}`} style={{ transform: `translate(${o}, ${o})` }} />
      <div className={`relative h-full transition-transform duration-[250ms] ease-zine group-hover:-translate-x-1 group-hover:-translate-y-1 ${className}`}>
        {children}
      </div>
    </div>
  );
}
