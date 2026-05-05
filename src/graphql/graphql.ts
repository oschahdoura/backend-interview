import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { gql } from "graphql-tag";

import { ProductsDefinition } from "./products/definitions";
import { buildProductsResolvers } from "./products/resolvers";

const productsResolvers = buildProductsResolvers();

const modulesResolvers = [productsResolvers];
const modulesTypeDefs = [ProductsDefinition];

export const GraphQLTypeDefs = mergeTypeDefs(modulesTypeDefs);
export const GraphQLResolvers = mergeResolvers(modulesResolvers);
