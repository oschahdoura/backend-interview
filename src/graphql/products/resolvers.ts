import { ProductsRepo } from "../../db/repos/ProductsRepo";
import { ProductsService } from "../../services/ProductsService";

export function buildProductsResolvers() {
    const productsRepo = new ProductsRepo();
    const productsService = new ProductsService(productsRepo);
  
    return {
      Query: {
      products: () => productsService.getProducts(),
    },
  };
}
