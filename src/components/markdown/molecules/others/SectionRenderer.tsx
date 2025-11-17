interface SectionRendererProps {
  label?: string;
  cols?: string | number;
  data?: string;
  type?: "checklist" | "text" | "list";
}

const SectionRenderer = ({ label, data, type = "text" }: SectionRendererProps) => {
  const title = label || "";
  const content = data || "";
  const lines = content.split("\n").filter((line) => line.trim());

  const renderContent = () => {
    switch (type) {
      case "checklist":
        return (
          <div className="space-y-1">
            {lines.map((line, index) => {
              const isChecked = line.startsWith("[x]");
              const isUnchecked = line.startsWith("[ ]");
              const text = line.replace(/^\[[x ]\]\s*/, "");

              if (isChecked || isUnchecked) {
                return (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className={`flex h-3 w-3 items-center justify-center rounded-full ${
                        isChecked ? "bg-status-success" : "border-primary-gray border"
                      }`}
                    >
                      {isChecked && <span className="text-[0.5rem] leading-none text-black">✓</span>}
                    </span>
                    <span>{text}</span>
                  </div>
                );
              }
              return <div key={index}>{line}</div>;
            })}
          </div>
        );
      case "list":
        return (
          <ul className="p-0">
            {lines.map((line, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-white">•</span>
                <span>{line.replace(/^-\s*/, "")}</span>
              </li>
            ))}
          </ul>
        );
      case "text":
      default:
        return (
          <div>
            {lines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="text-primary-gray rounded-lg flex flex-col gap-2">
      {title && (
        <div className="flex items-center gap-1 text-lg font-semibold text-white mb-1">
          <span className="border-primary inline-block h-4 w-4 shrink-0 rounded-full border-2" />
          <span>{title}</span>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default SectionRenderer;
