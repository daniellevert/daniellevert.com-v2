// Auto-migrated to the richer design schema (images -> DesignImage, optional sections)
export type DesignLink = { label: string; href: string };

export type DesignImage = {
  src: string;
  alt?: string;
  caption?: string;
};

export type DesignSection = {
  title?: string;          // e.g., "Iteration 1"
  paragraphs?: string[];   // text blocks between images
  images?: DesignImage[];  // ordered images within this section
};

export type DesignProject = {
  id: string;
  title: string;
  summary?: string;        // short blurb for the grid card
  description?: string;    // long description for the popover
  tools?: string[];
  cover?: string;          // small preview for the card
  links?: DesignLink[];    // repo, case study, video, etc.
  images?: DesignImage[];  // simple projects: flat list of images
  sections?: DesignSection[]; // complex projects: iterations/chapters
};

export const DESIGN: DesignProject[] = [
  {
    id: 'teddys-brochure',
    title: 'Teddy\'s Brochure',
    summary: 'A travel guide Android app for United States national parks that works for any number of parks in the database.',
    description: 'A travel guide Android app for United States national parks that works for any number of parks in the database.',
    tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Android Studio', 'Java', 'XML'],
    cover: '/design/teddys-brochure/01.png',
    links: [
      { label: 'GitHub', href: 'https://github.com/daniellevert/teddys-brochure' },
    ],
    images: [
      { src: '/design/teddys-brochure/01.png', alt: 'Teddy\'s Brochure Mockup 1' },
      { src: '/design/teddys-brochure/02.png', alt: 'Teddy\'s Brochure Mockup 2' },
      { src: '/design/teddys-brochure/03.png', alt: 'Teddy\'s Brochure Mockup 3' },
    ],
    sections: [
      {
        title: 'Designs by Daniel LeVert',
        images: [
          { src: '/design/teddys-brochure/01.png', alt: 'Teddy\'s Brochure Mockup 1' },
          { src: '/design/teddys-brochure/02.png', alt: 'Teddy\'s Brochure Mockup 2' },
          { src: '/design/teddys-brochure/03.png', alt: 'Teddy\'s Brochure Mockup 3' },
        ],
      },
    ],
  },

  {
    id: 'fomo',
    title: 'FOMO',
    summary: 'An app for organizing in-person social events.',
    description: 'An app for organizing in-person social events',
    tools: ['Adobe Illustrator', 'Adobe Photoshop'],
    cover: '/design/fomo/cover.jpg',
    images: [
      { src: '/design/fomo/02.jpg', alt: 'FOMO Mockup 1' },
      { src: '/design/fomo/03.jpg', alt: 'FOMO Mockup 2' },
      { src: '/design/fomo/04.jpg', alt: 'FOMO Mockup 3' },
      { src: '/design/fomo/cover.jpg', alt: 'FOMO Mockup 4' },
      { src: '/design/fomo/05.jpg', alt: 'FOMO Mockup 5' },
    ],
    sections: [
      {
        title: 'Design Iteration 1',
        paragraphs: [
          'This initial design iteration focused on creating a clean and modern interface to serve as a proof of concept for the app.',
        ],
        images: [
          { src: '/design/fomo/02.jpg', alt: 'FOMO Mockup 1' },
          { src: '/design/fomo/03.jpg', alt: 'FOMO Mockup 2' },
          { src: '/design/fomo/04.jpg', alt: 'FOMO Mockup 3' },
        ],
      },
      {
        title: 'Design Iteration 2',
        paragraphs: [
          'The second design iteration refined the layout, adding more details, updating the color scheme, and adding more depth to the user interface.',
        ],
        images: [
          { src: '/design/fomo/cover.jpg', alt: 'FOMO Mockup 4' },
          { src: '/design/fomo/05.jpg', alt: 'FOMO Mockup 5' },
        ],
      },
    ],
  }
];