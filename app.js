"use strict";

const path = require("path");
const AutoLoad = require("@fastify/autoload");
const fsequelize = require("fastify-sequelize");
const dbPg = require("./sequelize/config/config")();
const swagger = require("@fastify/swagger");
const swaggerUi = require("@fastify/swagger-ui");
const pjson = require("./package.json");

// Pass --options via CLI arguments in command to enable these options.
const options = {};

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify
    .register(fsequelize, {
      ...dbPg,
      instance: "db", // tells the plugin to create a Sequelize instance with the name "db"
      models: path.join(__dirname, "sequelize", "tables", "userModel.js"),
    })
    .after(async () => {
      //console.log(fastify.db);
      require("./sequelize/tables/userModel")(fastify.db);
      require("./sequelize/tables/blogModel")(fastify.db);
      try {
        //await fastify.db.sync();
      } catch (error) {
        console.log("error sync with db", error);
      }
    });

  fastify.register(swagger, {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: pjson.title,
        description: pjson.description,
        version: pjson.version,
        contact: {
          name: pjson.author,
          url: pjson.porfolio,
        },
      },
      securityDefinitions: {
        bearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "headers",
        },
      },
    },
    exposeRoute: true, // This creates a route for serving the Swagger JSON
  });
  fastify.register(swaggerUi, {
    title: "API Documentation",
    swagger: "/documentation/json", // Route to your Swagger JSON
  });

  fastify.register(require("@fastify/cors"), {
    origin: [
      "http://localhost:8080",
      "http://127.0.0.1:8080",
      "http://localhost:3000",
    ],
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });

  fastify.register(require("@fastify/multipart"));
  fastify.register(require("@fastify/formbody"));
};

module.exports.options = options;
