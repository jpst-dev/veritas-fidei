import { ref } from "vue";

export function useFontSize() {
  const fontSize = ref("base");

  const setFontSize = (size: string) => {
    fontSize.value = size;
  };

  const getFontSizeClass = () => {
    return {
      "text-sm": fontSize.value === "sm",
      "text-base": fontSize.value === "base",
      "text-lg": fontSize.value === "lg",
      "text-xl": fontSize.value === "xl",
    };
  };

  return {
    fontSize,
    setFontSize,
    getFontSizeClass,
  };
}
