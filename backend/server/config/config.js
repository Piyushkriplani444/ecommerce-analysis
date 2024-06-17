const dotenv = require("dotenv");
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv.config();

module.exports = {
  development: {
    databases: {
      ecommerce: {
        username: process.env.DB_USERNAME1,
        password: process.env.DB_PASSWORD1,
        database: process.env.DB_DATABASE1,
        host: process.env.DB_HOST1,
        port: process.env.DB_PORT1,
        dialect: "postgres",
        logging: false,
      },
    },
  },

  ecommerce: {
    username: process.env.DB_USERNAME1,
    password: process.env.DB_PASSWORD1,
    database: process.env.DB_DATABASE1,
    host: process.env.DB_HOST1,
    port: process.env.DB_PORT1,
    dialect: "postgres",
  },

  test: {
    username: process.env.DB_USERNAME1,
    password: process.env.DB_PASSWORD1,
    database: process.env.DB_DATABASE1,
    host: process.env.DB_HOST1,
    port: process.env.DB_PORT1,
    dialect: "postgres",
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },

  production: {
    databases: {
      ecommerce: {
        username: process.env.DB_USERNAME1,
        password: process.env.DB_PASSWORD1,
        database: process.env.DB_DATABASE1,
        host: process.env.DB_HOST1,
        port: process.env.DB_PORT1,
        dialect: "postgres",
        logging: false,
      },
    },

    es_node: process.env.ELASTICSEARCH_NODE1,
    es_username: process.env.ELASTIC_USERNAME,
    es_password: process.env.ELASTIC_PASSWORD,

    logging: false,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
  },
};
