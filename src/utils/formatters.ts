/**
 * Returns the appropriate Tailwind CSS classes for a difficulty level
 * @param difficulty Difficulty level (Iniciante, Intermediário, Avançado)
 * @returns Tailwind CSS classes for the difficulty
 */
export const getDifficultyClass = (difficulty: string) => {
  switch (difficulty) {
    case "Iniciante":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Intermediário":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Avançado":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

/**
 * Formats a reading time to include "min" if not already present
 * @param readingTime Reading time string
 * @returns Formatted reading time
 */
export const formatReadingTime = (readingTime: string) => {
  if (!readingTime) return "5 min";

  return readingTime.toLowerCase().includes("min")
    ? readingTime
    : `${readingTime} min`;
};

/**
 * Truncates text to a specified length with ellipsis
 * @param text Text to truncate
 * @param length Maximum length before truncation
 * @returns Truncated text
 */
export const truncateText = (text: string, length: number = 120) => {
  if (!text) return "";
  if (text.length <= length) return text;

  return text.substring(0, length) + "...";
};

export default {
  getDifficultyClass,
  formatReadingTime,
  truncateText,
};
