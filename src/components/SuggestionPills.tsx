import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SparkleIcon } from "../atoms/SparkleIcon";
import { InfoIcon } from "../atoms/InfoIcon";
import { ChecklistIcon } from "../atoms/ChecklistIcon";
import { LightbulbIcon } from "../atoms/LightbulbIcon";

interface SuggestionPill {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const SUGGESTION_PILLS: SuggestionPill[] = [
  {
    id: "suggested",
    label: "Suggested",
    icon: <SparkleIcon className="w-3.5 h-3.5" />,
  },
  {
    id: "needs-attention",
    label: "Needs Attention",
    icon: <InfoIcon className="w-3.5 h-3.5" />,
  },
  {
    id: "deliverables",
    label: "Deliverables",
    icon: <ChecklistIcon className="w-3.5 h-3.5" />,
  },
  {
    id: "opportunities",
    label: "Opportunities",
    icon: <LightbulbIcon className="w-3.5 h-3.5" />,
  },
];

interface SuggestionPillsProps {
  shouldAnimate: boolean;
}

export function SuggestionPills({ shouldAnimate }: SuggestionPillsProps) {
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Set initial state for all pills
  useGSAP(() => {
    pillRefs.current.forEach((pillRef) => {
      if (pillRef) {
        gsap.set(pillRef, {
          opacity: 0,
          y: 30,
          scale: 1,
        });
      }
    });
  }, []);

  // Animate pills in with stagger after input animation completes
  useGSAP(() => {
    if (shouldAnimate) {
      // Wait for input animation to complete (1 second) before starting pill animation
      const timer = setTimeout(() => {
        pillRefs.current.forEach((pillRef, index) => {
          if (pillRef) {
            gsap.to(pillRef, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              delay: index * 0.1, // Stagger delay
            });
          }
        });
      }, 500); // Wait 1 second for input animation to complete

      return () => clearTimeout(timer);
    }
  }, [shouldAnimate]);

  const handleMouseEnter = (index: number) => {
    const pillRef = pillRefs.current[index];
    if (pillRef) {
      gsap.to(pillRef, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    const pillRef = pillRefs.current[index];
    if (pillRef) {
      gsap.to(pillRef, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <div className="flex gap-3 mt-4">
      {SUGGESTION_PILLS.map((pill, index) => {
        let borderColor: string;
        let textColor: string;

        if (pill.id === "suggested") {
          borderColor = "border-orange-500";
          textColor = "text-orange-500";
        } else if (pill.id === "needs-attention") {
          borderColor = "border-yellow-400";
          textColor = "text-yellow-400";
        } else if (pill.id === "deliverables") {
          borderColor = "border-cyan-400";
          textColor = "text-cyan-400";
        } else {
          borderColor = "border-green-400";
          textColor = "text-green-400";
        }

        return (
          <div
            key={pill.id}
            ref={(el) => {
              pillRefs.current[index] = el;
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            className={`rounded-full px-4 py-2 bg-black/20 border-2 ${borderColor} glass cursor-pointer`}
          >
            <div className={`flex items-center gap-2 ${textColor}`}>
              {pill.icon}
              <span className="text-sm font-medium">{pill.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
