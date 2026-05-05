import { Product } from "@prisma/client";
import { loadProducts } from "../../services/utilities";
import { prisma } from "../client";
import { ProductEntity } from "../../services/types";

export class ProductsRepo {
    constructor() {
        this.seedProducts();
    }

    async seedProducts(): Promise<void> {
        const products = await loadProducts("src/mock/data.csv");
        await prisma.product.createMany({ data: products.map(product => ({
            id: product.id,
            name: product.name,
            price: parseFloat(`${product.price}`),
            imageUrl: product.imageUrl,
            quantity: parseInt(`${product.quantity}`),
        })) });
    }

    async createProduct(product: ProductEntity): Promise<Product> {
        return prisma.product.create({ data: product });
    }

    async getProducts(): Promise<Product[]> {
        return prisma.product.findMany();
    }

    async getProductById(id: string): Promise<Product | null> {
        return prisma.product.findUnique({ where: { id } });
    }
}