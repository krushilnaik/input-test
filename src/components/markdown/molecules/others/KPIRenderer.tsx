interface KPIRendererProps {
	label?: string;
	cols?: string | number;
	data?: string;
}

const KPIRenderer = ({ label, data }: KPIRendererProps) => {
	const title = label || "";
	const value = data || "";

	return (
		<div className="bg-quaternary-gray text-primary-gray rounded-lg p-4">
			{title && (
				<div className="flex items-center gap-1">
					<span className="border-primary inline-block h-4 w-4 rounded-full border-2" />
					<span className="font-semibold text-white">{title}</span>
				</div>
			)}
			<div className="text-2xl font-bold text-white">
				<div className="text-primary">{value}</div>
			</div>
		</div>
	);
};

export default KPIRenderer;
