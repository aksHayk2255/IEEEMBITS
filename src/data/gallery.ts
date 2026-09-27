export interface GalleryImage {
  /** Import the file from src/assets/images and pass the imported value here. */
  src: string;
  /** Describe the photo for screen readers. */
  alt: string;
  caption?: string;
  title?: string;
  details?: string;
  /** 'wide' and 'tall' images take a larger cell in the grid on desktop. */
  span?: 'wide' | 'tall';
}

/**
 * Add unadorned chapter photographs here when they are available.
 */
export const galleryImages: GalleryImage[] = [];
