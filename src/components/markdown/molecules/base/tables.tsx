import { useRef } from "react";
import type { Components } from "react-markdown";

import { useCanvasModalStore } from "@/stores/canvasModalStore";

import TableActions from "../../actions/TableActions";

export const tableComponents: Components = {
	table: ({ children, ...props }) => {
		const tableRef = useRef<HTMLTableElement | null>(null);
		const { openModal } = useCanvasModalStore();

		const handleViewInCanvas = (html: string, title: string) => {
			openModal(html, title);
		};

		return (
			<div className="border-tertiary-gray rounded-lg border">
				<div className="border-tertiary-gray flex items-center justify-between border-b px-4 py-2">
					<span className="text-primary-gray text-xs font-medium">Table</span>
					<TableActions
						tableRef={tableRef}
						onViewInCanvas={handleViewInCanvas}
					/>
				</div>
				<div className="markdown-table-wrapper overflow-auto">
					<table
						ref={tableRef}
						className="w-full border-separate text-sm"
						{...props}
					>
						{children}
					</table>
				</div>
			</div>
		);
	},
	thead: ({ children, ...props }) => (
		<thead className="bg-quaternary-gray sticky top-0 z-10" {...props}>
			{children}
		</thead>
	),
	tbody: ({ children, ...props }) => (
		<tbody className="group" {...props}>
			{children}
		</tbody>
	),
	tr: ({ children, ...props }) => (
		<tr
			className="group-[tbody]:odd:bg-tertiary-gray hover:bg-quaternary-gray group-[tbody]:even:bg-transparent"
			{...props}
		>
			{children}
		</tr>
	),
	th: ({ children, ...props }) => (
		<th
			className="border-tertiary-gray border-b p-3 text-left align-middle font-semibold whitespace-nowrap text-white"
			{...props}
		>
			{children}
		</th>
	),
	td: ({ children, ...props }) => (
		<td
			className="text-primary-gray p-3 align-top whitespace-nowrap first:rounded-l-lg last:rounded-r-lg"
			{...props}
		>
			{children}
		</td>
	),
};
