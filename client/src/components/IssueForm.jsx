/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { IssuesContext } from "../context/IssueProvider";

// Function component for creating and submitting issues
export default function IssueForm() {
  const { addIssue } = useContext(IssuesContext);
  const initInputs = {
    title: "",
    description: "",
    imgUrl: "",
  };

  const [inputs, setInputs] = useState(initInputs);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addIssue(inputs);
    setInputs(initInputs);
  }

  const { title, description, imgUrl } = inputs;
  return (
    <form className="issue-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        type="text"
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={handleChange}
        placeholder="Image Url"
      />
      <button>
        <i className="fa-solid fa-plus"></i>
      </button>
    </form>
  );
}
