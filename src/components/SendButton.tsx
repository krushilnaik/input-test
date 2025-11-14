import { SendIcon } from "@/atoms/SendIcon";
import { useSendButtonAnimation } from "@/hooks/useSendButtonAnimation";

interface SendButtonProps {
  inputValue: string;
}

export function SendButton({ inputValue }: SendButtonProps) {
  const sendButtonRef = useSendButtonAnimation(inputValue);

  return (
    <button
      ref={sendButtonRef}
      type="button"
      className={`mr-4 shrink-0 p-2 text-white hover:text-gray-300 transition-colors ${
        !inputValue.trim() ? "pointer-events-none" : ""
      }`}
      aria-label="Send"
    >
      <SendIcon />
    </button>
  );
}
