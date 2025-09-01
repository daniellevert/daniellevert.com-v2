// src/data/code-config.ts
export const CODE_CFG = {
    githubUser: 'daniellevert',
    hideForks: true,
    hideArchived: true,
    include: null as null | string[], // only show these repos (optional)
    exclude: ['daniellevert'] as string[],          // never show these (optional)
    pin: [] as string[],              // always float to top, in this order (optional)
  
    // Map repo-name -> YouTube/Vimeo watch URL
    videoLinks: {
      'song-creator': 'https://vimeo.com/1114689687',
      'somewherebetween': 'https://vimeo.com/414346683',
    } as Record<string, string>,
  }
  