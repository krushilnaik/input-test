interface StatusRendererProps {
	label?: string;
	cols?: string | number;
	data?: string;
}

const StatusRenderer = ({ label, data }: StatusRendererProps) => {
	const title = label || "";
	// Parse statuses from data: "IN_PROGRESS" or "COMPLETED, IN_PROGRESS"
	const statuses = (data || "")
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);

	const getStatusClass = (status: string) => {
		const normalizedStatus = status.trim().toUpperCase().replace(/ /g, "_");

		const statusClasses: Record<string, string> = {
			COMPLETED: "bg-green-500/12 text-green-400 border-green-500",
			IN_PROGRESS: "bg-orange-400/12 text-orange-400 border-orange-400",
			PENDING: "bg-yellow-500/12 text-yellow-400 border-yellow-500",
			BLOCKED: "bg-red-500/12 text-red-400 border-red-500",
			NOT_STARTED: "bg-gray-500/12 text-gray-400 border-gray-500",
		};

		return statusClasses[normalizedStatus] || statusClasses.NOT_STARTED;
	};

	const formatStatus = (status: string) => {
		return status
			.trim()
			.replace(/_/g, " ")
			.toLowerCase()
			.replace(/\b\w/, (char) => char.toUpperCase());
	};

	return (
		<div className="flex w-full min-w-0 flex-col gap-3 p-4">
			{title && (
				<span className="text-card-title text-sm font-semibold">{title}</span>
			)}
			<div className="flex w-full min-w-0 flex-nowrap gap-2">
				{statuses.length === 0 ? (
					<div className="text-primary-gray text-sm">No status provided</div>
				) : (
					statuses.map((status, index) => (
						<span
							key={index}
							className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(status)}`}
						>
							{formatStatus(status)}
						</span>
					))
				)}
			</div>
		</div>
	);
};

export default StatusRenderer;
