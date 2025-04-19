/**
 * Normalizes text by removing special characters, converting to lowercase,
 * and replacing spaces with hyphens for use in URLs or IDs
 * @param text The text to normalize
 * @returns Normalized text string
 */
export const normalizeText = (text: string): string => {
  if (!text) return "";

  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

/**
 * Makes the first letter of each word uppercase
 * @param text The text to capitalize
 * @returns Capitalized text
 */
export const capitalizeWords = (text: string): string => {
  if (!text) return "";

  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default {
  normalizeText,
  capitalizeWords,
};
