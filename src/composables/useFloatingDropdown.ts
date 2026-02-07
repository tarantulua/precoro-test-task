import { ref, type Ref } from "vue";

export function useFloatingDropdown(
  anchorRef: Ref<HTMLElement | null>,
  maxRem: number,
) {
  const dropdownStyles = ref<Record<string, string>>({});

  const updatePosition = () => {
    if (!anchorRef.value) return;

    const rect = anchorRef.value.getBoundingClientRect();
    const dropdownHeight = maxRem * 16; // rem to px
    const spaceBelow = window.innerHeight - rect.bottom;
    const showAbove = spaceBelow < dropdownHeight && rect.top > dropdownHeight;

    dropdownStyles.value = {
      position: "fixed",
      left: `${rect.left}px`,
      width: `${rect.width}px`,
      top: showAbove ? `${rect.top - dropdownHeight}px` : `${rect.bottom}px`,
      zIndex: "9999",
      border: "1px solid var(--border-color-input)",
      borderTop: showAbove ? "1px solid var(--border-color-input)" : "none",
      borderBottom: showAbove ? "none" : "1px solid var(--border-color-input)",
      borderRadius: showAbove ? "0.5rem 0.5rem 0 0" : "0 0 0.5rem 0.5rem",
    };
  };

  return { dropdownStyles, updatePosition };
}
