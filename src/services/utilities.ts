import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";
import { ProductEntity, ProductRow } from "./types";

export async function loadProducts(filePath: string): Promise<ProductEntity[]> {

  const csv = await readFile(filePath, "utf8");
  const rows: ProductRow[] = parse(csv, {
    columns: true,
    trim: true,
    skip_empty_lines: true,
    bom: true,
  });

  const products = rows.map(toProductEntity);
  return products;
}



function toProductEntity(row: ProductRow): ProductEntity {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    imageUrl: row.image,
    quantity: row.num,
  };
}