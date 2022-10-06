import { gql } from "apollo-server";
import fetch from "node-fetch";

const typeDefs = gql`
  type VideoThumbnail {
    quality: String!
    url: String!
    width: Int!
    height: Int!
  }

  type AdaptiveFormat {
    index: String!
    bitrate: String!
    init: String!
    url: String!
    itag: String!
    type: String!
    clen: String!
    lmt: String!
    projectionType: Int!
    container: String!
    encoding: String!
    qualityLabel: String
    resolution: String
  }

  type FormatStream {
    url: String!
    itag: String!
    type: String!
    quality: String!
    container: String!
    encoding: String!
    qualityLabel: String!
    resolution: String!
    size: String!
  }

  type Caption {
    label: String!
    languageCode: String!
    url: String!
  }

  type RecommendedVideo {
    videoId: String
    title: String
    videoThumbnails: [VideoThumbnail]
    author: String
    lengthSeconds: Int
    viewCountText: String
  }

  type Video implements Author {
    title: String!
    videoId: String!
    videoThumbnails: [VideoThumbnail!]

    description: String!
    descriptionHtml: String!
    published: Int!
    publishedText: String!

    keywords: [String]
    viewCount: Int
    likeCount: Int
    dislikeCount: Int

    paid: Boolean!
    premium: Boolean!
    isFamilyFriendly: Boolean!
    allowedRegions: [String!]
    genre: String!
    genreUrl: String!

    author: String!
    authorId: String!
    authorUrl: String!
    authorThumbnails: [AuthorThumbnail!]

    subCountText: String!
    lengthSeconds: Int!
    allowRatings: Boolean!
    rating: Int!
    isListed: Boolean!
    liveNow: Boolean!
    isUpcoming: Boolean!
    premiereTimestamp: Int

    hlsUrl: String
    adaptiveFormats: [AdaptiveFormat!]
    formatStreams: [FormatStream!]
    captions: [Caption!]
    recommendedVideos: [RecommendedVideo!]
  }

  type Query {
    video(videoId: String!): Video!
  }
`;

const resolvers = {
  Query: {
    video: async (_, { videoId }) => {
      const request = await fetch(
        `https://invidious.namazso.eu/api/v1/videos/${videoId}`
      );
      return request.json();
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
