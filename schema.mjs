import merge from "merge-deep";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import AuthorDefs from "./definitions/Author.mjs";
import PopularDefs from "./definitions/Popular.mjs";
import SearchDefs from "./definitions/Search.mjs";
import StatDefs from "./definitions/Stat.mjs";
import TrendingDefs from "./definitions/Trending.mjs";
import VideoDefs from "./definitions/Video.mjs";

const definitions = [
  AuthorDefs,
  PopularDefs,
  SearchDefs,
  StatDefs,
  TrendingDefs,
  VideoDefs,
];

const schemaDefinition = {
  typeDefs: mergeTypeDefs(
    definitions.map((def) => def.typeDefs).filter(Boolean)
  ),
  resolvers: merge(...definitions.map((def) => def.resolvers)),
  inheritResolversFromInterfaces: true,
};

export const schema = makeExecutableSchema(schemaDefinition);
