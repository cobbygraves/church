const express = require("express");
const {
  getMembers,
  postMember,
  deleteMember,
  updateMember,
  getMember,
  getMemberWithName,
} = require("./controllers");

const memberRouter = express.Router();

memberRouter.get("/members", getMembers);
memberRouter.get("/member/:id", getMember);

const authorization = require("../middlewares/userAthentication");
const upload = require("../middlewares/upload");

memberRouter.delete("/member/:id", authorization, deleteMember);
memberRouter.patch(
  "/member/:id",
  authorization,
  upload.single("imageFile"),
  updateMember
);

memberRouter.post(
  "/member/register",
  authorization,
  upload.single("imageFile"),
  postMember
);

memberRouter.post("/member/validate", getMemberWithName);

module.exports = memberRouter;
