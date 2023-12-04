"use strict";
const {
  DeleteUserService,
  GetAllUserService,
  UpdateUserService,
  SingleUserService,
  authorize,
} = require("../../services");

module.exports = async function (fastify, opts) {
  fastify.route({
    url: "/User/:id/",
    method: ["POST"],
    // request and response schema
    schema: {
      summary: "Get SingleUser",
      description: "Returns a given single user data",
      tags: ["User"],
      // (or query) validates the querystring
      body: {
        type: "object",
        properties: {
          appUserId: { type: "number", description: "a User id" },
        },
        required: ["appUserId"],
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        404: {
          description: "User not found",
          type: "object",
          properties: {
            code: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
        401: {
          description: "User not authorized",
          type: "object",
          properties: {
            code: { type: "string" },
            message: { type: "string" },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    // called just before the request handler
    preHandler: [(request, reply) => authorize(request, reply)],
    // the function that will handle this request
    handler: async (request, reply) => {
      try {
        const result = await SingleUserService(request, reply, fastify);
        reply.status(200).send(result);
      } catch (err) {
        reply.status(500).send(err.message);
      }
    },
  });
  fastify.route({
    url: "/User/:id/",
    method: ["DELETE"],
    // request and response schema
    schema: {
      summary: "Delete user Data",
      description: "Delete a given user's data",
      tags: ["User"],
      // (or query) validates the querystring
      body: {
        type: "object",
        properties: {
          appUserId: { type: "number" },
        },
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          description: "Returns User model",
          type: "object",
          properties: {
            code: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
        404: {
          description: "User not found",
          type: "object",
          properties: {
            code: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
        401: {
          description: "User not authorized",
          type: "object",
          properties: {
            code: { type: "string" },
            message: { type: "string" },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    // called just before the request handler
    preHandler: [(request, reply) => authorize(request, reply)],
    // the function that will handle this request
    handler: async (request, reply) => {
      try {
        const result = await DeleteUserService(request, reply, fastify);
        reply.status(200).send(result);
      } catch (err) {
        reply.status(500).send(err.message);
      }
    },
  });
  fastify.route({
    url: "/all",
    method: ["GET"],
    // request and response schema
    schema: {
      summary: "GetAll user's Data",
      description: "All user's data",
      tags: ["User"],
      // (or query) validates the querystring
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        404: {
          description: "User not found",
          type: "object",
          properties: {
            code: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
        401: {
          description: "User not authorized",
          type: "object",
          properties: {
            code: { type: "string" },
            message: { type: "string" },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    // called just before the request handler
    preHandler: [(request, reply) => authorize(request, reply)],
    // the function that will handle this request
    handler: async (request, reply) => {
      try {
        const result = await GetAllUserService(request, reply, fastify);
        reply.status(200).send(result);
      } catch (err) {
        reply.status(500).send(err.message);
      }
    },
  });
  fastify.route({
    url: "/Useupdate",
    method: ["PUT"],
    // request and response schema
    schema: {
      summary: "Update user's Data",
      description: "Update a given user's data",
      tags: ["User"],
      // (or query) validates the querystring
      body: {
        type: "object",
        properties: {
          appUserName: { type: "string" },
          appPassword: { type: "string" },
          appRoleId: { type: "integer" },
          appName: { type: "string" },
          appUserType: { type: "integer" },
          appMobile: { type: "string" },
          appIsActive: { type: "boolean" },
          appIsSuperAdmin: { type: "boolean" },
          appUserId: { type: "integer" },
        },
        required: ["appUserName", "appPassword", "appRoleId", "appName"],
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          description: "Returns User model",
          type: "object",
          properties: {
            code: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
        404: {
          description: "User not found",
          type: "object",
          properties: {
            code: {
              type: "string",
            },
            message: {
              type: "string",
            },
          },
        },
        401: {
          description: "User not authorized",
          type: "object",
          properties: {
            code: { type: "string" },
            message: { type: "string" },
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    // called just before the request handler
    preHandler: [(request, reply) => authorize(request, reply)],
    // the function that will handle this request
    handler: async (request, reply) => {
      try {
        const result = await UpdateUserService(request, reply, fastify);
        reply.status(200).send(result);
      } catch (err) {
        reply.status(500).send(err.message);
      }
    },
  });
};
