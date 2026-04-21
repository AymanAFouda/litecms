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