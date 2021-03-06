import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";
import { config } from "./ormconfig";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import cors from "cors";
import { LoginResolver } from "./modules/user/Login";
import { MeResolver } from "./modules/user/Me";
import { ConfirmUserResolver } from "./modules/user/ConfirmUser";

declare module "express-session" {
  export interface SessionData {
    // user: { [key: string]: any };
    userId: number;
  }
}

const main = async () => {
  try {
    await createConnection({ ...config });

    const schema = await buildSchema({
      resolvers: [
        RegisterResolver,
        LoginResolver,
        MeResolver,
        ConfirmUserResolver,
      ],
      validate: true,
      authChecker: ({ context: { req } }) => {
        // if (req.session.userId) {
        //   return true;
        // }
        // return false;
        return !!req.session.userId;
      },
    });
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req }: any) => ({ req }),
    });

    const app = express();

    app.use(
      cors({
        credentials: true,
        origin: "http://localhost:3000",
      })
    );

    const RedisStore = connectRedis(session);

    const sessionOption: session.SessionOptions = {
      store: new RedisStore({
        client: redis,
      }),
      name: "qid",
      secret: "joshuakeren123",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    };

    app.use(session(sessionOption));

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
      console.log("server started at localhost:4000");
    });
  } catch (error) {
    console.log(error);
  }
};

main();
