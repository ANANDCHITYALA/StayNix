const User = require("../model/usermodel");

// Render Signup Page
module.exports.renderSignup = (req, res) => {
  res.render("authentication/signup.ejs");
};

// Signup
module.exports.signup = async (req, res, next) => {
  try {
    const { username, Email, password } = req.body;

    const newUser = new User({
      username,
      Email,
    });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }

      req.flash("success", "Welcome to StayNix!");

      res.redirect("/");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

// Render Login Page
module.exports.renderLogin = (req, res) => {
  res.render("authentication/login.ejs");
};

// Login
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");

  res.redirect("/");
};

// Logout
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.flash("success", "Logged Out Successfully.");

    res.redirect("/");
  });
};
