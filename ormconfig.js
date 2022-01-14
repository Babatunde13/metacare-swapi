/* eslint-disable @typescript-eslint/no-var-requires */
const { config } = require('dotenv');

config()

module.exports = {
    name: "default",
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["dist/src/entities/*.entity.ts"],
    logging: process.env.NODE_ENV === "development" ? true : false,
    migrations: ["dist/src/migration/*.js"],
    cli: {
        entitiesDir: "dist/src/entities",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber"
    }
}
