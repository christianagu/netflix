import { ApolloClient, InMemoryCache } from "@apollo/client";

const { ApolloServer, gql } = require("apollo-server");
const axios = require("axios");

// Define GraphQL schema
const typeDefs = gql`
    type Movie {
    id: ID!
    title: String!
    description: String
    genre: String
    releaseYear: Int
    }

    type Query {
    movies: [Movie]
    }
    `;

// Define Ressolvers
const resolvers = {
    Query: {
        movies: async () => {
            const response = await axios.get("http://localhost:5159/api/NetflixApi");
            return response.data;
        },
    },
};

// Start Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`GraphQL server ready at ${url}`)
});