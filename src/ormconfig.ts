require("dotenv").config();
import { ConnectionOptions } from "typeorm";

const rootDir = process.env.NODE_ENV === "development" ? "src" : "build/src";
export const config: ConnectionOptions = {
  host: process.env.DB_HOST,
  type: "postgres",
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [rootDir + "/entity/**/*.{js,ts}"],
  migrations: [rootDir + "/migrations/*.{js,ts}"],
  subscribers: [rootDir + "/subscribers/**/*.{js,ts}"],
  cli: {
    entitiesDir: `${rootDir}/entity`,
    migrationsDir: `${rootDir}/migration`,
    subscribersDir: `${rootDir}/subscriber`,
  },
  synchronize: true,
  logging: true,
};

export default config;
// export default config;
// module.exports = config;
