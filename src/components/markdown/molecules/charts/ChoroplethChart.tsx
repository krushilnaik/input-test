import { ResponsiveChoropleth } from "@nivo/geo";
import type { ChoroplethCommonProps, GeoProjectionType } from "@nivo/geo";
import { useEffect, useRef, useState } from "react";

import { PALETTE } from "./constants";

type Props = Omit<ChoroplethCommonProps, "features"> & {
	features?: "states" | "world";
};

export function ChoroplethChart({ features = "states", ...props }: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(800);
	const [zoomLevel, setZoomLevel] = useState(1);
	const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [loadedFeatures, setLoadedFeatures] = useState<
		ChoroplethCommonProps["features"]
	>([]);

	const MAX_ZOOM_LEVEL = 5;
	const MIN_ZOOM_LEVEL = 0.3;
	const ZOOM_FACTOR = 1.5;
	const CENTER_OFFSET = 0.5; // Center position for map projection (0.5 = 50% from origin)
	const PAN_SENSITIVITY_Y = 400; // Vertical pan sensitivity divisor

	const translation: [number, number] = [
		CENTER_OFFSET + panOffset.x / containerWidth,
		CENTER_OFFSET + panOffset.y / PAN_SENSITIVITY_Y,
	];

	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setContainerWidth(entry.contentRect.width);
			}
		});

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const loadFeatures = async () => {
			if (features === "world") {
				const { WORLD_FEATURES } = await import("./features/world_countries");
				setLoadedFeatures(WORLD_FEATURES);
			} else {
				const { STATE_FEATURES } = await import("./features/states");
				setLoadedFeatures(STATE_FEATURES);
			}
		};

		loadFeatures();
	}, [features]);

	const getResponsiveMargin = () => {
		if (containerWidth < 600) return { top: 30, right: 50, bottom: 0, left: 0 };

		return { top: 0, right: 50, bottom: 0, left: 0 };
	};

	const zoomIn = (e: React.MouseEvent) => {
		e.stopPropagation();
		setZoomLevel((prev) => Math.min(prev * ZOOM_FACTOR, MAX_ZOOM_LEVEL));
	};

	const zoomOut = (e: React.MouseEvent) => {
		e.stopPropagation();
		setZoomLevel((prev) => Math.max(prev / ZOOM_FACTOR, MIN_ZOOM_LEVEL));
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		setIsDragging(true);
		setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging) return;
		setPanOffset({
			x: e.clientX - dragStart.x,
			y: e.clientY - dragStart.y,
		});
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const mapProps =
		features === "world"
			? {
					features: loadedFeatures,
					projectionScale: 100 * zoomLevel,
					projectionTranslation: translation,
					margin: getResponsiveMargin(),
				}
			: {
					features: loadedFeatures,
					projectionScale: (containerWidth / ZOOM_FACTOR) * zoomLevel,
					projectionTranslation: translation,
					projectionType: "naturalEarth1" as GeoProjectionType,
					margin: getResponsiveMargin(),
				};

	return (
		<div
			ref={containerRef}
			className="relative h-full w-full"
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			style={{ cursor: isDragging ? "grabbing" : "grab" }}
		>
			{/* Zoom Controls */}
			<div
				className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1"
				onMouseDown={(e) => e.stopPropagation()}
			>
				<button
					onClick={zoomIn}
					className="border-tertiary-gray bg-secondary-black text-secondary-gray hover:bg-tertiary-gray flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-lg font-bold transition-colors"
					aria-label="Zoom in"
				>
					+
				</button>
				<button
					onClick={zoomOut}
					className="border-tertiary-gray bg-secondary-black text-secondary-gray hover:bg-tertiary-gray flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border text-lg font-bold transition-colors"
					aria-label="Zoom out"
				>
					-
				</button>
			</div>
			{loadedFeatures.length > 0 && (
				<ResponsiveChoropleth
					// @ts-ignore - intended usage is to be overwritten
					domain={[0, 1000000]}
					unknownColor="var(--color-secondary-gray-muted)"
					label="properties.name"
					valueFormat=".2s"
					borderWidth={0.5}
					borderColor="var(--color-secondary-black)"
					// `features` is not passed in from props because it's destructured above
					{...props}
					{...mapProps}
					colors={PALETTE}
					legends={[
						{
							anchor: "bottom-left",
							direction: "column",
							justify: true,
							translateX: 20,
							translateY: -100,
							itemsSpacing: 0,
							itemWidth: 94,
							itemHeight: 18,
							itemDirection: "left-to-right",
							itemTextColor: "var(--color-secondary-gray)",
							itemOpacity: 0.85,
							symbolSize: 18,
						},
					]}
				/>
			)}
		</div>
	);
}
