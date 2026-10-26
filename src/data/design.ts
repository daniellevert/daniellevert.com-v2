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
    summary: 'An Android national-parks guide connecting discovery, attractions, maps, weather, and reviews.',
    description: 'Teddy’s Brochure is a national-parks travel guide. I contributed UI mockups, Android XML layouts, and Java frontend functionality on the project team, connecting visual design with implementation.',
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
        title: 'Purpose and intended users',
        paragraphs: [
          'The project brings park information into a mobile guide for people exploring United States national parks. The interface combines park selection, attraction details, weather, maps, and reviews around a selected park.',
        ],
      },
      {
        title: 'My role and collaboration',
        paragraphs: [
          'I created the mockups in Illustrator and Photoshop and worked on an agile team with Adam Sammakia and Tru Nguyen to customize and implement the application. My contribution included XML interface layouts and Java frontend behavior.',
          'The original idea and development document were created by Cecilia Avila, Eugenio Perez, Kaveesha Weerasiri, and Adrian Zavala.',
        ],
      },
      {
        title: 'Organizing the park experience',
        paragraphs: [
          'The mockups move between a park overview, individual attractions, and practical visitor information. A recurring bottom navigation connects the main areas, while photographs and content cards establish a visual hierarchy within each screen.',
        ],
        images: [
          { src: '/design/teddys-brochure/01.png', alt: 'Park guide mockups showing a launch screen, park overview, weather, and location information', caption: 'Original mockups: park overview and visitor information.' },
          { src: '/design/teddys-brochure/02.png', alt: 'Park guide mockups showing a map, attraction overview, and attraction detail screen', caption: 'Original mockups: moving from a park to its attractions and map information.' },
          { src: '/design/teddys-brochure/03.png', alt: 'Park selection, review list, and review-entry mockups', caption: 'Original mockups: choosing a park and reading or contributing reviews.' },
        ],
      },
      {
        title: 'From mockups to implementation',
        paragraphs: [
          'The public project includes Android layouts and Java frontend code, alongside a shared backend. The source includes attraction-detail navigation, a map centered on park coordinates, review entry, and cached attraction content for offline use. These features reflect the team’s shared implementation.',
          'The result is a team project with visual mockups and Android implementation artifacts. The images here show the original design direction; the linked repository documents the implementation.',
        ],
      },
      {
        title: 'Retrospective and next iteration',
        paragraphs: [
          'A next iteration would clarify the bottom-navigation labels, strengthen text hierarchy, and replace placeholder copy with realistic park information. It would also distinguish available offline content from information that needs a connection.',
          'A focused evaluation could ask visitors to choose a park, find an attraction, and locate practical visit information. That is a proposed next step, not research conducted for the work shown here.',
        ],
      },
    ],
  },

  {
    id: 'fomo',
    title: 'FOMO',
    summary: 'An event-app concept exploring discovery, invitations, and participation through two visual design iterations.',
    description: 'FOMO is an app concept for connecting event creators and attendees around in-person social events. I created the interface mockups in Illustrator and Photoshop, exploring how discovery, invitations, event details, and participation could fit together.',
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
        title: 'Purpose and scope',
        paragraphs: [
          'The concept considers two sides of an event experience: people hosting gatherings and people deciding where to go. The screens explore event discovery, invitations, RSVP and check-in states, profiles, and event history.',
          'My contribution shown here is UI and visual design across two iterations. The work is presented as a concept, with visual mockups as its deliverable.',
        ],
      },
      {
        title: 'Iteration 1 — establishing the interface',
        paragraphs: [
          'The first set explores a card-based discovery interface, an invitation screen, and event details. Profile and event-history screens extend the concept beyond the initial decision to attend.',
          'The screens also explore messaging, check-in, and a help area. Together they show the breadth of the concept, while leaving interaction rules and edge cases to be resolved.',
        ],
        images: [
          { src: '/design/fomo/02.jpg', alt: 'Early FOMO wireframe-style mockups showing discovery cards, event details, and navigation annotations', caption: 'Early exploration of discovery, event information, and navigation.' },
          { src: '/design/fomo/03.jpg', alt: 'FOMO mockups showing event discovery, an invitation, event details, and a help screen', caption: 'First visual direction for discovery and participation.' },
          { src: '/design/fomo/04.jpg', alt: 'FOMO mockups showing event history, attendance details, and a profile with a color palette', caption: 'Extending the concept into event history and profiles.' },
        ],
      },
      {
        title: 'Iteration 2 — developing the visual direction',
        paragraphs: [
          'The second set develops a more consistent purple-and-lime visual identity, with photo-led cards, revised typography, gradients, and repeated navigation elements. Event details bring attendance, messaging, and check-in controls into the same view.',
          'The comparison documents visual iteration: changes in layout, styling, and interface detail. Evaluating their effect on usability would be a next step.',
        ],
        images: [
          { src: '/design/fomo/cover.jpg', alt: 'Second-iteration FOMO discovery, invitation, event-detail, and Lifesaver concept screens', caption: 'Second iteration: a more developed visual identity across the event journey.' },
          { src: '/design/fomo/05.jpg', alt: 'Second-iteration FOMO event feed, attendance history, and profile screens', caption: 'Second iteration: event history and profiles using the updated visual treatment.' },
        ],
      },
      {
        title: 'Retrospective and next iteration',
        paragraphs: [
          'The next step would be to narrow the concept to one complete journey: discover an event, inspect its details, respond, and understand the confirmation. A clickable prototype could make the distinction between RSVP and check-in explicit and test whether navigation and event information are clear.',
          'The location-sharing and “Lifesaver” concepts need particular care around consent, visibility, and expectations of help. A future version should explain who can see activity and location, and should not imply dependable emergency assistance. Text legibility, labeled navigation, and missing error states would also be priorities.',
          'These are retrospective design opportunities and proposed evaluation steps, separate from the original mockups.',
        ],
      },
    ],
  }
];
