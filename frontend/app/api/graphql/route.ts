import { NextRequest, NextResponse } from "next/server";
import { buildSchema, graphql } from "graphql";
import { getUsers, getUserById, addUser } from "@/lib/store";

const typeDefs = `
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

const schema = buildSchema(typeDefs);

const root = {
  users: () => getUsers(),
  user: ({ id }: { id: string }) => getUserById(id),
  addUser: ({ name, email }: { name: string; email: string }) => addUser({ name, email }),
};

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { query, variables } = body ?? {};
  if (!query) {
    return NextResponse.json({ errors: [{ message: "query required" }] }, { status: 400 });
  }
  const result = await graphql({ schema, source: query, rootValue: root, variableValues: variables });
  return NextResponse.json(result);
}
