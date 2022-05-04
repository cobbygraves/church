const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const userAthentication = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return next(createError("Authorization Fail", 401));
    }
    const decodedToken = jwt.verify(token, "C0DESCRIPT");
    req.userDetails = { id: decodedToken.id };
    next();
  } catch (err) {
    return next(createError("Authorization Error", 401));
  }
};

module.exports = userAthentication;
