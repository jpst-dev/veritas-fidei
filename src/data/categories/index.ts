import { filosofiaTeologia } from "./filosofia-teologia";
import { escrituraTradicao } from "./escritura-tradicao";
import { historiaIgreja } from "./historia-igreja";
import { doutrina } from "./doutrina";
import { objeccoesComuns } from "./objeccoes-comuns";
import { papado } from "./papado";
import { mariologia } from "./mariologia";
import type { Category, Subcategory, Topic, Reference, Stats } from "./types";

// Importar todas as categorias dos arquivos individuais
export const categories: Category[] = [
  filosofiaTeologia,
  escrituraTradicao,
  historiaIgreja,
  doutrina,
  objeccoesComuns,
  papado,
  mariologia,
];

// Re-exportar os tipos
export type { Category, Subcategory, Topic, Reference, Stats } from "./types";
