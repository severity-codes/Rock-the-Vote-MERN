/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { IssuesContext } from "../context/IssueProvider";
import ppic from '../assets/ppic.png'
import "./profile.css"






export default function Profile() {
  const { user, updateUser } = useContext(UserContext);
  const { issues } = useContext(IssuesContext);
  const [sortedIssues, setSortedIssues] = useState([]);

  useEffect(() => {
    // Sort issues based on the number of upvotes
    const sorted = issues.sort((a, b) => b.likes.length - a.likes.length);
    setSortedIssues(sorted);
  }, [issues]);

  function handleUpdateName() {
    const updatedName = prompt("Enter your updated name:");
    if (updatedName) {
      updateUser({ ...user, name: updatedName });
    }
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>
      <div className="user-info">
        <h2>User Information</h2>
        <div>
          <p>Name: {user.name}</p>
          <img src={ppic} alt="Profile" className="profile-image" />
        </div>
      </div>
      <div className="sorted-issues">
        <h2>Sorted Issues</h2>
        <ul>
          {sortedIssues.map((issue) => (
            <li key={issue._id}>
              <div>Title: {issue.title}</div>
              <div>Description: {issue.description}</div>
              <div>Total Votes: {issue.likes.length}</div>
            </li>
          ))}
        </ul>
      </div>
      <button className="update-name-btn" onClick={handleUpdateName}>
        Update Name
      </button>
    </div>
  );
}
