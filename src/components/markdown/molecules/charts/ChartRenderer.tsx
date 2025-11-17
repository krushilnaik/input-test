import { useMemo } from "react";

import { BarChart } from "./BarChart";
import { ChoroplethChart } from "./ChoroplethChart";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";
import { ScatterChart } from "./ScatterChart";

const SUPPORTED_CHART_TYPES = ["bar", "line", "pie", "scatter", "choropleth"];

interface ChartRendererProps {
	type: string;
	label: string;
	data: any;
	cols?: number;
}

export default function ChartRenderer({
	type,
	label,
	data,
	cols = 12,
}: ChartRendererProps) {
	const chartType = type.trim().toLowerCase();
	try {
		const parsedData = JSON.parse(data);

		if (!SUPPORTED_CHART_TYPES.includes(chartType)) {
			return (
				<div className={`bg-quaternary-gray h-full rounded-lg p-4`}>
					<h3 className="mb-3 text-lg font-semibold text-white">{label}</h3>
					<div className="flex h-full w-full items-center justify-center text-red-400 @lg:h-72">
						<div className="flex h-full flex-col text-center">
							<div className="mb-2 text-2xl">⚠️</div>
							<div className="font-medium">Chart type not supported</div>
							<div className="mt-1 text-sm text-gray-400">Type: {type}</div>
						</div>
					</div>
				</div>
			);
		}

		// error boundary when `data` was not passed into config
		if (!parsedData) {
			return (
				<div
					className={`bg-quaternary-gray @container h-full rounded-lg border border-white/10 p-4`}
				>
					<h3 className="mb-3 text-lg font-semibold text-white">{label}</h3>
					<div className="flex h-full w-full items-center justify-center text-red-400 @[500px]:h-96">
						<div className="text-center">
							<div className="mb-2 text-2xl">⚠️</div>
							<div className="font-medium">No data passed</div>
							<div className="mt-1 text-sm text-gray-400">
								Missing `data` property in JSON response
							</div>
						</div>
					</div>
				</div>
			);
		}

		const Chart = useMemo(() => {
			switch (chartType) {
				case "line":
					return LineChart;
				case "pie":
					return PieChart;
				case "scatter":
					return ScatterChart;
				case "choropleth":
					return ChoroplethChart;
				case "bar":
				default:
					return BarChart;
			}
		}, [chartType]);

		return (
			<div
				style={{ gridColumn: `span ${cols}` }}
				className={`bg-quaternary-gray rounded-lg border border-white/10`}
			>
				<div className="h-full">
					<div className="border-b border-b-white/10 p-4">
						<h3 className="text-lg font-semibold text-white">{label}</h3>
					</div>
					<div className={`w-full ${cols === 12 ? "h-80" : "h-60"}`}>
						<Chart {...parsedData} />
					</div>
				</div>
			</div>
		);
	} catch (error) {
		console.error("Error parsing chart config:", error);

		return (
			<div
				className={`bg-quaternary-gray flex h-full flex-col gap-2 rounded-lg border border-white/10`}
			>
				<div className="border-b border-b-white/10 p-4">
					<h3 className="text-lg font-semibold text-white">{label}</h3>
				</div>
				<div className="flex h-full w-full items-center justify-center p-4 text-red-400">
					<div className="text-center">
						<div className="mb-2 text-2xl">⚠️</div>
						<div className="font-medium">Invalid chart config</div>
						<div className="mt-1 text-sm text-gray-400">
							JSON data is malformed
						</div>
					</div>
				</div>
			</div>
		);
	}
}
