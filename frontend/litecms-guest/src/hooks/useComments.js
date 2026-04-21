import { getComments } from "../services/commentApi"

export function useComments(contentId) {
    const [comments, setComments] = useState([]);
    const [commentsAreLoading, setCommentsAreLoading] = useState(false);
    const [commentsLoadError, setCommentsLoadError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            setCommentsAreLoading(true);
            try {
                const data = await getComments(contentId);
                setComments(data);
                
                setCommentsLoadError(null);
            } catch (er) {
                setCommentsLoadError(er);
            } finally {
                setCommentsAreLoading(false);
            }
        };

        fetchComments();
    }, [contentId]);

    return { comments, commentsAreLoading, commentsLoadError };
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