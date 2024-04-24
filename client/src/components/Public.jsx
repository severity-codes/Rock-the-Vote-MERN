import React, { useContext } from "react";
import PublicIssues from './PublicIssues'
import { IssuesContext } from "../context/IssueProvider";


export default function Public() {
  const { publicIssues } = useContext(IssuesContext);

  return (
    <div className="public">
      <PublicIssues publicIssues={publicIssues} />
    </div>
  );
}
