import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { gql } from 'graphql-tag';


export const InitialDefinition = gql`
  type Query {
    helloWorld: String
  }
`;

export const InitialResolvers = {
  Query: {
    helloWorld: () => 'Hello World',
  },
};

const modulesResolvers = [InitialResolvers];
const modulesTypeDefs = [InitialDefinition];

export const GraphQLTypeDefs  = mergeTypeDefs(modulesTypeDefs);
export const GraphQLResolvers = mergeResolvers(modulesResolvers);