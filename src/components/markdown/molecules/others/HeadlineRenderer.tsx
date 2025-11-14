interface HeadlineRendererProps {
  label?: string;
  cols?: string | number;
  data?: string;
  showIcon?: boolean;
}

const HeadlineRenderer = ({ label, data, showIcon = true }: HeadlineRendererProps) => {
  // Use label as title, fallback to data if label is empty
  const title = label || data || "";

  return (
    <div className={`flex items-center text-lg font-semibold text-white ${showIcon ? "gap-2" : ""}`}>
      {showIcon && (
        <span className="bg-quaternary-gray flex aspect-square h-12 w-12 shrink-0 items-center justify-center rounded-full">
          <span className="text-primary text-2xl">★</span>
        </span>
      )}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
  );
};

export default HeadlineRenderer;
