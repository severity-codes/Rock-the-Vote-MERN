/* eslint-disable no-unused-vars */


import React, { useContext, useEffect, useRef } from "react";
import IssueList from "./IssueList";
import { IssuesContext } from "../context/IssueProvider";

export default function Public() {
  const getData = useRef(false);
  const {
    user: { username },
    issues,
    getIssues,
  } = useContext(IssuesContext);

  useEffect(() => {
    if (!getData.current) {
      getIssues();
      getData.current = true;
    }
  }, [getIssues]);

  return (
    <div className="public-container">
      <h1 className="title">{username} Take a look at Public Issues</h1>
      <h2 className="subtitle">Issues:</h2>
      <IssueList issues={issues} />
    </div>
  );
}