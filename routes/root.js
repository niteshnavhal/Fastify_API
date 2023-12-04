"use strict";
const {
  signInUserService,
  signUpUserService,
  authorize,
} = require("../services/index");

module.exports = async function (fastify, opts) {
  fastify.route({
    url: "/Login",
    method: ["POST"],
    // request and response schema
    schema: {
      summary: "Get user's Data",
      tags: ["Auth"],
      // (or query) validates the querystring
      description: "signIn",
      body: {
        type: "object",
        properties: {
          userName: { type: "string" },
          password: { type: "string" },
        },
        required: ["userName", "password"],
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          description: "Returns User model",
          type: "object",
          properties: {
            token: {
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
    },
    // called just before the request handler
    preHandler: async (request, reply) => {
      const { userName, password } = request.body;
      if (userName == "") {
        reply.code(404).send({
          code: "USER_NOT_FOUND",
          message: `The user is Blank!`,
        });
        return null;
      }
    },
    // the function that will handle this request
    handler: async (request, reply) => {
      try {
        const result = await signInUserService(request, fastify);
        reply.status(200).send(result);
      } catch (err) {
        reply.status(500).send(err.message);
      }
    },
  });

  fastify.route({
    url: "/SignUp",
    method: ["POST"],
    // request and response schema
    schema: {
      summary: "SingUp User",
      tags: ["Auth"],
      // (or query) validates the querystring
      description: "signIn",
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
        },
        required: ["appUserName", "appPassword", "appRoleId", "appName"],
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          description: "Returns User model",
          type: "object",
          properties: {
            success: {
              type: "boolean",
            },
            message: {
              type: "string",
            },
          },
        },
        500: {
          description: "User not found",
          type: "object",
          properties: {
            success: {
              type: "boolean",
            },
            message: {
              type: "string",
            },
          },
        },
        409: {
          description: "User not found",
          type: "object",
          properties: {
            success: {
              type: "boolean",
            },
            message: {
              type: "string",
            },
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
        const result = await signUpUserService(request, reply, fastify);
        reply.status(200).send(result);
      } catch (err) {
        reply.status(500).send(err.message);
      }
    },
  });
};
