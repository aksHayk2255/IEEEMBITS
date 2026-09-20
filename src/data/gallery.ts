import sessionImage from '../assets/images/session-optimized.jpeg';

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
 * Add real chapter photographs here. Until then the Gallery section
 * shows an empty state rather than stock imagery.
 */
export const gallery: GalleryImage[] = [
  {
    src: sessionImage,
    alt: 'IEEE Computer Society MBITS session',
    caption: 'Insightful talk session on digital marketing',
    title: 'Digital Marketing Talk Session',
    details:
      'As a collaborative initiative by IEEE CS SBC MBITS and IEEE CS SBC MEA, we proudly present an insightful talk session that explores the strategies and techniques behind effective digital marketing in today\'s fast-paced digital world.\n\nSpeaker: Mr. Visakh Nair\nChange and Transition Leader\nSales, Office of CEO @ UST Global',
    span: 'wide',
  },
];
