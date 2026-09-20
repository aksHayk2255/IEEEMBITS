import sessionImage from '../assets/images/session.jpeg';

export interface GalleryImage {
  /** Import the file from src/assets/images and pass the imported value here. */
  src: string;
  /** Describe the photo for screen readers. */
  alt: string;
  caption?: string;
  /** 'wide' and 'tall' images take a larger cell in the grid on desktop. */
  span?: 'wide' | 'tall';
}

/**
 * Add real chapter photographs here. Until then the Gallery section
 * shows an empty state rather than stock imagery.
 */
export const gallery: GalleryImage[] = [
  {
    src: sessionImage,
    alt: 'IEEE Computer Society MBITS session',
    caption: 'Chapter session',
    span: 'wide',
  },
];
