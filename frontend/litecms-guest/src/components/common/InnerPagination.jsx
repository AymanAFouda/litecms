import { sortByDate } from "../../utils/sortFunctions";
import { Link } from "react-router-dom";

const InnerPagination = ({ posts, date }) => {
  const orderedPosts = sortByDate(posts);
  const lastIndex = orderedPosts.length - 1;
  const postIndex = orderedPosts.findIndex(
    (post) => post.frontmatter.date == date
  );
  const next = postIndex == 0 ? undefined : orderedPosts[postIndex - 1].slug;
  const prev =
    postIndex == lastIndex ? undefined : orderedPosts[postIndex + 1].slug;
  const prevButton = prev && (
    <Link to={prev} className={"btn btn-primary"}>
      Prev
    </Link>
  );
  const nextButton = next && (
    <Link to={next} className={"btn btn-primary"}>
      Next
    </Link>
  );

  return (
    <div className="row">
      <span className="col">{prevButton}</span>
      <span className="col-8" />
      <span className="col">{nextButton}</span>
    </div>
  );
};

export default InnerPagination;
