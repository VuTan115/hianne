import { Product } from "@/interfaces/product";

class ProductProvider {
	ApiEnpoint = 'http://localhost:8081/api/products';

	async fetchProducts() {
		const products: Product[] = await fetch(this.ApiEnpoint).then(res => res.json());
		return products;
	}

}

export const productService = new ProductProvider();