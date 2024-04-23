
import React from "react";
import { createRoot } from "react-dom/client"; // Updated import
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import UserProvider from "./context/UserProvider";
import IssuesProvider from "./context/IssueProvider";
import CommentProvider from "./context/CommentProvider";
import "./style/style.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Use the rootElement directly
root.render(
  <React.StrictMode>
    <Router>
      <CommentProvider>
        <IssuesProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </IssuesProvider>
      </CommentProvider>
    </Router>
  </React.StrictMode>
);
