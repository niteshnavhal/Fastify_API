"use strict";
const { signInUserService } = require("../services/index");

module.exports = async function (fastify, opts) {
  fastify.route({
    url: "/Login",
    method: ["POST"],
    // request and response schema
    schema: {
      summary: "Get user's Data",
      tags: ["User"],
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
      console.log("in side prehandeller");

      console.log(request.body);
      const { userName, password } = request.params;
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
        console.log("in side handeller");

        console.log(request.params);
        const result = await signInUserService(request, fastify);
        reply.status(200).send(success(result, 200));
      } catch (err) {
        reply
          .status(500)
          .send(error(err.message, ERROR_CODES.SERVER_ERROR, 500));
      }
    },
  });
};
