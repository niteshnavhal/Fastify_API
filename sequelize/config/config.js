module.exports = () => {
  let posrgreSqlDatabase;
  if (process.env.DB == "production") {
  } else {
    posrgreSqlDatabase = {
      username: "admin",
      password: "1Qb4NkNWFSZnLySkPCATB1TeAMNYsa",
      database: "postgres",
      host: "us-west1.ad283f5d-7f98-4886-ab74-50c0e4757bda.gcp.ybdb.io",
      port: 5433,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // This is for testing purposes, consider setting it properly
        },
      },
    };
  }
  return posrgreSqlDatabase;
};
