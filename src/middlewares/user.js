const userModel = require("../models/user");
const user = (req, res, next) => {
  let user = null;
  if (req.cookie && req.cookie.email) {
    user = userModel.search("email", req.cookie.email);
    req.session.user = user;
  }
  if (req.session && req.session.user) {
    user = req.session.user;
  }
  res.locals.user = user;
  return next();
  // Next allows to continue the execution of the code
};
module.exports = user;