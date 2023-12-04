const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const { authenticateJWT } = require("../middelWare/index");

async function signInUserService(request, fastify) {
  try {
    const { userName, password } = request.body;
    const user = await fastify.db.query(
      `WITH user_data AS (
      SELECT
        "appUserId", "appUserType", "appRoleId", "appUserName",
        "appIsSuperAdmin",  "appAllowMultipleLogin", "appSubAdminId" ,"appUserIp"
      FROM "tblUsers" WHERE "appUserName"= $1 AND "appPassword"= $2 AND "appIsActive" = true
    )
	
	select * from user_data`,
      {
        type: QueryTypes.SELECT,
        bind: [request.body.userName, request.body.password], // Bind parameters to prevent SQL injection
      }
    );
    //* if no user exists or password incorrect
    if (!user) {
      throw new Error("incorrect undername and password");
    }

    const tokenPayload = {
      appUserId: user.WrUserId,
      appUserType: user.WrUserType,
      appRoleId: user.WrRoleId,
      appUserName: user.WrUserName,
      appIsSuperAdmin: user.WrIsSuperAdmin,
      WrAllowMultipleLogin: user.WrAllowMultipleLogin,
    };console.log(tokenPayload)

    
    //* token created
    const options = {
      expiresIn: process.env.TOKEN_EXPIRY_TIME,
    };
    // Generate a JWT token
    const token = jwt.sign(tokenPayload, process.env.SECRET_KEY_TOKEN, options);
    return { token };
  } catch (err) {
    console.log("Error Msg " + err.message);
    return false;
  }
}
async function signUpUserService(request, reply, fastify) {
  try {
    // Check if the user already exists
    const {
      appUserName,
      appPassword,
      appRoleId,
      appName,
      appUserType,
      appMobile,
      appIsActive,
      appIsSuperAdmin,
    } = request.body;
    console.log("User Name " + appUserName);
    const existingUser = await fastify.db.query(
      'SELECT * FROM "tblUsers" WHERE "appUserName" = $1',
      {
        type: QueryTypes.SELECT,
        bind: [appUserName],
      }
    );
    console.log(existingUser);
    if (existingUser.length > 0) {
      reply.status(409).send({
        success: false,
        message: "User with this username already exists",
      });
    } else {
      // Insert the new user
      const result = await fastify.db.query(
        `
        INSERT INTO "tblUsers" (
          "appUserName", "appPassword", "appRoleId", "appName", "appUserType", "appMobile", "appIsActive", "appIsSuperAdmin","appIsDelete"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,false)
      `,
        {
          type: QueryTypes.RAW,
          bind: [
            appUserName,
            appPassword,
            appRoleId,
            appName,
            appUserType,
            appMobile,
            appIsActive,
            appIsSuperAdmin,
          ],
        }
      );

      reply
        .status(200)
        .send({ success: true, message: "User inserted successfully" });
    }
  } catch (error) {
    console.error("Error inserting user:", error);
    reply
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}
async function DeleteUserService(request, reply, fastify) {
  try {
    // Check if the user already exists
    const { appUserId } = request.body;
    console.log("User Name " + appUserId);
    // Delete the new user
    const result = await fastify.db.query(
      `DELETE FROM  "tblUsers" WHERE "appUserId" = $1`,
      {
        type: QueryTypes.DELETE,
        bind: [appUserId],
      }
    );

    reply
      .status(200)
      .send({ success: true, message: "User Deleted successfully" });
  } catch (error) {
    console.error("Error inserting user:", error);
    reply
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}
async function GetAllUserService(request, reply, fastify) {
  try {
    // Delete the new user
    const result = await fastify.db.query(
      `WITH user_data AS (SELECT * FROM  "tblUsers" WHERE "appIsActive" = true AND "appIsDelete" = false)
	
      select * from user_data`,
      {
        type: QueryTypes.Select,
      }
    );

    return {result};
  } catch (error) {
    console.error("Error inserting user:", error);
    reply
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}
async function SingleUserService(request, reply, fastify) {
  try {
    // Check if the user already exists
    const { appUserId } = request.body;
    // Delete the new user
    const result = await fastify.db.query(
      `WITH user_data AS (SELECT * FROM  "tblUsers" WHERE "appIsActive" = true AND "appIsDelete" = false AND "appUserId" = $1)
	
      select * from user_data`,
      {
        type: QueryTypes.Select,
        bind: [appUserId],
      }
    );

    return {result};
  } catch (error) {
    console.error("Error inserting user:", error);
    reply
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}
async function UpdateUserService(request, reply, fastify) {
  try {
    // Check if the user already exists
    const {
      appUserName,
      appPassword,
      appRoleId,
      appName,
      appUserType,
      appMobile,
      appIsActive,
      appIsSuperAdmin,
      appUserId,
    } = request.body;
    // Insert the new user
    const result = await fastify.db.query(
      `
        UPDATE public."tblUsers"
        SET 
          "appUserName" = $1,
          "appPassword" = $2,
          "appRoleId" = $3,
          "appName" = $4,
          "appUserType" = $5,
          "appMobile" = $6,
          "appIsActive" = $7,
          "appIsSuperAdmin" = $8
        WHERE "appUserId" = $9
      `,
      {
        type: QueryTypes.RAW,
        bind: [
          appUserName,
          appPassword,
          appRoleId,
          appName,
          appUserType,
          appMobile,
          appIsActive,
          appIsSuperAdmin,
          appUserId,
        ],
      }
    );

    reply
      .status(200)
      .send({ success: true, message: "User Updated successfully" });
  } catch (error) {
    console.error("Error inserting user:", error);
    reply
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}
//Blogs
async function InsertBlogService(request, reply, fastify) {
  try {
    //s
    const {
      appTitle,
      appHeaderContent,
      appMainContent,
      appUserID,
      appBlogTypeID,
      appLanguage,
      appFrameworks,
      appTags,
      appCodeSnippets1,
      appCodeSnippets2,
      appCodeSnippets3,
      appCodeSnippets4,
      appViewsCount,
      appLikesCount,
      CommentsCount,
      appIsPublished,
      appFeaturedImageURL,
      appEstimatedReadingTime,
      appExternalResources,
      // Add other properties
    } = request.body;
    // Insert the new Blog
    const result = await fastify.db.query(
      ` INSERT INTO public."tblBlogs" (
        "appTitle", "appHeaderContent", "appMainContent", "appUserID", "appBlogTypeID", "appLanguage",
        "appFrameworks", "appTags", "appCodeSnippets1", "appCodeSnippets2", "appCodeSnippets3", "appCodeSnippets4",
        "appViewsCount", "appLikesCount", "CommentsCount", "appIsPublished", "appFeaturedImageURL",
        "appEstimatedReadingTime", "appExternalResources"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`,
      {
        type: QueryTypes.RAW,
        bind: [
          appTitle,
          appHeaderContent,
          appMainContent,
          appUserID,
          appBlogTypeID,
          appLanguage,
          appFrameworks,
          appTags,
          appCodeSnippets1,
          appCodeSnippets2,
          appCodeSnippets3,
          appCodeSnippets4,
          appViewsCount,
          appLikesCount,
          CommentsCount,
          appIsPublished,
          appFeaturedImageURL,
          appEstimatedReadingTime,
          appExternalResources,
        ],
      }
    );

    reply
      .status(200)
      .send({ success: true, message: "Blog Insreted successfully" });
  } catch (error) {
    console.error("Error inserting user:", error);
    reply
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}
async function UpdateBlogService(request, reply, fastify) {
  try {
    //s
    const {
      appTitle,
      appHeaderContent,
      appMainContent,
      appUserID,
      appBlogTypeID,
      appLanguage,
      appFrameworks,
      appTags,
      appCodeSnippets1,
      appCodeSnippets2,
      appCodeSnippets3,
      appCodeSnippets4,
      appViewsCount,
      appLikesCount,
      CommentsCount,
      appIsPublished,
      appFeaturedImageURL,
      appEstimatedReadingTime,
      appExternalResources,
      appBlogID,
      // Add other properties
    } = request.body;

    // Insert the new Blog
    const result = await fastify.db.query(
      `  UPDATE public."tblBlogs"
      SET 
        "appTitle" = $1,
        "appHeaderContent" = $2,
        "appMainContent" = $3,
        "appUserID" = $4,
        "appBlogTypeID" = $5,
        "appLanguage" = $6,
        "appFrameworks" = $7,
        "appTags" = $8,
        "appCodeSnippets1" = $9,
        "appCodeSnippets2" = $10,
        "appCodeSnippets3" = $11,
        "appCodeSnippets4" = $12,
        "appViewsCount" = $13,
        "appLikesCount" = $14,
        "CommentsCount" = $15,
        "appIsPublished" = $16,
        "appFeaturedImageURL" = $17,
        "appEstimatedReadingTime" = $18,
        "appExternalResources" = $19
      WHERE "appBlogID" = $20`,
      {
        type: QueryTypes.RAW,
        bind: [
          appTitle,
          appHeaderContent,
          appMainContent,
          appUserID,
          appBlogTypeID,
          appLanguage,
          appFrameworks,
          appTags,
          appCodeSnippets1,
          appCodeSnippets2,
          appCodeSnippets3,
          appCodeSnippets4,
          appViewsCount,
          appLikesCount,
          CommentsCount,
          appIsPublished,
          appFeaturedImageURL,
          appEstimatedReadingTime,
          appExternalResources,
          appBlogID,
        ],
      }
    );

    reply
      .status(200)
      .send({ success: true, message: "Blog Updated successfully" });
  } catch (error) {
    console.error("Error inserting user:", error);
    reply
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}
async function DeleteBlogService(request, reply, fastify) {
  try {
    // Check if the user already exists
    const { appBlogID } = request.body;
    // Delete the new user
    const result = await fastify.db.query(
      ` DELETE FROM public."tblBlogs"
      WHERE "appBlogID" = $1`,
      {
        type: QueryTypes.DELETE,
        bind: [appBlogID],
      }
    );

    reply
      .status(200)
      .send({ success: true, message: "Blog Deleted successfully" });
  } catch (error) {
    console.error("Error inserting user:", error);
    reply
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}
async function SingleBlogsService(request, reply, fastify) {
  try {
    // Check if the user already exists
    const { appBlogID } = request.body;

    
    // Delete the new user
    const result = await fastify.db.query(
      `WITH blog_data AS (SELECT * FROM "tblBlogs"
      WHERE "appBlogID" = $1)
	
      select * from blog_data`,
      {
        type: QueryTypes.Select,
        bind: [appBlogID],
      }
    );
   return result[0];
  } catch (error) {
    console.error("Error inserting user:", error);
    reply
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}
async function GetAllBlogsService(request, reply, fastify) {
  try {
    const result = await fastify.db.query(
      `WITH blog_data AS (SELECT * FROM "tblBlogs")
	
      select * from blog_data`,
      {
        type: QueryTypes.Select,
      }
    );

    return result[0];
  } catch (error) {
    console.error("Error inserting user:", error);
    reply
      .status(500)
      .send({ success: false, message: "Internal Server Error" });
  }
}
//Auth
async function authorize(request, reply) {
  try {
    await authenticateJWT(request, reply);
  } catch (err) {
    reply.status(401).send(err.message, "INVALID_TOKEN");
  }
}
module.exports = {
  signInUserService,
  signUpUserService,
  DeleteUserService,
  GetAllUserService,
  UpdateUserService,
  SingleUserService,
  InsertBlogService,
  UpdateBlogService,
  DeleteBlogService,
  SingleBlogsService,
  GetAllBlogsService,
  authorize,
};
