export interface Album {
  name: string;
  artist: string;
  cover: string;
}
export interface Category {
  name: string;
  thumbnail: string;
}

export const listenNowAlbums: Album[] = [
  {
    name: 'Ivan Howard Rendezvous',
    artist: '$86.00',
    cover:
      'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80',
  },
  {
    name: 'Cynthia Obrien Awakenings',
    artist: '$58.00',
    cover:
      'https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80',
  },
  {
    name: 'Trevor Allison Art of Reusability',
    artist: '$74.00',
    cover:
      'https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80',
  },
  {
    name: 'Frank Burns Symphony',
    artist: '$57.00',
    cover:
      'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80',
  },

  {
    name: 'Frank Burns Symphony',
    artist: '$57.00',
    cover:
      'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80',
  },
  {
    name: 'Frank Burns Symphony',
    artist: '$57.00',
    cover:
      'https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80',
  },
];

export const productCategories: Category[] = [
  {
    name: 'Son',
    thumbnail: '/images/categories/son.svg',
  },
  {
    name: 'Mascara',
    thumbnail: '/images/categories/mascara.svg',
  },
  {
    name: 'Phấn mắt',
    thumbnail: '/images/categories/phanmat.svg',
  },
  {
    name: 'Phấn má',
    thumbnail: '/images/categories/phanma.svg',
  },
  {
    name: 'Phấn phủ',
    thumbnail: '/images/categories/phanphu.svg',
  },
  {
    name: 'Kẻ mắt, chân mày, môi',
    thumbnail: '/images/categories/ke.svg',
  },
  {
    name: 'Kem nền',
    thumbnail: '/images/categories/kemnen.svg',
  },
  {
    name: 'Kem lót',
    thumbnail: '/images/categories/kemlot.svg',
  },
  {
    name: 'Kem chống nắng',
    thumbnail: '/images/categories/kemchongnang.svg',
  },
  {
    name: 'Kẹp mi',
    thumbnail: '/images/categories/kepmi.svg',
  },
  {
    name: 'Khác',
    thumbnail: '/images/categories/more.svg',
  },
];
