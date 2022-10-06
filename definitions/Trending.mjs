import { gql } from "apollo-server";
import fetch from "node-fetch";

const typeDefs = gql`
  type Treding {
    title: String
    videoId: String
    videoThumbnails: [VideoThumbnail]

    lengthSeconds: Int
    viewCount: Int

    author: String
    authorId: String
    authorUrl: String

    published: Int
    publishedText: String
    description: String
    descriptionHtml: String

    liveNow: Boolean
    paid: Boolean
    premium: Boolean
  }

  type Query {
    trending: [Treding]
  }
`;

const resolvers = {
  Query: {
    trending: async () => {
      const request = await fetch(
        "https://invidious.namazso.eu/api/v1/trending"
      );
      return request.json();
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
