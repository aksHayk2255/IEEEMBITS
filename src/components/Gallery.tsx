import { useEffect, useState } from 'react';
import { ImageIcon, X } from 'lucide-react';
import { gallery as localGallery, type GalleryImage } from '../data/gallery';
import { useContent } from '../hooks/useContent';
import DataState from './ui/DataState';
import EmptyState from './ui/EmptyState';
import Reveal from './ui/Reveal';
import SectionHeading from './ui/SectionHeading';

/** Wide and tall images claim extra space in the grid on larger screens. */
function cellClass(span?: 'wide' | 'tall') {
  if (span === 'wide') return 'sm:col-span-2';
  if (span === 'tall') return 'sm:row-span-2';
  return '';
}

export default function Gallery() {
  const content = useContent<Record<string, unknown>>('gallery', localGallery.map((image) => ({ ...image })));
  const gallery: GalleryImage[] = content.data.map((image) => ({
    src: String(image.image_url ?? image.src ?? ''),
    alt: String(image.title ?? image.alt ?? 'Chapter gallery image'),
    caption: image.description as string | undefined ?? image.caption as string | undefined,
    title: image.title as string | undefined,
    details: image.details as string | undefined,
    span: image.span as GalleryImage['span'],
  }));
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!selectedImage) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [selectedImage]);
  return (
    <section id="gallery" className="section-y">
      <div className="shell">
        <SectionHeading
          index="06"
          label="Gallery"
          title={
            <>
              Moments
              <br />
              that matter.
            </>
          }
          description="Photographs from chapter sessions, events and everything in between."
        />

        <div className="mt-16 lg:mt-24"><DataState loading={content.loading} error={content.error}>
          {gallery.length === 0 ? (
            <EmptyState
              icon={<ImageIcon size={28} strokeWidth={1.25} />}
              title="No photos yet"
              hint="Drop images into src/assets/images and list them to fill this gallery."
              file="src/data/gallery.ts"
            />
          ) : (
            <ul className="grid auto-rows-[14rem] grid-cols-1 gap-4 sm:grid-cols-3 lg:auto-rows-[18rem]">
              {gallery.map((image, index) => (
                <li key={image.src} className={cellClass(image.span)}>
                  <Reveal delay={index * 0.03} className="h-full">
                    <button type="button" onClick={() => setSelectedImage(image)} className="group relative block h-full w-full overflow-hidden rounded-sm border border-line text-left" aria-label={`Open details for ${image.title ?? image.alt}`}>
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full bg-panel object-contain transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                      {image.caption && (
                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent p-4 text-xs text-ink/90">
                          {image.caption}
                        </span>
                      )}
                    </button>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </DataState></div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-bg/90 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={selectedImage.title ?? selectedImage.alt} onClick={() => setSelectedImage(null)}>
          <div className="grid max-h-[90vh] w-full max-w-5xl overflow-auto rounded-sm border border-line bg-panel lg:grid-cols-[1.1fr_0.9fr]" onClick={(event) => event.stopPropagation()}>
            <div className="flex min-h-64 items-center justify-center bg-bg p-4 sm:p-8">
              <img src={selectedImage.src} alt={selectedImage.alt} className="max-h-[70vh] w-full object-contain" />
            </div>
            <div className="relative p-6 sm:p-10">
              <button type="button" onClick={() => setSelectedImage(null)} className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-sm border border-line text-muted hover:border-accent hover:text-accent" aria-label="Close image details">
                <X size={17} />
              </button>
              <p className="eyebrow text-accent">Chapter session</p>
              <h3 className="mt-5 max-w-sm font-display text-3xl leading-tight text-ink sm:text-4xl">{selectedImage.title ?? selectedImage.caption}</h3>
              {selectedImage.details && <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-muted">{selectedImage.details}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
