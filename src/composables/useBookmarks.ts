import { ref } from "vue";

export function useBookmarks() {
  const bookmarks = ref<string[]>([]);

  const toggleBookmark = (id: string) => {
    const index = bookmarks.value.indexOf(id);
    if (index === -1) {
      bookmarks.value.push(id);
    } else {
      bookmarks.value.splice(index, 1);
    }
  };

  return {
    bookmarks,
    toggleBookmark,
  };
}
