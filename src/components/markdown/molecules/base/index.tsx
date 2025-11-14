import { Link } from "@tanstack/react-router";
import type { Components } from "react-markdown";

import { blockquoteComponents } from "./blockquotes";
import { codeSnippetComponents } from "./codeSnippets";
import { tableComponents } from "./tables";

export const baseComponents: Components = {
	// basic elements
	h1: ({ children }) => (
		<h1 className="mb-4 text-3xl font-bold text-white">{children}</h1>
	),
	h2: ({ children }) => (
		<h2 className="mb-3 text-2xl font-bold text-white">{children}</h2>
	),
	h3: ({ children }) => (
		<h3 className="mb-3 text-xl font-semibold text-white">{children}</h3>
	),
	h4: ({ children }) => (
		<h4 className="mb-2 text-lg font-semibold text-white">{children}</h4>
	),
	h5: ({ children }) => (
		<h5 className="mb-2 text-base font-semibold text-white">{children}</h5>
	),
	h6: ({ children }) => (
		<h6 className="mb-2 text-sm font-semibold text-white">{children}</h6>
	),
	p: ({ children }) => <p className="mb-4 text-gray-300">{children}</p>,
	a: ({ href, children }) => (
		<Link
			to={href}
			className="text-primary hover:text-button-primary-hover hover:underline"
			target={href?.startsWith("http") ? "_blank" : undefined}
			rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
		>
			{children}
		</Link>
	),
	ul: ({ children }) => (
		<ul className="text-primary-gray mb-4 ml-6 list-disc">{children}</ul>
	),
	ol: ({ children }) => (
		<ol className="text-primary-gray mb-4 ml-6 list-decimal">{children}</ol>
	),
	li: ({ children }) => <li className="mb-1">{children}</li>,
	img: ({ src, alt }) => (
		<img
			src={src}
			alt={alt}
			className="my-4 max-w-full rounded"
			loading="lazy"
		/>
	),
	hr: () => <hr className="my-6 border-white/10" />,

	// tables
	...tableComponents,

	// blockquotes
	...blockquoteComponents,

	// code snippets
	...codeSnippetComponents,
};
