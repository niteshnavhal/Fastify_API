const jwt = require("jsonwebtoken");
// Middleware to check authentication using JWT
module.exports = () => {
  const authenticateJWT = async (request, reply) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      reply
        .status(401)
        .send({ error: "Unauthorized: No valid Bearer token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, "your_secret_key");
      console.log(decoded);
      request.user = { userId: decoded.userId };
    } catch (err) {
      reply.status(401).send({ error: "Unauthorized: Invalid token" });
    }
  };
  return authenticateJWT;
};
