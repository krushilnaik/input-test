import { useEffect, useRef, useState } from "react";

/**
 * Hook that observes changes to a data attribute on an element with a specific ID
 * @param elementId - The ID of the element to observe
 * @param dataAttribute - The data attribute to listen for (without 'data-' prefix)
 * @returns The current value of the data attribute (or null if not set)
 */
export function useDataAttributeObserver(elementId: string, dataAttribute: string): string | null {
  const [value, setValue] = useState<string | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const element = document.getElementById(elementId);

    if (!element) {
      console.warn(`Element with ID "${elementId}" not found`);
      setValue(null);
      return;
    }

    // Set initial value
    setValue(element.getAttribute(`data-${dataAttribute}`));

    // Disconnect existing observer if any
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new MutationObserver((mutations) => {
      // mutations array will only have attribute changes we care about
      const newValue = element.getAttribute(`data-${dataAttribute}`);
      setValue(newValue);
    });

    observerRef.current.observe(element, {
      attributes: true,
      attributeFilter: [`data-${dataAttribute}`],
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [elementId, dataAttribute]);

  return value;
}
