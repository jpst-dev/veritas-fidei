// Este arquivo agora é apenas um barrel file (arquivo de reexportação)
// Todas as definições foram movidas para a pasta categories/

export { categories } from "./categories/index";

export type {
  Category,
  Subcategory,
  Topic,
  Reference,
} from "./categories/types";
