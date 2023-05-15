const { signup, login } = require("../controller/userController");
// const { db } = require("../database/db");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
