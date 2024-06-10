import { ProductsType } from '../../types/products';

export interface productsApi {
  getProdustsList(type: string): Promise<ProductsType[]>;
  getProduct(productId: number): Promise<ProductsType>;
}
