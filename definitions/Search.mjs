import { gql } from "apollo-server";
import fetch from "node-fetch";
import { parseParams } from "../util.mjs";

const typeDefs = gql`
  enum SearchType {
    video
    playlist
    channel
    all
  }

  enum SearchWhereSortBy {
    relevance
    rating
    upload_date
    view_count
  }

  enum SearchWhereDate {
    hour
    today
    week
    month
    year
  }

  enum SearchWhereDuration {
    short
    long
  }

  interface Search {
    author: String!
    authorId: String!
    authorUrl: String!
  }

  interface SearchVideo {
    videoId: String
  }

  interface SearchPlaylist {
    playlistId: String
  }

  type SearchResult implements Search & SearchVideo & SearchPlaylist {
    # Search
    type: SearchType!
    title: String
    author: String!
    authorId: String!
    authorUrl: String!

    # SearchVideo
    videoId: String

    # SearchPlaylist
    playlistId: String

    # videoThumbnails: [VideoThumbnail]
    # description: String
    # descriptionHtml: String

    # viewCount: Int
    # published: Int
    # publishedText: String
    # lengthSeconds: Int
    # liveNow: Boolean
    # paid: Boolean
    # premium: Boolean
  }

  input SearchWhere {
    q: String
    page: Int = 1
    sort_by: SearchWhereSortBy = upload_date
    date: SearchWhereDate
    duration: SearchWhereDuration
    type: SearchType = video
  }

  type Query {
    search(where: SearchWhere = {}): [SearchResult!]
  }
`;

const resolvers = {
  Query: {
    search: async (_, { where }) => {
      const request = await fetch(
        `https://invidious.namazso.eu/api/v1/search?${parseParams(where)}`
      );
      return request.json();
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
