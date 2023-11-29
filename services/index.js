const jwt = require("jsonwebtoken");
const auth = require("../middelWare/index");

async function signInUserService(request, reply, fastify) {
  try {
    console.log("in side services");

    console.log(request.params);
    const result = () => {
      if (request.params.password == "123456") return true;
    };
    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });
    return { token };
  } catch (err) {
    reply.status(500).send(error(err.message, ERROR_CODES.SERVER_ERROR, 500));
  }
}

module.exports = {
  signInUserService,
};
