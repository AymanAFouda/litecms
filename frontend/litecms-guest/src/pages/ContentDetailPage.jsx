import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import PostSingle from "../components/layouts/PostSingle";

import { useContentById } from "../hooks/useContent";
import { LoadingSpinner } from "../components/shortcodes/LoadingSpinner";


export const ContentDetailPage = () => {
  const { id } = useParams();

  useEffect(() => {
    document.title = "LiteCMS";

    if (content) {
      document.title = content.title || "LiteCMS";
      setLikeCount(content.likeCount || 0);
      setComments(content.comments || []);
    }
  }, [content]);

  const { content, isLoading, loadError } = useContentById(id)
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(content.likeCount || 0);
  const [comments, setComments] = useState([]);
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

  const onLikeClick = async () => {
    try {
      if (liked) {
        await handleUnlike(content.id);
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await handleLike(content.id);
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
      const newComment = await handleSubmitComment(payload, content.id);
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

  if (!content) return <Navigate to="*" replace />;

  return (
    <PostSingle 
      content={content}
      //relatedContent={}
      liked={liked}
      likeCount={likeCount}
      onLikeClick={onLikeClick}
      likeButtonIsLoading={likeButtonIsLoading}
      comments={comments}
      commentFormData={commentFormData}
      setCommentFormData={setCommentFormData}
      onSubmitComment={onSubmitComment}
    />
  )
}