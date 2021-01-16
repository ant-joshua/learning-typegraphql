import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";
import config from "./ormconfig";

// @Resolver()
// class HelloResolver {
//   // private recipesCollection: Recipe[] = [];

//   @Query(() => String, { name: "helloWorld", nullable: true })
//   async helloWorld() {
//     // fake async in this example
//     return "hello world";
//   }
// }

const main = async () => {
  try {
    await createConnection({ ...config });

    const schema = await buildSchema({
      resolvers: [RegisterResolver],
      validate: false,
    });
    const apolloServer = new ApolloServer({ schema });

    const app = Express();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
      console.log("server started at localhost:4000");
    });
  } catch (error) {
    console.log(error);
  }
};

main();
