"use strict";
module.exports = async function (fastify, opts) {
  fastify.route({
    url: "/user/",
    method: ["GET"],
    // request and response schema
    schema: {
      summary: "Get user's Data",
      description: "Returns a given user's data",
      tags: ["User"],
      // (or query) validates the querystring
      params: {
        type: "object",
        properties: {
          id: {
            type: "number",
            description: "a User id",
          },
        },
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          description: "Returns User model",
          type: "object",
          properties: {
            id: {
              type: "number",
              format: "uuid",
            },
            firstName: {
              type: "string",
            },
            lastName: {
              type: "string",
            },
            email: {
              type: "string",
              format: "email",
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
    preHandler: async (request, reply) => {
      if (request.headers.authorization !== process.env.APIKEY) {
        reply.code(401).send({
          code: "UNAUTHORIZED",
          message: `Wrong API key or missing`,
        });
        return null;
      }
      const { id } = request.params;
      if (id <= 0) {
        reply.code(404).send({
          code: "USER_NOT_FOUND",
          message: `The user #${id} not found!`,
        });
        return null;
      }
    },
    // the function that will handle this request
    handler: async (request, reply) => {
      return request.params;
    },
  });
};
