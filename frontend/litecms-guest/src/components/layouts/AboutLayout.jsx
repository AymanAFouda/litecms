import { markdownify } from "../../utils/textConverter";
import ReactMarkdown from "react-markdown";

const AboutLayout = ({ data }) => {
  const { title, content } = data;

  return (
    <section className="section pt-0">
      {markdownify(
        title,
        "h1",
        "h2 py-12 bg-primary text-center lg:text-[55px] text-white mb-16"
      )}
      <div className="container text-center xl:col-6 lg:col-8 md:col-10">
        <div className="content text-left">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

export default AboutLayout;
