
const express = require("express");
const commentsRouter = express.Router();
const sendErrorResponse = (res, err) => {
  console.error(err);
  res.status(500).send({ message: "An error occurred", error: err.message });
};

commentsRouter.get("/", async (req, res) => {
  try {
    const comments = await Comment.find({});
    res.status(200).send(comments);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

commentsRouter.get("/:issueId", async (req, res) => {
  try {
    const comments = await Comment.find({ issue: req.params.issueId });
    res.status(200).send(comments);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

commentsRouter.post("/:issueId", async (req, res) => {
  try {
    if (!req.body.text) {
      return res.status(400).send({ message: "Missing comment text" });
    }
    const commentData = { ...req.body, issue: req.params.issueId };
    const newComment = new Comment(commentData);
    const savedComment = await newComment.save();
    res.status(201).send(savedComment);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

module.exports = commentsRouter; // Adjusted for CommonJS
