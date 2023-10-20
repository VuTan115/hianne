export const siteConfig = {
  name: 'Hi-Anne', // site name
  url: 'https://hianne.shop', // site domain
  ogImage:
    'https://plus.unsplash.com/premium_photo-1664202526047-405824c633e7?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // og image url for SEO this will show on facebook, insta share card
  description: '', // the description of the site which will used for SEO
  links: {
    facebook: 'https://fb.com/shadcn',
    instagram: 'https://fb.com/shadcn',
  },
};

export type SiteConfig = typeof siteConfig;
