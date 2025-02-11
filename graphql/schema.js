const { gql } = require('graphql-tag');

// Import typeDefs and resolvers for different parts of your schema
import courseTypeDefs from "./types/courseType";
import userTypeDefs from "./types/userType";
import examTypeDefs from "./types/examType";

import courseResolvers from "./resolvers/courseResolver";
import userResolvers from "./resolvers/userResolver";
import examResolvers from "./resolvers/examResolver";

// Combine all typeDefs into a single schema definition
const typeDefs = gql`
  ${courseTypeDefs}
  ${userTypeDefs}
  ${examTypeDefs}
`;

// Combine all resolvers for queries, mutations, and types
const resolvers = {
  Query: {
    ...courseResolvers.Query,
    ...userResolvers.Query,
    ...examResolvers.Query,
  },
  Mutation: {
    ...courseResolvers.Mutation,
    ...userResolvers.Mutation,
    ...examResolvers.Mutation,
  },
  Course: courseResolvers.Course,
  Lesson: courseResolvers.Lesson,
  Topic: courseResolvers.Topic,
  Exam: examResolvers.Exam,
  Test: examResolvers.Test,
  Question: examResolvers.Question,
};

export { typeDefs, resolvers };