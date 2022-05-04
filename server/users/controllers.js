const UserModel = require("./model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const getUser = async (req, res, next) => {
  const user = req.body;

  let existingUser;
  try {
    existingUser = await UserModel.findOne({
      username: user.username,
    });
  } catch (error) {
    return next(createError(400, error));
  }

  if (existingUser) {
    bcrypt
      .compare(user.password, existingUser.password)
      .then((resp) => {
        if (resp) {
          const token = jwt.sign(
            {
              id: existingUser.id,
              username: existingUser.username,
              status: existingUser.status,
            },
            "C0DESCRIPT",
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            id: existingUser.id,
            username: existingUser.username,
            status: existingUser.status,
            token: token,
          });
        } else {
          return res.status(401).send(null);
        }
      })
      .catch((err) => console.log(err));
  }
};

module.exports = getUser;
