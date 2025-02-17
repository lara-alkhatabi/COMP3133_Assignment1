require('dotenv').config({ path: '../.env' }); // ✅ Load .env file
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const typeDefs = require('./schemas/schema');
const resolvers = require('./resolvers/resolver');

// Connect to MongoDB
connectDB();

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}/graphql`));
}

startServer();
