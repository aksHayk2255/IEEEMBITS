import { ImageIcon } from 'lucide-react';
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
  const gallery: GalleryImage[] = content.data.map((image) => ({ src: String(image.image_url ?? image.src ?? ''), alt: String(image.title ?? image.alt ?? 'Chapter gallery image'), caption: image.description as string | undefined }));
  return (
    <section id="gallery" className="section-y">
      <div className="shell">
        <SectionHeading
          index="07"
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
                    <figure className="group relative h-full overflow-hidden rounded-sm border border-line">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                      {image.caption && (
                        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent p-4 text-xs text-ink/90">
                          {image.caption}
                        </figcaption>
                      )}
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </DataState></div>
      </div>
    </section>
  );
}
