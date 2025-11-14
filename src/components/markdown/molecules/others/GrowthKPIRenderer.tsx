import { ArrowDown, ArrowUp } from "lucide-react";

interface GrowthKPIRendererProps {
	label?: string;
	cols?: string | number;
	data?: string;
}

const GrowthKPIRenderer = ({
	label,
	data,
}: GrowthKPIRendererProps) => {
	const title = label || "";
	
	// Parse data: format is typically "# $128,769\n### increased by 20%"
	// Extract value (starts with #) and subtitle (starts with ###)
	const lines = (data || "").split("\n").map(line => line.trim()).filter(Boolean);
	const valueLine = lines.find(line => line.startsWith("#")) || "";
	const subtitleLine = lines.find(line => line.startsWith("###")) || "";
	
	// Extract value by removing # and trimming
	const value = valueLine.replace(/^#+\s*/, "").trim();
	// Extract subtitle by removing ### and trimming
	const subtitle = subtitleLine.replace(/^#+\s*/, "").trim();

	// Detect if growth is positive or negative
	const isNegative = value.startsWith("-");
	const numericMatch = value.match(/-?\d+\.?\d*/);
	const numericValue = numericMatch ? parseFloat(numericMatch[0]) : 0;
	const isZero = numericValue === 0;

	return (
		<div className="callout border-tertiary-gray bg-secondary-black space-y-2 rounded-2xl border p-4">
			{title && (
				<h4 className="text-primary leading-tight font-semibold break-words whitespace-normal">
					{title}
				</h4>
			)}
			<div className="text-4xl font-bold tracking-tight text-white">
				{value}
			</div>
			{subtitle && (
				<div className="text-primary-gray flex items-center gap-1 text-sm">
					{!isNegative && !isZero && <ArrowUp size={16} />}
					{isNegative && <ArrowDown size={16} />}
					<span className="flex-1 break-words whitespace-normal">
						{subtitle}
					</span>
				</div>
			)}
		</div>
	);
};

export default GrowthKPIRenderer;
