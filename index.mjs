import { ApolloServer } from "apollo-server";
import { schema } from "./schema.mjs";

const server = new ApolloServer({
  schema,
  // typeDefs,
  // resolvers,
  csrfPrevention: true,
  cache: "bounded",
  introspection: true,
  playground: true,
});

server.listen().then(({ url }) => {
  console.log(`GraphQL available at ${server.graphqlPath}`);
  console.log(`🚀  Server ready at ${url}`);
});
