import { markdownify } from "../../utils/textConverter";
import shortcodes from "@shortcodes/all";
import ReactMarkdown from "react-markdown";

const Default = ({ data }) => {
  const { frontmatter, mdxContent } = data;
  const { title } = frontmatter;
  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "h2 mb-8 text-center")}
        <div className="content">
          <ReactMarkdown
            components={{
                ...shortcodes,
                img: img,
              }}
            >{...mdxContent}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

export default Default;
