const express = require("express");
const issueRouter = express.Router();
const Issue = require("../models/Issue.js");

// Constants for HTTP status codes
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (!req.auth) {
    return res.status(HTTP_UNAUTHORIZED).json({ message: "Unauthorized" });
  }
  next();
};

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
issueRouter.get("/user", isAuthenticated, async (req, res) => {
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
issueRouter.post("/", isAuthenticated, async (req, res) => {
  try {
    req.body.user = req.auth._id;
    const newIssue = new Issue(req.body);
    const savedIssue = await newIssue.save();
    res.status(HTTP_CREATED).json(savedIssue);
  } catch (err) {
    res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .json({ message: "Error saving new issue", error: err });
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
issueRouter.put("/upvote/:issueId", isAuthenticated, async (req, res) => {
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
issueRouter.put("/downvote/:issueId", isAuthenticated, async (req, res) => {
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
