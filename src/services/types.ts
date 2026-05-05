import { Product } from "@prisma/client";

export type ProductEntity = Pick<Product, "id" | "name" | "price" | "imageUrl" | "quantity">;

export interface ProductRow {
    id: string;
    image: string;
    price: number;
    name: string;
    brand: string;
    num: number;
}