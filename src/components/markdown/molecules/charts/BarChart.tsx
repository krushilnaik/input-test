import { ResponsiveBar } from "@nivo/bar";
import type { BarDatum, ResponsiveBarSvgProps } from "@nivo/bar";

import { PALETTE } from "./constants";

type Props = ResponsiveBarSvgProps<BarDatum>;

export function BarChart(props: Props) {
	const isHorizontal = props.layout === "horizontal";

	const colorProps: Partial<Props> = isHorizontal
		? {
				fill: [{ match: "*", id: "eclipse-gradient" }],
			}
		: {
				colors: ({ index }) => PALETTE[index % PALETTE.length],
			};

	return (
		<ResponsiveBar
			borderRadius={10}
			enableLabel={isHorizontal}
			label={(d) => Number(d.value).toFixed(1)}
			labelSkipWidth={0}
			labelPosition="end"
			axisBottom={{ tickSize: 0, tickPadding: 5 }}
			axisLeft={isHorizontal ? { tickSize: 0, tickPadding: 5 } : null}
			gridYValues={[]}
			margin={{ top: 8, right: 16, bottom: 32, left: isHorizontal ? 80 : 8 }}
			padding={0.3}
			{...props}
			{...colorProps}
			defs={[
				{
					id: "eclipse-gradient",
					type: "linearGradient",
					x2: 0.5,
					y2: 0,
					colors: [
						{ offset: 0, color: "var(--color-secondary)" },
						{ offset: 100, color: "var(--color-primary)" },
					],
				},
			]}
			theme={{
				labels: {
					text: {
						fill: "white",
					},
				},
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
