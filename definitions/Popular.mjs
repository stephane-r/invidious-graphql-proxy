import { gql } from "apollo-server";
import fetch from "node-fetch";

const typeDefs = gql`
  enum PopularType {
    music
    gaming
    news
    movies
  }

  type Popular {
    type: PopularType
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
  }

  type Query {
    popular: [Popular]
  }
`;

const resolvers = {
  Query: {
    popular: async () => {
      const request = await fetch(
        "https://invidious.namazso.eu/api/v1/popular"
      );
      return request.json();
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
