const express = require("express");
const issueRouter = express.Router();
const Issue = require("../models/Issue.js");
const { expressjwt } = require("express-jwt");
require("dotenv").config();
// Constants for HTTP status codes
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;

// Get all issues
issueRouter.get("/", async (req, res) => {
  try {
    const issues = await Issue.find({});
    res.status(HTTP_OK).json(issues);
  } catch (err) {
    res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching issues", error: err });
  }
});

// Get issues by user id
issueRouter.get("/user", async (req, res) => {
  try {
    const issues = await Issue.find({ user: req.auth._id });
    res.status(HTTP_OK).json(issues);
  } catch (err) {
    res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: "Error fetching user issues", error: err });
  }
});


// Add new Issue
issueRouter.post("/",expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }), async (req, res, next) => {
  try {
    req.body.user = req.auth._id;
    const newIssue = new Issue(req.body);
    const savedIssue = await newIssue.save();
    const populatedIssue = await savedIssue.populate('user', 'username profileImage');
    res.status(201).send(populatedIssue);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

// Delete Issue
issueRouter.delete("/:issueId", async (req, res) => {
  try {
    const deletedIssue = await Issue.findOneAndDelete({
      _id: req.params.issueId,
    });
    if (!deletedIssue) {
      res.status(HTTP_NOT_FOUND).json({ message: "Issue not found" });
    } else {
      res
        .status(HTTP_OK)
        .json({ message: `Successfully deleted issue: ${deletedIssue.title}` });
    }
  } catch (err) {
    res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: "Error deleting issue", error: err });
  }
});

// Upvote an issue
issueRouter.put("/upvote/:issueId",  async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.issueId,
      {
        $addToSet: { upvotedBy: req.auth._id },
        $pull: { downvotedBy: req.auth._id },
      },
      { new: true }
    );
    if (!updatedIssue) {
      res.status(HTTP_NOT_FOUND).json({ message: "Issue not found" });
    } else {
      res.status(HTTP_OK).json(updatedIssue);
    }
  } catch (err) {
    res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: "Error upvoting issue", error: err });
  }
});

// Downvote an issue
issueRouter.put("/downvote/:issueId", async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.issueId,
      {
        $addToSet: { downvotedBy: req.auth._id },
        $pull: { upvotedBy: req.auth._id },
      },
      { new: true }
    );
    if (!updatedIssue) {
      res.status(HTTP_NOT_FOUND).json({ message: "Issue not found" });
    } else {
      res.status(HTTP_OK).json(updatedIssue);
    }
  } catch (err) {
    res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: "Error downvoting issue", error: err });
  }
});

// Error handling middleware should be at the end
issueRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(HTTP_INTERNAL_SERVER_ERROR)
    .json({ message: "Something broke!", error: err });
});

module.exports = issueRouter;
