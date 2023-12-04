"use strict";
const {
  InsertBlogService,
  UpdateBlogService,
  DeleteBlogService,
  SingleBlogsService,
  GetAllBlogsService,
  authorize,
} = require("../../services");
module.exports = async function (fastify, opts) {
  fastify.route({
    url: "/:Id",
    method: ["POST"],
    // request and response schema
    schema: {
      summary: "Get Single Blogs's Data",
      description: "Returns a given Blogs's data",
      tags: ["Blog"],
      // (or query) validates the querystring
      body: {
        type: "object",
        properties: {
          appBlogID: {
            type: "number",
          },
        },
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
    },
    // called just before the request handler
    // the function that will handle this request
    handler: async (request, reply) => {
      try {
        const result = await SingleBlogsService(request, reply, fastify);
        reply.status(200).send(result);
      } catch (err) {
        reply.status(500).send(err.message);
      }
    },
  });
  fastify.route({
    url: "/:Id",
    method: ["DELETE"],
    // request and response schema
    schema: {
      summary: "Get Blogs's Data",
      description: "Returns a given Blogs's data",
      tags: ["Blog"],
      // (or query) validates the querystring
      body: {
        type: "object",
        properties: {
          appBlogID: { type: "number", description: "a appBlogID " },
        },
        required: ["appBlogID"],
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          description: "Returns User model",
          type: "object",
          properties: {
            code: {
              type: "boolean",
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
              type: "boolean",
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
            code: { type: "boolean" },
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
        const result = await DeleteBlogService(request, reply, fastify);
        reply.status(200).send(result);
      } catch (err) {
        reply.status(500).send(err.message);
      }
    },
  });
  fastify.route({
    url: "/update",
    method: ["PUT"],
    // request and response schema
    schema: {
      summary: "Update Blogs's Data",
      description: "Update blog information by ID",
      tags: ["Blog"],
      // (or query) validates the querystring
      body: {
        type: "object",
        properties: {
          appTitle: { type: "string" },
          appHeaderContent: { type: "string" },
          appMainContent: { type: "string" },
          appUserID: { type: "integer" },
          appBlogTypeID: { type: "integer" },
          appLanguage: { type: "string" },
          appFrameworks: { type: "string" },
          appTags: { type: "string" },
          appCodeSnippets1: { type: "string" },
          appCodeSnippets2: { type: "string" },
          appCodeSnippets3: { type: "string" },
          appCodeSnippets4: { type: "string" },
          appViewsCount: { type: "integer" },
          appLikesCount: { type: "integer" },
          CommentsCount: { type: "integer" },
          appIsPublished: { type: "boolean" },
          appFeaturedImageURL: { type: "string" },
          appEstimatedReadingTime: { type: "string" },
          appExternalResources: { type: "string" },
          appBlogID: { type: "number", description: "a appBlogID " },
        },
        required: ["appBlogID"],
      },
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        200: {
          description: "Returns User model",
          type: "object",
          properties: {
            code: {
              type: "boolean",
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
              type: "boolean",
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
            code: { type: "boolean" },
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
        const result = await UpdateBlogService(request, reply, fastify);
        reply.status(200).send(result);
      } catch (err) {
        reply.status(500).send(err.message);
      }
    },
  });
  fastify.route({
    url: "/add",
    method: ["POST"],
    // request and response schema
    schema: {
      summary: "Insert  Blogs's Data",
      description: "Insert blog information by ID",
      tags: ["Blog"],
      // (or query) validates the querystring
      body: {
        type: "object",
        properties: {
          appTitle: { type: "string" },
          appHeaderContent: { type: "string" },
          appMainContent: { type: "string" },
          appUserID: { type: "integer" },
          appBlogTypeID: { type: "integer" },
          appLanguage: { type: "string" },
          appFrameworks: { type: "string" },
          appTags: { type: "string" },
          appCodeSnippets1: { type: "string" },
          appCodeSnippets2: { type: "string" },
          appCodeSnippets3: { type: "string" },
          appCodeSnippets4: { type: "string" },
          appViewsCount: { type: "integer" },
          appLikesCount: { type: "integer" },
          CommentsCount: { type: "integer" },
          appIsPublished: { type: "boolean" },
          appFeaturedImageURL: { type: "string" },
          appEstimatedReadingTime: { type: "string" },
          appExternalResources: { type: "string" },
        },
        required: ['appTitle', 'appHeaderContent', 'appMainContent', 'appUserID', 'appBlogTypeID', 'appLanguage'],
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
              type: "boolean",
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
            code: { type: "boolean" },
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
        const result = await InsertBlogService(request, reply, fastify);
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
      summary: "Get All Blogs's Data",
      description: "Returns all Blogs's data",
      tags: ["Blog"],
      // (or query) validates the querystring
      // the response needs to be an object with an `hello` property of type 'string'
      response: {
        404: {
          description: "User not found",
          type: "object",
          properties: {
            code: {
              type: "boolean",
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
            code: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    // called just before the request handler
    // the function that will handle this request
    handler: async (request, reply) => {
      try {
        const result = await GetAllBlogsService(request, reply, fastify);
        reply.status(200).send(result);
      } catch (err) {
        reply.status(500).send(err.message);
      }
    },
  });
};
