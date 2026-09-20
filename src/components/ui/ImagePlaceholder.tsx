interface ImagePlaceholderProps {
  /** What belongs here, e.g. "Chapter team at the campus lab". */
  label: string;
  /** Suggested file path, shown so the image is easy to swap in later. */
  file?: string;
  /** CSS aspect-ratio value, e.g. "16 / 9". */
  ratio?: string;
  className?: string;
}

/**
 * A deliberately empty image slot. It never pretends to be a photograph —
 * it marks where a real MBITS image should be dropped in.
 *
 * To replace it:
 *   import heroImage from '../assets/images/hero.jpg';
 *   <img src={heroImage} alt="..." className="h-full w-full object-cover" />
 */
export default function ImagePlaceholder({
  label,
  file,
  ratio = '16 / 10',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm border border-line bg-panel ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <div className="grid-field absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
        <p className="text-sm text-muted">{label}</p>
        {file && <p className="text-xs text-muted/70">{file}</p>}
      </div>
    </div>
  );
}
