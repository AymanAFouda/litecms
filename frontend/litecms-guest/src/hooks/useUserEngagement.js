import { useState, useEffect } from "react"
import { likeContent, unlikeContent } from "../services/contentApi"
import { createComment } from "../services/commentApi";

export function useContentLike() {
  const [likeButtonIsLoading, setLikeButtonIsLoading] = useState(false);
  const [likeButtonLoadError, setLikeButtonLoadError] = useState(null);

  const handleLike = async (contentId) => {
    setLikeButtonIsLoading(true);
    setLikeButtonLoadError(null);

    try {
      return await likeContent(contentId);
    } catch (er) {
      setLikeButtonLoadError(er);
      throw er;
    } finally {
      setLikeButtonIsLoading(false);
    }
  };

  const handleUnlike = async (contentId) => {
    setLikeButtonIsLoading(true);
    setLikeButtonLoadError(null);

    try {
      return await unlikeContent(contentId);
    } catch (er) {
      setLikeButtonLoadError(er);
      throw er;
    } finally {
      setLikeButtonIsLoading(false);
    }
  };

  return { handleLike, handleUnlike, likeButtonIsLoading, likeButtonLoadError };
}

export function useSubmitComment() {
  const [createdComment, setCreatedComment] = useState(null);
  const [submitCommentIsLoading, setSubmitCommentIsLoading] = useState(false);
  const [submitCommentLoadError, setSubmitCommentLoadError] = useState(null);

  const handleSubmitComment = async (commentData, contentId) => {
    setSubmitCommentIsLoading(true);
    setSubmitCommentLoadError(null);

    try {
      const newComment = await createComment(commentData, contentId);
      setCreatedComment(newComment);
      return newComment;
    } catch (er) {
      setSubmitCommentLoadError(er);
      throw er;
    } finally {
      setSubmitCommentIsLoading(false);
    }
  };

  return {
    createdComment,
    handleSubmitComment,
    submitCommentIsLoading,
    submitCommentLoadError,
  };
}