export interface Product {
  id: string;
  slug: string;
  name: string;
  productCode: string;
  colorCodes: string[];
  price: number;
  discountPercent: number;
  sellingPrice: string[];
  description: string;
  thumbnail: string;
  status: 'instock' | 'stop' | 'preorder' | 'soldout';
  note: string;
}
