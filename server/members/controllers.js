const MemberModel = require("./model");
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
const path = require("path");
const { v4: uuidv4 } = require("uuid");

//get all members

const getMembers = (req, res, next) => {
  MemberModel.find((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      res.status(404).json({ message: "Members can't be retrieved" });
      next(err);
    }
  });
};

const getMember = (req, res, next) => {
  const id = req.params.id;
  MemberModel.findOne({ id }, (err, doc) => {
    if (!err) {
      res.json(doc);
    } else {
      res.status(404).json({ message: "Unknown update error" });
      next(err);
    }
  });
};

const getMemberWithName = (req, res, next) => {
  const memberInfo = req.body;
  MemberModel.findOne(memberInfo, (err, doc) => {
    if (!err) {
      if (doc) {
        res.json({ exist: true });
      } else {
        res.json({ exist: false });
        next(err);
      }
    } else {
      res.status(404).json({ message: "member registration error" });
      next(err);
    }
  });
};

// register a member

const postMember = (req, res, next) => {
  const {
    first,
    last,
    other,
    email,
    birth,
    telephone,
    location,
    branch,
    bacenta,
    fellowship,
    ministry,
    shepherd,
    relation,
    relationContact,
  } = req.body;
  const choosenImage = req.file;
  new MemberModel({
    id: uuidv4(),
    first,
    last,
    other,
    birth,
    email,
    telephone,
    location,
    branch,
    bacenta,
    fellowship,
    ministry,
    shepherd,
    relation,
    relationContact,
    pic: choosenImage ? choosenImage.filename : "",
  })
    .save()
    .then((result) => {
      res.status(201).json({ message: "Member created successfully" });
    })
    .catch((err) => {
      res.status(401).json({ message: "Error Saving Data To Database" });
      next(err);
    });
};

const deleteMember = (req, res, next) => {
  MemberModel.deleteOne({ id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json(err);
      next(err);
    }

    res.status(200).send("Member Deleted Successfully");
  });
};

const updateMember = (req, res, next) => {
  const choosenImage = req.file;
  if (choosenImage) {
    MemberModel.updateOne(
      { id: req.params.id },
      {
        ...req.body,
        pic: choosenImage.filename,
      },
      (err, resp) => {
        if (err) {
          res.json({ message: "Error updating a member" });
          next(err);
        } else {
          res.status(201).json({ message: "Member updated successfully" });
        }
      }
    );
  } else {
    MemberModel.updateOne(
      { id: req.params.id },
      {
        ...req.body,
      },
      (err, resp) => {
        if (err) {
          res.json({ message: "Error updating a member" });
          next(err);
        } else {
          res.status(201).json({ message: "Member updated successfully" });
        }
      }
    );
  }
};

module.exports = {
  updateMember,
  deleteMember,
  postMember,
  getMember,
  getMembers,
  getMemberWithName,
};
