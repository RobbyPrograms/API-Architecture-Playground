import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import { getUsers, getUserById, addUser } from "../store.js";

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
  }
  type Query {
    users: [User!]!
    user(id: ID!): User
  }
  type Mutation {
    addUser(name: String!, email: String!): User!
  }
`;

const resolvers = {
  Query: {
    users: () => getUsers(),
    user: (_, { id }) => getUserById(id),
  },
  Mutation: {
    addUser: (_, { name, email }) => addUser({ name, email }),
  },
};

export const graphqlServer = new ApolloServer({ typeDefs, resolvers });

export function graphqlMiddleware() {
  return expressMiddleware(graphqlServer);
}
