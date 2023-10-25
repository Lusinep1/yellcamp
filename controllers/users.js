const User = require("../models/user");

//register form
module.exports.renderRegister = (req, res) => {
  res.render("users/register");
};

//register a user
module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to YellCamp");
      res.redirect("/campgrounds");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/register");
  }
};

//login form
module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

//login a user/passport
module.exports.login = (req, res) => {
  req.flash("success", `Welcome back!`);
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  res.redirect(redirectUrl);
};

//logout a user
module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
};
