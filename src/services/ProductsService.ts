import { ProductsRepo } from "../db/repos/ProductsRepo";
import { ProductEntity } from "./types";
import { loadProducts } from "./utilities";

export class ProductsService {
    private productsRepo: ProductsRepo;

    constructor(productRepo: ProductsRepo) {
        this.productsRepo = productRepo;
    }

  async getProducts(): Promise<ProductEntity[]> {
    return this.productsRepo.getProducts();
  }
}
