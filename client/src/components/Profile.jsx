/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { IssuesContext } from "../context/IssueProvider";
import ppic from '../assets/ppic.png'
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
    <div>
      <h1>Profile</h1>
      <div>
        <h2>User Information</h2>
        <div>
          <p>Name: Daenerys Targaryen</p>
          <img
            src={ppic}
            alt="Profile"
            style={{ width: 100, height: 100, borderRadius: "50%" }}
          />
        </div>
      </div>
      <div>
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
      <button onClick={handleUpdateName}>Update Name</button>
    </div>
  );
}
