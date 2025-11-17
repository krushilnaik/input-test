import { Shimmer } from "@/atoms/Shimmer";

interface ProjectSummaryRendererProps {
  content: string;
  projectId?: string;
}

const ProjectSummaryRenderer = ({ content, projectId }: ProjectSummaryRendererProps) => {
  // Always show skeleton loader
  return (
    <div className="w-full">
      {/* Gradient border wrapper */}
      <div className="glass relative rounded-xl bg-linear-to-r from-pink-500 via-orange-400 to-orange-500 p-px">
        {/* Container with dark gradient background */}
        <div className="rounded-xl bg-black/90 p-6">
          {/* Header Section with Spinner and Text */}
          <div className="mb-6 flex items-center gap-3">
            {/* Orange spinner loader */}
            <div
              className="h-5 w-5 animate-spin rounded-full border-2 border-t-transparent"
              style={{
                borderColor: "var(--color-orange-500)",
                borderTopColor: "transparent",
              }}
            />
            <h2 className="text-xl font-semibold text-white">Pulling up your recap...</h2>
          </div>

          {/* Skeleton Bars */}
          <div className="space-y-3">
            {/* Three full-width bars */}
            <Shimmer width="100%" height="1rem" />
            <Shimmer width="100%" height="1rem" />
            <Shimmer width="100%" height="1rem" />
            {/* Shorter bar at the bottom */}
            <Shimmer width="50%" height="1rem" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummaryRenderer;
