export const COLORS = ["#ea4335", "#fbbc04", "#34a853", "#4285f4", "#9334e6"];

export const INPUT_DIMENSIONS = {
  baseWidth: 384, // w-96 in pixels
  baseHeight: 56, // py-4
  scaleFactor: 1.3, // 30% larger
  widthOffset: 20,
  heightOffset: -10,
} as const;

export const calculateInputDimensions = () => {
  const width = Math.round(INPUT_DIMENSIONS.baseWidth * INPUT_DIMENSIONS.scaleFactor) + INPUT_DIMENSIONS.widthOffset;
  const height = Math.round(INPUT_DIMENSIONS.baseHeight * INPUT_DIMENSIONS.scaleFactor) + INPUT_DIMENSIONS.heightOffset;
  return { width, height };
};

export const BORDER_CONFIG = {
  offset: 4,
  cornerRadius: Math.round(12 * INPUT_DIMENSIONS.scaleFactor),
} as const;
