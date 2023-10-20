export interface Album {
  name: string;
  artist: string;
  cover: string;
}

export const listenNowAlbums: Album[] = [
  {
    name: 'React Rendezvous',
    artist: 'Ethan Byte',
    cover:
      'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80',
  },
  {
    name: 'Async Awakenings',
    artist: 'Nina Netcode',
    cover:
      'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80',
  },
  {
    name: 'The Art of Reusability',
    artist: 'Lena Logic',
    cover:
      'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80',
  },
  {
    name: 'Stateful Symphony',
    artist: 'Beth Binary',
    cover:
      'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80',
  },
];

export const productCategories: Album[] = [
  {
    name: 'Son',
    artist: '',
    cover: '/images/categories/son.svg',
  },
  {
    name: 'Mascara',
    artist: '',
    cover: '/images/categories/mascara.svg',
  },
  {
    name: 'Phấn mắt',
    artist: '',
    cover: '/images/categories/phanmat.svg',
  },
  {
    name: 'Phấn má',
    artist: '',
    cover: '/images/categories/phanma.svg',
  },
  {
    name: 'Phấn phủ',
    artist: '',
    cover: '/images/categories/phanphu.svg',
  },
  {
    name: 'Kẻ mắt, chân mày, môi',
    artist: '',
    cover: '/images/categories/ke.svg',
  },
  {
    name: 'Kem nền',
    artist: '',
    cover: '/images/categories/kemnen.svg',
  },
  {
    name: 'Kem lót',
    artist: '',
    cover: '/images/categories/kemlot.svg',
  },
  {
    name: 'Kem chống nắng',
    artist: '',
    cover: '/images/categories/kemchongnang.svg',
  },
  {
    name: 'Kẹp mi',
    artist: '',
    cover: '/images/categories/kepmi.svg',
  },
];
