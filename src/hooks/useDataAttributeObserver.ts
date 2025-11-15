import { useEffect, useState } from "react";

/**
 * Hook that observes changes to a data attribute on an element with a specific ID
 * @param elementId - The ID of the element to observe
 * @param dataAttribute - The data attribute to listen for (without 'data-' prefix)
 * @returns The current value of the data attribute (or null if not set)
 */
export function useDataAttributeObserver(elementId: string, dataAttribute: string): string | null {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const element = document.getElementById(elementId);

    if (!element) {
      console.warn(`Element with ID "${elementId}" not found`);
      return;
    }

    // Set initial value
    setValue(element.getAttribute(`data-${dataAttribute}`));

    // Create a MutationObserver to watch for attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === `data-${dataAttribute}`) {
          const newValue = element.getAttribute(`data-${dataAttribute}`);
          setValue(newValue);
        }
      });
    });

    // Start observing the element for attribute changes
    observer.observe(element, {
      attributes: true,
      attributeFilter: [`data-${dataAttribute}`],
    });

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [elementId, dataAttribute]);

  return value;
}
