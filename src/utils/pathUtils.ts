import { calculateInputDimensions, BORDER_CONFIG } from "../constants";

export function createRoundedRectanglePath() {
  const { width: inputWidth, height: inputHeight } = calculateInputDimensions();
  const borderOffset = BORDER_CONFIG.offset;
  const cornerRadius = BORDER_CONFIG.cornerRadius;
  const svgWidth = inputWidth + borderOffset * 2;
  const svgHeight = inputHeight + borderOffset * 2;

  const pathXStart = borderOffset + cornerRadius;
  const pathXEnd = inputWidth + borderOffset - cornerRadius;
  const pathYTop = borderOffset + cornerRadius;
  const pathYBottom = inputHeight + borderOffset - cornerRadius;

  const pathD = `M ${pathXStart} ${borderOffset} L ${pathXEnd} ${borderOffset} Q ${
    svgWidth - borderOffset
  } ${borderOffset} ${svgWidth - borderOffset} ${pathYTop} L ${svgWidth - borderOffset} ${pathYBottom} Q ${
    svgWidth - borderOffset
  } ${svgHeight - borderOffset} ${pathXEnd} ${svgHeight - borderOffset} L ${pathXStart} ${
    svgHeight - borderOffset
  } Q ${borderOffset} ${
    svgHeight - borderOffset
  } ${borderOffset} ${pathYBottom} L ${borderOffset} ${pathYTop} Q ${borderOffset} ${borderOffset} ${pathXStart} ${borderOffset}`;

  return {
    pathD,
    svgWidth,
    svgHeight,
    inputWidth,
    inputHeight,
    borderOffset,
  };
}

