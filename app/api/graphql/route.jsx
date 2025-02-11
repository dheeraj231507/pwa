import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import jwt from "jsonwebtoken";
import { typeDefs, resolvers } from "../../../graphql/schema";

// Token verification function
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    console.log("Request headers:", req.headers);  // Log headers to confirm they're passed

    const authorizationHeader = req.headers.authorization || "";
    const token = authorizationHeader.replace("Bearer ", "");
    let user = null;

    if (token) {
      console.log("Attempting to verify token...");
      user = verifyToken(token);
      if (!user) {
        console.warn("Token verification failed or user is invalid.");
      } else {
        console.log("User from token:", user);
      }
    } else {
      console.warn("No token found in Authorization header.");
    }

    return { user };  // Return user in context
  },
});

// Create Next.js handler for Apollo Server
const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
