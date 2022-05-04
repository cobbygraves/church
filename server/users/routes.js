const express = require("express");
const getUser = require("./controllers");
// import Multer from '../Middlewares/MulterConfiguration.js';

const userRouter = express.Router();

userRouter.post("/user/login", getUser);

module.exports = userRouter;
