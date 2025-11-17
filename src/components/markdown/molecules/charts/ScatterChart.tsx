import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import type { ScatterPlotSvgProps } from "@nivo/scatterplot";

import { PALETTE } from "./constants";

type Props = ScatterPlotSvgProps<any>;

export function ScatterChart(props: Props) {
	return (
		<ResponsiveScatterPlot
			margin={{ top: 16, right: 32, bottom: 32, left: 32 }}
			colors={PALETTE}
			axisBottom={{ tickSize: 0, tickPadding: 5 }}
			axisLeft={{ tickSize: 0, tickPadding: 5 }}
			gridYValues={[]}
			gridXValues={[]}
			useMesh={true}
			{...props}
			theme={{
				axis: {
					ticks: {
						text: {
							fill: "var(--color-secondary-gray)",
							fontSize: 12,
						},
					},
				},
				tooltip: {
					container: {
						background: "var(--color-secondary-black)",
						border: "1px solid var(--color-tertiary-gray)",
						borderRadius: "8px",
						color: "var(--color-secondary-gray)",
					},
				},
			}}
		/>
	);
}
