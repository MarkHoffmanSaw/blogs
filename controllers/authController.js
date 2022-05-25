const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { User } = require("../models");

// **********************
// Create JWT for an user
// **********************
const createJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ********************
// Send JWT to the user
// ********************
const sendJWT = (user, status, res) => {
  const token = createJWT(user.uuid);

  // Set up the cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Save the cookie
  res.cookie("jwt", token, cookieOptions);

  res.status(status).json({
    status: "success",
    statusCode: status,
    token,
    data: {
      user,
    },
  });
};

// *****************
// Signup a new user
// *****************
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const newUser = await User.create({
      name,
      email,
      password, // will be encrypted
      passwordConfirm, // will be removed
    });

    sendJWT(newUser, 201, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong..." });
  }
};

// **************************
// Login for an existing user
// **************************
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check the email and password by existing
    if (!email || !password)
      return next(new Error("Please enter the email and password!"));

    // Find an user with the email and show up the password (select: false)
    const user = await User.findOne({ where: { email } });

    // Check the password
    if (!user || !(await user.correctPassword(password, user.password)))
      return next(new Error("Not correct email or password"));

    // Create and send JWT
    sendJWT(user, 201, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong..." });
  }
};

// ****************
// Only auth. users
// ****************
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Get JWT from headers/cookies
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    // Check JWT by existing
    if (!token)
      return next(new Error("You haven't got the access. Please, log in"));

    // Verify JWT: return { id, iat, exp }
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET_KEY
    );

    // Check the user by JWT
    const currentUser = await User.findOne({ where: { uuid: decoded.id } });
    if (!currentUser) return next(new Error("Invalid token for the user"));

    // Add the user into request and go to next
    req.user = currentUser;
    res.locals.user = currentUser; // for templates
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong..." });
  }
};
