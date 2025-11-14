import type { Transformer } from "unified";

import { createRemarkDirective } from "../utils/directives";

/**
 * Creates a remark transformer for chart directives
 */
export default function remarkCharts(): Transformer {
	return createRemarkDirective({
		directives: {
			"chart-pie": "piechart",
			"chart-bar": "barchart",
			"chart-choropleth": "choroplethchart",
			"chart-scatter": "scatterchart",
			"chart-line": "linechart",
		},
		wrapperTag: "chartrow",
		useColumnGrouping: true,
	});
}
