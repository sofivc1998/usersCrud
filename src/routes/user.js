const express = require("express");
const user = require("../controllers/user");
const router = express.Router();
const access = require("../middlewares/access");
const auth = require("../middlewares/access");
const { validate } = require("../models/user");

router.get("/", [auth], user.index);
router.get("/login", user.login);
router.get("/register", user.register);
router.get("/profile", [access], user.profile);
router.post("/", [validate], user.save);
router.post("/access", [validate], user.access);
router.post("/logout", user.logout);
module.exports = router;