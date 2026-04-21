import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { LoadingSpinner } from "../components/shortcodes/LoadingSpinner";
import PostSingle from "../components/layouts/PostSingle";

import { useContentById } from "../hooks/useContent";
import { useContentLike } from "../hooks/useUserEngagement"
import { useComments, useSubmitComment } from "../hooks/useComments";
import { useSearchRelatedContent } from "../hooks/useSearch";
import { isContentLiked, addLikedContent, removeLikedContent } from "../utils/localStorageUtils";

export const ContentDetailPage = () => {
  const { id } = useParams();

  const { content, isLoading, loadError } = useContentById(id);
  const { comments, commentsAreLoading, commentsLoadError } = useComments(content?.contentId);
  const { relatedContent, relatedContentLoading, relatedContentLoadError } = useSearchRelatedContent(content?.contentId);

  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentFormData, setCommentFormData] = useState({
    guestName: "",
    commentText: "",
  });

  const { handleLike, handleUnlike, likeButtonIsLoading, likeButtonLoadError } = useContentLike();  
  const {
    handleSubmitComment,
    submitCommentIsLoading,
    submitCommentLoadError,
  } = useSubmitComment();

  useEffect(() => {
    document.title = content?.title || "LiteCMS";
  }, [content]);

  useEffect(() => {
    if (!content) return;

    setLikeCount(content.likeCount || 0);
    setLiked(isContentLiked(content.contentId));
  }, [content]);

  useEffect(() => {
    setComments(fetchedComments || []);
  }, [fetchedComments]);

  const onLikeClick = async () => {
    if (!content?.contentId) return;

    try {
      if (liked) {
        await handleUnlike(content.contentId);
        removeLikedContent(content.contentId);
        setLiked(false);
        setLikeCount((prev) => Math.max(prev - 1, 0));
      } else {
        await handleLike(content.contentId);
        addLikedContent(content.contentId);
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Like/unlike failed:", error);
    }
  };

  const onSubmitComment = async (e) => {
    e.preventDefault();

    const payload = {
      guestName: commentFormData.guestName,
      commentText: commentFormData.commentText,
    };

    try {
      const newComment = await handleSubmitComment(payload, content.contentId);
      setComments((prev) => [newComment, ...prev]);
      setCommentFormData({
        guestName: "",
        commentText: "",
      })
    } catch (error) {
      console.error("Comment submission failed:", error);
    }
  };

  if(isLoading) return <LoadingSpinner />;

  if(loadError) return <p>Failed to load content.</p>;

  if (!content) return <Navigate to="/404" replace />;

  return (
    <PostSingle 
      content={content}
      liked={liked}
      likeCount={likeCount}
      onLikeClick={onLikeClick}
      likeButtonIsLoading={likeButtonIsLoading}
      comments={comments}
      commentsAreLoading={commentsAreLoading}
      commentsLoadError={commentsLoadError}
      commentFormData={commentFormData}
      setCommentFormData={setCommentFormData}
      onSubmitComment={onSubmitComment}
      relatedContent={relatedContent}
    />
  )
}