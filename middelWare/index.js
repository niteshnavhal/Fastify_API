const jwt = require("jsonwebtoken");
// Middleware to check authentication using JWT

async function authenticateJWT(request, reply) {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    reply
      .status(401)
      .send({ error: "Unauthorized: No valid Bearer token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    console.log(decoded);
    request.user = { userId: decoded.appUserId };
  } catch (err) {
    reply.status(401).send({ error: "Unauthorized: Invalid token" });
  }
}
module.exports = { authenticateJWT };
