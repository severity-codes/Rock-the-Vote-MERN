/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import user from './UserProvider';

export const CommentContext = React.createContext();

// It's assumed user.Axios is a mistake and should be userAxios
const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function CommentProvider({ children }) {
  const initState = {
    comments: [],
    errMsg: "",
  };

  const [commentState, setCommentState] = useState(initState);

  const addComment = async (issueId, newComment) => {
    try {
      const res = await userAxios.post(`/api/comment/${issueId}`, newComment);
      setCommentState((prevState) => ({
        ...prevState,
        comments: [...prevState.comments, res.data],
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const getComments = async (issueId) => {
    try {
      const response = await userAxios.get(`/api/comment/${issueId}`);
      setCommentState((prevState) => ({
        ...prevState,
        comments: response.data,
      }));
    } catch (err) {
      console.error(err.response.data.errMsg);
    }
  };

  const editComment = async (issueId, commentId, updatedComment) => {
    try {
      const res = await userAxios.put(`/api/comment/${issueId}/${commentId}`, updatedComment);
      setCommentState((prevState) => ({
        ...prevState,
        comments: prevState.comments.map((comment) =>
          comment._id === commentId ? res.data : comment
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteComment = async (issueId, commentId) => {
    try {
      await userAxios.delete(`/api/comment/${issueId}/${commentId}`);
      setCommentState((prevState) => ({
        ...prevState,
        comments: prevState.comments.filter((comment) => comment._id !== commentId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const resetCommentErr = () => {
    setCommentState((prevState) => ({
      ...prevState,
      errMsg: "",
    }));
  };

  const setCommentErr = (errMsg) => {
    setCommentState((prevState) => ({
      ...prevState,
      errMsg,
    }));
  };

  return (
    <CommentContext.Provider
      value={{
        ...commentState,
        addComment,
        getComments,
        editComment,
        deleteComment,
        resetCommentErr,
        setCommentErr,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}