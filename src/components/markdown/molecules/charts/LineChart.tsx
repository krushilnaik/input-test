import { ResponsiveLine } from "@nivo/line";
import type { LineSeries, LineSvgProps } from "@nivo/line";

import { PALETTE } from "./constants";

type Props = LineSvgProps<LineSeries>;

export function LineChart(props: Props) {
	return (
		<ResponsiveLine
			xScale={{ type: "point" }}
			yScale={{ type: "linear", min: "auto", max: "auto" }}
			axisBottom={{ tickSize: 0, tickPadding: 5, tickRotation: 0 }}
			axisLeft={null}
			enablePointLabel={false}
			pointBorderWidth={0}
			pointSize={0}
			gridYValues={[]}
			gridXValues={[]}
			lineWidth={3}
			useMesh={true}
			{...props}
			margin={{ top: 0, right: 32, bottom: 32, left: 32 }}
			colors={PALETTE}
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
