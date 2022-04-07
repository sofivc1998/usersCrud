module.exports = (req, res, next) => {
    if (req.session && req.session.user) {
      return req.session.user.isAdmin ? next() : res.redirect("/");
    } else {
      res.redirect("/");
    }
  };