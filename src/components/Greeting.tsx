interface Props {
  hasAnimated: boolean;
  setHasAnimated: (value: boolean) => void;
}

export function Greeting({ hasAnimated, setHasAnimated }: Props) {
  const greetingText = "Good evening, Krushil.";
  return (
    <div className="space-y-3 font-light greeting-text flex gap-2">
      <span>stars</span>
      <h1
        className={`text-5xl bg-linear-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent leading-normal pb-1 overflow-visible ${hasAnimated ? "" : "animate-shimmer-in"}`}
        onAnimationEnd={() => {
          if (!hasAnimated) {
            setHasAnimated(true);
            sessionStorage.setItem("text-shimmer-animated", "true");
          }
        }}
      >
        {greetingText}
      </h1>
    </div>
  );
}
