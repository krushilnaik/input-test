import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

// import { JiraConnectButton } from "@/components/jira/JiraConnectButton";
// import { sendSessionMessage } from "@/services/chatMessagesApi";
// import { useSessionStore } from "@/stores/sessionStore";
// import type { MessageListResponse } from "@/types/session";
// import { QUERY_KEYS } from "@/utils/constants";
// import logger from "@/utils/logger";

interface JiraPromptRendererProps {
  label?: string;
  cols?: string | number;
  data?: string;
}

/**
 * Renders a Jira connection prompt with connect/disconnect functionality
 *
 * Usage in markdown:
 * ```
 * :::jira-prompt[Connect to Jira]
 * Connect your Jira account to enable integration features
 * :::
 * ```
 */
const JiraPromptRenderer = ({ label, data }: JiraPromptRendererProps) => {
  const queryClient = useQueryClient();
  // const currentSessionId = useSessionStore((s) => s.currentSessionId);
  const [isProcessing, setIsProcessing] = useState(false);

  // Use label as title, fallback to default
  const title = label || "Jira Integration";
  const description =
    data?.trim() ||
    "Connect your Jira account to sync issues, create tickets, and manage your work directly from this application.";

  const handleJiraConnect = useCallback(async () => {
    // if (!currentSessionId) {
    // 	logger.warn("No active session to continue conversation after Jira auth");
    // 	return;
    // }
    // try {
    // 	setIsProcessing(true);
    // 	logger.info("Jira connected, sending continuation message", {
    // 		sessionId: currentSessionId,
    // 	});
    // 	// Send a continuation message to resume the conversation
    // 	await sendSessionMessage(currentSessionId, "Authorized.", [], []);
    // 	// Invalidate queries to fetch the new message
    // 	await queryClient.invalidateQueries({
    // 		queryKey: QUERY_KEYS.SESSION_MESSAGES(currentSessionId, 1, 100),
    // 	});
    // 	logger.info("Continuation message sent successfully");
    // } catch (error) {
    // 	logger.error("Failed to send continuation message after Jira auth", {
    // 		error,
    // 	});
    // } finally {
    // 	setIsProcessing(false);
    // }
  }, [queryClient]);

  return (
    <div className="my-6 space-y-4 rounded-lg border border-blue-500/30 bg-blue-950/20 p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && <p className="text-sm leading-relaxed text-gray-300">{description}</p>}
      </div>
      <div className="space-y-2">
        {/* <JiraConnectButton
					className="w-full sm:w-auto"
					onConnect={handleJiraConnect}
					onDisconnect={() => {
						logger.info("Jira disconnected from markdown molecule");
					}}
				/> */}
        {isProcessing && <p className="text-sm text-gray-400">Resuming conversation with Jira integration...</p>}
      </div>
    </div>
  );
};

export default JiraPromptRenderer;
