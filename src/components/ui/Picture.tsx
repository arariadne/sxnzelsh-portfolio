import images from '../../data/images.json';

type Manifest = Record<string, { width: number; height: number; widths: number[]; jpeg: number | null }>;
const manifest = images as Manifest;

interface Props {
  name: string;
  alt: string;
  /** The `sizes` attribute: how wide the image is shown at each breakpoint. */
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Load immediately without raising priority (e.g. preloading the next slide). */
  eager?: boolean;
}

/** AVIF + WebP (+ JPEG fallback when generated) with intrinsic size, so no layout shift. */
export function Picture({ name, alt, sizes, className, priority, eager }: Props) {
  const img = manifest[name];
  if (!img) return null;
  const set = (ext: string) => img.widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ');
  const largest = img.widths[img.widths.length - 1];
  const fallback = img.jpeg ? `/img/${name}-${img.jpeg}.jpg` : `/img/${name}-${largest}.webp`;

  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={img.width}
        height={img.height}
        sizes={sizes}
        className={className}
        loading={priority || eager ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  );
}
