import { MainNavItem, SidebarNavItem } from '@/types/nav';

interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Sản phẩm',
      href: '/products',
    },
  ],
  sidebarNav: [
    {
      title: 'Getting Started',
      items: [
        {
          title: 'Introduction',
          href: '/docs',
          items: [],
        },
        {
          title: 'Installation',
          href: '/docs/installation',
          items: [],
        },
        {
          title: 'components.json',
          href: '/docs/components-json',
          items: [],
        },
        {
          title: 'Theming',
          href: '/docs/theming',
          items: [],
        },
        {
          title: 'Dark mode',
          href: '/docs/dark-mode',
          items: [],
        },
        {
          title: 'CLI',
          href: '/docs/cli',
          items: [],
        },
        {
          title: 'Typography',
          href: '/docs/components/typography',
          items: [],
        },
        {
          title: 'Figma',
          href: '/docs/figma',
          items: [],
        },
        {
          title: 'Changelog',
          href: '/docs/changelog',
          items: [],
        },
        {
          title: 'About',
          href: '/docs/about',
          items: [],
        },
      ],
    },
    {
      title: 'Installation',
      items: [
        {
          title: 'Next.js',
          href: '/docs/installation/next',
          items: [],
        },
        {
          title: 'Vite',
          href: '/docs/installation/vite',
          items: [],
        },
        {
          title: 'Remix',
          href: '/docs/installation/remix',
          items: [],
        },
        {
          title: 'Gatsby',
          href: '/docs/installation/gatsby',
          items: [],
        },
        {
          title: 'Astro',
          href: '/docs/installation/astro',
          items: [],
        },
        {
          title: 'Laravel',
          href: '/docs/installation/laravel',
          items: [],
        },
        {
          title: 'Manual',
          href: '/docs/installation/manual',
          items: [],
        },
      ],
    },
    {
      title: 'Dark Mode',
      items: [
        {
          title: 'Next.js',
          href: '/docs/dark-mode/next',
          items: [],
        },
        {
          title: 'Vite',
          href: '/docs/dark-mode/vite',
          items: [],
        },
        {
          title: 'Astro',
          href: '/docs/dark-mode/astro',
          items: [],
        },
      ],
    },
    {
      title: 'Components',
      items: [
        {
          title: 'Accordion',
          href: '/docs/components/accordion',
          items: [],
        },
      ],
    },
  ],
};
