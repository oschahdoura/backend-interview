import express from "express";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { unwrapResolverError } from "@apollo/server/errors";
import { expressMiddleware } from "@as-integrations/express5";
import { GraphQLTypeDefs, GraphQLResolvers } from "./graphql/graphql";
import { env } from "../env";
import cors from "cors";
import http from "node:http";
import { connectToDatabase, disconnectFromDatabase } from "./db/utilities";

const app = express();
const httpServer = http.createServer(app);
const apolloServer = new ApolloServer({
  typeDefs: GraphQLTypeDefs,
  resolvers: GraphQLResolvers,
  introspection: env.NODE_ENV !== "production",
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (formatted, error) => {
    if (env.NODE_ENV === "production") return formatted;

    const thrown = unwrapResolverError(error);
    const cause = thrown instanceof Error ? thrown.cause : undefined;
    if (cause === undefined) return formatted;

    return {
      ...formatted,
      extensions: {
        ...formatted.extensions,
        cause:
          cause instanceof Error
            ? `${cause.name}: ${cause.message}`
            : String(cause),
      },
    };
  },
});

const bootstrapServer = async () => {
  await connectToDatabase();
  await apolloServer.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(apolloServer));

  httpServer.listen(env.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${env.PORT}/graphql`);
  });
};

const shutdownServer = async (exitCode: number = 0) => {
  try {
    console.log("🔄 Shutting down server...");
    await apolloServer.stop();
    await disconnectFromDatabase();
    console.log("✅ Server shutdown complete");
    process.exit(exitCode);
  } catch (error) {
    console.error("❌ Server shutdown failed:", error);
    process.exit(1);
  }
};

const observeSignals = () => {
  for (const signal of ["SIGTERM", "SIGINT"] as const) {
    process.on(signal, () => {
      console.log(`📥 Received ${signal}`);
      void shutdownServer(0);
    });
  }
};

const main = async () => {
  await bootstrapServer();
  observeSignals();
};

main().catch(async (error) => {
  console.error("❌ Server startup failed:", error);
  await shutdownServer(1);
});
