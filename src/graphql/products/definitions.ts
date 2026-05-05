import { gql } from "graphql-tag";

export const ProductsDefinition = gql`
  type Query {
    products: [Product!]!
  }

  type Product {
    id: ID!
    imageUrl: String!
    price: Float!
    name: String!
    quantity: Int!
  }
`;
