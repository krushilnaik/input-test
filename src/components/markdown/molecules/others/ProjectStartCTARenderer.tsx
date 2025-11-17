import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useCallback } from "react";

// import { useCreateProject } from "@/services/projectApi";
// import { useSessionStore } from "@/stores/sessionStore";

export interface ProjectStartCTARendererProps {
  title: string;
  content: string;
  useCaseId?: string;
  messageId?: string;
  projectId?: string | null;
}

const ProjectStartCTARenderer = ({ title, content, useCaseId, messageId, projectId }: ProjectStartCTARendererProps) => {
  const lines = content.split("\n").filter((line) => line.trim());
  const description = lines.find((line) => !line.startsWith("#") && !line.startsWith("-") && line.trim())?.trim() || "";
  const projectName = lines
    .find((line) => line.startsWith("# "))
    ?.replace(/^#+\s*/, "")
    .trim();
  const los = lines
    .find((line) => line.startsWith("### "))
    ?.replace(/^#+\s*/, "")
    .trim();
  const steps = lines.filter((line) => line.startsWith("- ")).map((line) => line.replace(/^-\s*/, "").trim());
  // const { currentSessionId } = useSessionStore();
  const queryClient = useQueryClient();
  const { navigate } = useRouter();

  // const { mutate: createProject, isPending } = useCreateProject({
  //   onSuccess: async (project) => {
  //     if (currentSessionId) {
  //       await queryClient.invalidateQueries({
  //         queryKey: ["SESSION_MESSAGES", currentSessionId],
  //       });
  //     }
  //     navigate({
  //       to: `/project/${project.id}`,
  //       search: { session_id: currentSessionId || undefined },
  //     });
  //   },
  // });

  const handleStartProject = useCallback(() => {
    // createProject({
    //   name: projectName || title,
    //   description: description,
    //   los: los || "Technology Consulting",
    //   status: "in_progress",
    //   useCaseId,
    //   sessionId: currentSessionId ?? undefined,
    //   messageId,
    // });
  }, [projectName, title, description, los, useCaseId, messageId]);
  // }, [createProject, projectName, title, description, los, useCaseId, currentSessionId, messageId]);

  return (
    <div className="shimmer-container-always mt-4 space-y-2 rounded-lg p-6 text-white">
      <h4 className="text-lg font-medium text-white">{title}</h4>
      <p className="text-secondary-gray text-base leading-relaxed">{description}</p>
      {steps.length > 0 && (
        <>
          <h4 className="text-base text-white">
            This workflow contains {steps.length} step
            {steps.length === 1 ? "" : "s"}
          </h4>
          <ol className="text-secondary-gray bg-secondary-black space-y-1 rounded-md border border-white/20 p-3 py-2 text-xs">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start gap-2">
                <svg className="text-secondary-gray mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="7" cy="10" r="1" fill="currentColor" />
                  <circle cx="10" cy="10" r="1" fill="currentColor" />
                  <circle cx="13" cy="10" r="1" fill="currentColor" />
                </svg>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </>
      )}
      <button className="bg-white" onClick={handleStartProject}>
        {"Start Project"}
      </button>
    </div>
  );
};

export default ProjectStartCTARenderer;
