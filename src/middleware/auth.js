const JWT = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    // const token = req.;
    // const token = authToken && authToken.split(" ")[1];

    console.log(token);
    if (!token)
      return res
        .status(400)
        .send({ status: false, message: "You are not loggedIn Token" });

    if (token) {
      JWT.verify(token, process.env.JWTA, (err, tokenDetails) => {
        if (err) {
          return res.status(403).send({ status: false, message: err.message });
        }
        req.tokenDetails = tokenDetails;
        next();
      });
    } else {
      return res
        .status(401)
        .send({ status: false, msg: "you are not authenticated" });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
    console.log("error in verifyToken", error.message);
  }
};

module.exports = { verifyToken };
