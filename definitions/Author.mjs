import { gql } from "apollo-server";

const typeDefs = gql`
  type AuthorThumbnail {
    url: String
    width: Int
    height: Int
  }

  interface Author {
    author: String
    authorId: String
    authorUrl: String
    authorThumbnails: [AuthorThumbnail]
  }
`;

export default {
  typeDefs,
};
