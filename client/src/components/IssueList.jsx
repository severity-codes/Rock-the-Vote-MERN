/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import Issue from "./Issue";
import Comments from "../components/Comment";
import CommentForm from "./CommentsForm";
import { CommentContext } from "../context/CommentProvider";
import { IssuesContext } from "../context/IssueProvider";
import { UserContext } from "../context/UserProvider";

const Issues = ({ userId }) => {
  const { issues, getIssues, addIssue } = useContext(IssuesContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await getIssues(userId);
      setLoading(false);
    };
    fetchData();
  }, [userId]);

  const handleAddIssue = async (newIssue) => {
    await addIssue(newIssue);
    // After adding the issue, fetch the updated list of issues
    await getIssues(userId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="issue-list">
      {issues.map((issue) => (
        <Issue key={issue._id} {...issue} />
      ))}
      {/* Render the IssueForm component for adding new issues */}
      <IssueForm onAddIssue={handleAddIssue} />
    </div>
  );
};

export default Issues;