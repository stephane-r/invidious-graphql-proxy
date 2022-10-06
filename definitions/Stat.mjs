import { gql } from "apollo-server";
import fetch from "node-fetch";

const typeDefs = gql`
  type Software {
    name: String
    version: String
    branch: String
  }

  type UsageUser {
    title: Int
    activeHalfyear: Int
    activeMonth: Int
  }

  type Usage {
    users: UsageUser
  }

  type Metadata {
    updatedAt: Int
    lastChannelRefreshedAt: Int
  }

  type Stat {
    version: String
    software: Software
    openRegistrations: Boolean
    usage: Usage
    metadata: Metadata
  }

  type Query {
    stats: Stat
  }
`;

const resolvers = {
  Query: {
    stats: async () => {
      const request = await fetch("https://invidious.namazso.eu/api/v1/stats");
      return request.json();
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
