
const express = require("express");
const commentsRouter = express.Router();
const Comment = require("../models/Comments");

// Helper function to send an error response
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
    const { user, comment } = req.body;
    if (!user || !comment) {
      return res
        .status(400)
        .send({ message: "Missing required fields: user and comment" });
    }
    const newComment = new Comment({
      user,
      comment,
      issue: req.params.issueId,
    });
    await newComment.save();
    res.status(201).send(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});


module.exports = commentsRouter; // Adjusted for CommonJS
