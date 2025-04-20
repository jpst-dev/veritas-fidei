import { ref } from "vue";

export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) {
  const timeoutRef = ref<number>();

  const debouncedFn = (...args: Parameters<T>) => {
    if (timeoutRef.value) {
      clearTimeout(timeoutRef.value);
    }

    timeoutRef.value = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };

  return debouncedFn;
}
