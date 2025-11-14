import { ResponsivePie } from "@nivo/pie";
import type { DefaultRawDatum, PieSvgProps } from "@nivo/pie";

import { PALETTE } from "./constants";

type Props = PieSvgProps<DefaultRawDatum>;

export function PieChart(props: Props) {
	return (
		<ResponsivePie
			margin={{ top: 0, right: 16, bottom: 16, left: 16 }}
			borderWidth={0}
			colors={PALETTE}
			enableArcLinkLabels={false}
			enableArcLabels={true}
			activeOuterRadiusOffset={4}
			arcLabel={(d) => `${d.value}`}
			{...props}
			theme={{
				labels: {
					text: {
						fill: "white",
						fontSize: 12,
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
