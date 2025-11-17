import type { Components } from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useCanvasModalStore } from "@/stores/canvasModalStore";

import CodeActions from "../../actions/CodeActions";

export const codeSnippetComponents: Components = {
  pre: ({ children, ...props }) => (
    <pre className="font-sans" {...props}>
      {children}
    </pre>
  ),
  code: (props) => {
    const { node, inline, className, children, ...rest } = props as {
      node?: unknown;
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
      [key: string]: unknown;
    };

    const match = /language-(\w+)/.exec(className || "");
    const codeString = String(children).replace(/\n$/, "");
    const { openModal } = useCanvasModalStore();

    const handleViewInCanvas = (html: string, title: string) => {
      openModal(html, title);
    };

    if (!inline && match) {
      return (
        <div className="border-tertiary-gray overflow-hidden rounded-lg border">
          <div className="border-tertiary-gray bg-quaternary-gray flex items-center justify-between border-b px-4 py-2">
            <span className="text-primary-gray text-xs font-medium">
              {match[1].charAt(0).toUpperCase() + match[1].slice(1)}
            </span>
            <CodeActions code={codeString} language={match[1]} onViewInCanvas={handleViewInCanvas} />
          </div>
          <div
            className="p-2"
            style={{
              backgroundColor: atomOneDark["hljs"]["background"] as string,
            }}
          >
            <SyntaxHighlighter
              style={atomOneDark as Record<string, React.CSSProperties>}
              language={match[1]}
              PreTag="div"
              {...rest}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        </div>
      );
    }

    return (
      <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm" {...rest}>
        {children}
      </code>
    );
  },
};
