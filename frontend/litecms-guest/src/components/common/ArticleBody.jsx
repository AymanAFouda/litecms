import { Filter, Interweave } from "interweave";

class BlockquoteFilter extends Filter {
  node(name, node) {
    if (name === "blockquote") {
      node.className = "!py-4 !my-4";

    }
    return node;
  }
}

function ArticleBody({ articleBody }) {

  return (
    <div className="prose dark:prose-invert max-w-none">
      <Interweave 
        content={articleBody} 
        filters={[new BlockquoteFilter()]}/>
    </div>
  );
}

export default ArticleBody