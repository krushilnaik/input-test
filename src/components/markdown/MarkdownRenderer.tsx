import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import type { PluggableList } from "unified";

import { components } from "./molecules";
import remarkChart from "./plugins/charts";
import remarkMolecule from "./plugins/molecules";
import remarkGroupableMolecule from "./plugins/status";

const remarkPlugins: PluggableList = [remarkGfm, remarkDirective, remarkChart, remarkMolecule, remarkGroupableMolecule];

interface Props {
  content: string;
}

function MarkdownRenderer({ content }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={[rehypeRaw]}
      components={components}
      skipHtml={true}
      urlTransform={(url) => {
        if (url.startsWith("http://") || url.startsWith("https://")) {
          return url;
        }
        return "";
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default MarkdownRenderer;
