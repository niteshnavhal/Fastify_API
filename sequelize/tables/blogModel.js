const { DataTypes } = require("fastify-sequelize");

module.exports = (sequelize) => {
  const Blog = sequelize.define(
    "tblBlogs",
    {
      appBlogID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      appTitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      appHeaderContent: {
        type: DataTypes.TEXT,
      },
      appMainContent: {
        type: DataTypes.TEXT,
      },
      appCreationDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      appUserID: {
        type: DataTypes.INTEGER,
      },
      appBlogTypeID: {
        type: DataTypes.INTEGER,
      },
      appLanguage: {
        type: DataTypes.STRING(50),
      },
      appFrameworks: {
        type: DataTypes.STRING(255),
      },
      appTags: {
        type: DataTypes.STRING(255),
      },
      appCodeSnippets1: {
        type: DataTypes.TEXT,
      },
      appCodeSnippets2: {
        type: DataTypes.TEXT,
      },
      appCodeSnippets3: {
        type: DataTypes.TEXT,
      },
      appCodeSnippets4: {
        type: DataTypes.TEXT,
      },
      appViewsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      appLikesCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      CommentsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      appIsPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      appFeaturedImageURL: {
        type: DataTypes.STRING(255),
      },
      appEstimatedReadingTime: {
        type: DataTypes.STRING(50),
      },
      appExternalResources: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );

  return Blog;
};
