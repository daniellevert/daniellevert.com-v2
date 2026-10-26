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
    summary: 'A mobile guide that brings national parks, attractions, maps, weather, and reviews together.',
    description: 'Teddy’s Brochure brings park discovery and practical trip information into one Android guide. I designed all of the UI mockups, then worked with the team to bring the experience to life in XML and Java, contributing to the frontend implementation.',
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
          'I designed all of the UI mockups in Illustrator and Photoshop. Adam Sammakia, Tru Nguyen, and I worked together on the Android implementation; I also contributed XML layouts and Java frontend functionality.',
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
    summary: 'An event app concept built around a mutual match between guests and hosts.',
    description: 'FOMO imagines a more social way to find a night out: guests swipe through events, hosts curate their guest lists, and a mutual yes becomes an invitation. I led the concept and created two rounds of UI mockups in Illustrator and Photoshop after talking through the idea with a friend.',
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
        title: 'The idea',
        paragraphs: [
          'The idea grew from wanting more in-person connection at a time when social media was taking up more of our social lives. We imagined starting on college campuses, where students looking for plans and people hosting events might both want a more intentional way to find each other. The concept took shape around the pandemic. The mockups shown here do not establish a launch or user-testing outcome.',
          'The core interaction is two-sided: guests swipe through events they might attend, while hosts decide whom to invite. A mutual yes leads to an invitation and event details. I led the visual direction and made the two rounds of UI mockups shown here after discussing the idea with a friend. The original screens primarily show the guest journey; the host side remains a concept to work through.',
        ],
      },
      {
        title: 'Iteration 1 — establishing the interface',
        paragraphs: [
          'The first set explores a swipeable stack of event cards, the invitation after a match, and event details. Profile and event-history screens extend the concept beyond the initial decision to attend.',
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
          'The two rounds show how the look and feel evolved. Testing whether the newer screens make the experience clearer would be a next step.',
        ],
        images: [
          { src: '/design/fomo/cover.jpg', alt: 'Second-iteration FOMO discovery, invitation, event-detail, and Lifesaver concept screens', caption: 'Second iteration: a more developed visual identity across the event journey.' },
          { src: '/design/fomo/05.jpg', alt: 'Second-iteration FOMO event feed, attendance history, and profile screens', caption: 'Second iteration: event history and profiles using the updated visual treatment.' },
        ],
      },
      {
        title: 'Retrospective and next iteration',
        paragraphs: [
          'The next step would be to prototype both sides of one match: a guest expresses interest, a host reviews that interest, and an invitation becomes a plan. This would make the matching rules, RSVP, and check-in distinct and test whether the extra host decision helps or simply adds friction.',
          'Host curation could also make the experience exclusionary or unclear to guests. A stronger version needs explicit criteria, a respectful response for people who are not invited, and a way to avoid reducing people to a profile card.',
          'The location-sharing and “Lifesaver” concepts need particular care around consent, visibility, and expectations of help. A future version should explain who can see activity and location, and should not imply dependable emergency assistance. Text legibility, labeled navigation, and missing error states would also be priorities.',
          'These are ideas for a future version of FOMO.',
        ],
      },
    ],
  }
];
