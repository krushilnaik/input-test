import type { Transformer } from "unified";

import { createRemarkDirective } from "../utils/directives";

/**
 * Creates a remark transformer for status directives
 *
 * This transformer handles the 'status' directive and
 * wraps consecutive ones in a `statusgrid` component.
 */
export default function remarkStatusDirective(): Transformer {
	return createRemarkDirective({
		directives: {
			status: "status",
		},
		wrapperTag: "statusgrid",
		useColumnGrouping: false,
		preserveStringData: true,
	});
}
