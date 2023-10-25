export interface Product {
  id: string;
  slug: string;
  name: string;
  code: string;
  colorCodes: string[];
  price: number;
  discount: string;
  sellingPrice: string[];
  description: string;
  thumbnail: string;
  status: 'instock' | 'discontinued' | 'preorder' | 'soldout';
  note: string;
}
