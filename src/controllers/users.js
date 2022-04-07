const validator = require("express-validator");
const bcrypt = require("bcrypt");
const user = require("../models/user");
module.exports = {
  index: (req, res) => {
    res.send(user.all());
  },
  login: (req, res) => res.render("users/login"),
  register: (req, res) => res.render("users/register"),
  profile: (req, res) => res.render("users/profile"),
  access: (req, res) => {
    let errors = validator.validationResult(req);
    // Here we store the errors in a variable

    if (!errors.isEmpty()) {
      return res.render("users/register", {
        errors: errors.mapped(),
      });
    }
    let exist = user.search("email", req.body.email);
    if (!exist) {
      return res.render("users/login", {
        errors: {
          email: {
            msg: "Email is not registered",
          },
        },
      });
    }
    if (!bcrypt.compareSync(req.body.password, exist.password)) {
      return res.render("users/login", {
        errors: {
          password: {
            msg: "Password is not valid",
          },
        },
      });
    }
    if (req.body.remember) {
      res.cookie("email", req.body.email, { maxAge: 1000 * 60 * 60 * 24 * 30 });
      // This cookie expires in 1 month --> Every cookie is calculated in milliseconds
    }
    req.session.user = exist;
    return res.redirect("/");
    // This is to verify that there is a user in session
  },
  save: (req, res) => {
    let errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("users/register", {
        errors: errors.mapped(),
      });
    }
    let exist = user.search("email", req.body.email);
    if (exist) {
      return res.render("users/register", {
        errors: {
          email: {
            msg: "Email is registered",
          },
        },
      });
    }

    let userRegistered = user.create(req.body);
    return res.send({
      errors: errors,
      data: req.body,
      user: userRegistered,
      msg: "LLego del register",
    });
  },
  logout: (req, res) => {
    delete req.session.user;
    res.cookie("email", null, { maxAge: -1 });
    return res.redirect("/");
  },
};