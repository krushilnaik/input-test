interface ImageSectionRendererProps {
  label?: string;
  cols?: string | number;
  data?: string;
}

const ImageSectionRenderer = ({ label, data }: ImageSectionRendererProps) => {
  const title = label || "";

  // Parse data: contains markdown image, description text, and optional link
  // Example format:
  // ![Sample Device](https://picsum.photos/800/600?random=2)
  // Lorem ipsum dolor sit amet...
  // [Learn more](https://www.google.com)

  const lines = (data || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  // Extract image
  const imageMatch = lines.find((line) => line.match(/!\[([^\]]*)\]\(([^)]+)\)/));
  const imageParts = imageMatch?.match(/!\[([^\]]*)\]\(([^)]+)\)/);
  const alt = imageParts?.[1] || "";
  const src = imageParts?.[2] || "";

  // Extract link
  const linkMatch = lines.find((line) => line.match(/\[([^\]]+)\]\(([^)]+)\)/));
  const linkParts = linkMatch?.match(/\[([^\]]+)\]\(([^)]+)\)/);
  const linkText = linkParts?.[1] || "";
  const linkUrl = linkParts?.[2] || "";

  // Extract description (everything that's not image or link)
  const description = lines
    .filter((line) => !line.match(/!\[([^\]]*)\]\(([^)]+)\)/) && !line.match(/\[([^\]]+)\]\(([^)]+)\)/))
    .join(" ")
    .trim();

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {src && <img src={src} alt={alt} className="h-auto w-full rounded-lg" loading="lazy" />}
      {description && <p className="text-primary-gray">{description}</p>}
      {linkUrl && linkText && (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary inline-flex items-center gap-1 w-fit"
        >
          {linkText}
          <span>→</span>
        </a>
      )}
    </div>
  );
};

export default ImageSectionRenderer;
