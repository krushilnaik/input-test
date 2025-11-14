import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function useSendButtonAnimation(inputValue: string) {
  const sendButtonRef = useRef<HTMLButtonElement>(null);
  const hasTextRef = useRef(false);

  useGSAP(() => {
    if (!sendButtonRef.current) return;

    const hasText = inputValue.trim().length > 0;
    const previousState = hasTextRef.current;

    // Only animate if the state actually changed (empty -> has text or has text -> empty)
    if (hasText === previousState) {
      return; // No state change, skip animation
    }

    // Update the ref to track current state
    hasTextRef.current = hasText;

    // Kill any existing animations
    gsap.killTweensOf(sendButtonRef.current);

    if (hasText) {
      // Show button and animate in: scale up from 0, fade in, with bounce effect
      gsap.set(sendButtonRef.current, { display: "block", visibility: "visible" });
      gsap.fromTo(
        sendButtonRef.current,
        {
          scale: 0,
          opacity: 0,
          rotation: -180,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );
    } else {
      // Animate out: scale down, fade out, rotate slightly
      gsap.to(sendButtonRef.current, {
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 0.3,
        ease: "back.in(1.5)",
        onComplete: () => {
          if (sendButtonRef.current) {
            gsap.set(sendButtonRef.current, { display: "none", visibility: "hidden" });
          }
        },
      });
    }
  }, [inputValue]);

  return sendButtonRef;
}
