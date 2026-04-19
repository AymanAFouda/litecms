import dateFormat from "../../utils/dateFormat";

function CommentSection({ comments, commentFormData, setCommentFormData, onSubmitComment }) {

  return (
    <section className="w-full antialiased">
        <div className="w-full max-w-4xl mx-auto container p-0 ml-0">
            <h2 className="section-title mb-2">
                {`Comments (${comments.length})`}
            </h2>

            <form className="py-6 mb-3" onSubmit={onSubmitComment}>
                <fieldset className="relative">
                    <input
                        className="form-input h-12 w-full rounded-3xl border-none bg-theme-light px-5 py-3 pr-12 text-dark placeholder:text-xs dark:bg-darkmode-theme-dark"
                        type="text"
                        placeholder="Enter your name"
                        required
                        name="guestName"
                        value={commentFormData.guestName}
                        onChange={(e) => setCommentFormData(prev => ({
                                ...prev,
                                guestName: e.target.value,
                            }))
                        }
                    />
                </fieldset>
                <fieldset className="relative mt-4">
                    <textarea
                        id="comment"
                        rows="4"
                        className="form-input w-full rounded-3xl border-none bg-theme-light px-5 py-3 pr-12 text-dark placeholder:text-xs dark:bg-darkmode-theme-dark"
                        placeholder="Write a comment..."
                        required
                        name="commentText"
                        value={commentFormData.commentText}
                        onChange={(e) => setCommentFormData(prev => ({
                                ...prev,
                                commentText: e.target.value,
                            }))
                        }
                    >
                    </textarea>
                </fieldset>

                <button className="d-block btn btn-primary mt-4 w-[230px]" type="submit">
                    Post comment
                </button>
            </form>

            {/* Comment item */}
            {comments.map((comment, index) => (
                <article key={index} className="p-6 mb-4 text-base rounded-3xl border border-border dark:border-darkmode-border">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                        <p className="inline-flex items-center font-secondary mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                            {comment.guestName}
                        </p>
                        <p className="text-sm text-gray-600 font-secondary dark:text-gray-400">
                            <time>{dateFormat(comment.createdAt)}</time>
                        </p>
                        </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400">
                        {comment.commentText}
                    </p>
                </article>
            ))}
        </div>
    </section>
  );
}

export default CommentSection