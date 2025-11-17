interface ImageRendererProps {
	label?: string;
	cols?: string | number;
	data?: string;
}

const ImageRenderer = ({ data }: ImageRendererProps) => {
	// Parse markdown image syntax: ![alt](url)
	// Example: ![Sample Image](https://picsum.photos/800/600?random=1)
	const imageMatch = (data || "").match(/!\[([^\]]*)\]\(([^)]+)\)/);
	
	if (!imageMatch) {
		return (
			<div className="text-primary-gray text-sm">Invalid image format</div>
		);
	}

	const alt = imageMatch[1] || "Image";
	const src = imageMatch[2] || "";

	return (
		<div className="flex flex-col items-start gap-2">
			<img src={src} alt={alt} className="h-auto w-full rounded-lg" />
			<span className="text-primary-gray text-xs">{alt}</span>
		</div>
	);
};

export default ImageRenderer;
