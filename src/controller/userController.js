const { db } = require("../database/db");
require("dotenv").config();
const bcrypt = require("bcryptjs");
let JWT = require("jsonwebtoken");
const signup = async (req, res) => {
  try {
    const data = req.body;
    const { username, email, password } = data;

    const bcryptPass = await bcrypt.hash(password, 10);
    const emailQ = "SELECT * FROM users WHERE email = ?";
    const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    const usernameQ = "SELECT * FROM users WHERE username = ?";
    const createUserQ =
      "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
    const values = [username, email, bcryptPass];

    db.query(usernameQ, username, (err, result) => {
      if (err) return res.status(400).json({ message: err.message });
      if (result.length)
        return res
          .status(409)
          .json("username allready exist,try different username");

      db.query(emailQ, email, (err, result) => {
        if (err) return res.status(400).json({ message: err.message });
        if (result.length)
          return res
            .status(409)
            .json("email allready exist, try different email");

        db.query(createUserQ, [values], (err, result) => {
          if (err) return res.status(400).json({ message: err.message });

          return res.status(201).json("User Regisration Successfull");
        });
      });
    });
  } catch (error) {
    console.log(error.message, "error in signup");
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;
    const emailQ = "SELECT * FROM users WHERE email = ?";
    db.query(emailQ, email, async (err, result) => {
      if (err) return res.status(400).json({ message: err.message });

      if (result.length === 0)
        return res.status(404).json({ message: "user not found" });
      let userPassword = result[0].password;
      let userId = result[0].id;
      let username = result[0].username;
      console.log(result);
      const originalPassword = await bcrypt.compare(password, userPassword);
      if (!originalPassword)
        return res.status(401).json({
          message: "Incorrect password, plz provide valid password",
        });

      const token = JWT.sign(
        { userId: userId, username: username },
        process.env.JWTA,
        {
          expiresIn: 86400,
        }
      );

      return res
        .status(200)
        .json({ data: result, token: token, message: "login success" });
    });
  } catch (error) {
    console.log(error.message, "error in login");
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login };
