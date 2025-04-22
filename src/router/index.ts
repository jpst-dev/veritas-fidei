import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoriesView from "../views/CategoriesView.vue";
import CategoryView from "../views/CategoryView.vue";
import SubcategoryView from "../views/SubcategoryView.vue";
import TopicView from "../views/TopicView.vue";
import TopicsView from "../views/TopicsView.vue";
import SearchView from "../views/SearchView.vue";
import TagView from "../views/TagView.vue";
import AboutView from "../views/AboutView.vue";
import NotFoundView from "../views/NotFoundView.vue";

// Configuração de meta tags padrão
const defaultMeta = {
  title: "Veritas Fidei",
  description:
    "Respostas fundamentadas para as principais questões sobre a fé católica",
};

// Configuração de rotas
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
    meta: {
      ...defaultMeta,
      title: "Veritas Fidei - Portal de Estudos e Discussões",
      description:
        "Explore artigos, estudos e discussões sobre a verdade da fé, filosofia, teologia e apologética católica.",
    },
  },
  {
    path: "/explorar",
    name: "explore",
    component: CategoriesView,
    meta: {
      ...defaultMeta,
      title: "Explorar - Veritas Fidei",
      description:
        "Navegue por nossas categorias e descubra conteúdo organizado por temas",
    },
  },
  {
    path: "/explorar/:categoryId",
    name: "category",
    component: CategoryView,
    props: true,
    meta: {
      ...defaultMeta,
      title: "Categoria - Veritas Fidei",
      description: "Conteúdo específico da categoria selecionada",
    },
  },
  {
    path: "/explorar/:categoryId/:subcategoryId",
    name: "subcategory",
    component: SubcategoryView,
    props: true,
    meta: {
      ...defaultMeta,
      title: "Subcategoria - Veritas Fidei",
      description: "Conteúdo específico da subcategoria selecionada",
    },
  },
  {
    path: "/topicos",
    name: "topics",
    component: () => import("@/views/TopicsView.vue"),
    meta: {
      ...defaultMeta,
      title: "Tópicos - Veritas Fidei",
      description:
        "Explore nossos tópicos sobre a verdade da fé, filosofia, teologia e apologética católica.",
    },
  },
  {
    path: "/explorar/:categoryId/:subcategoryId/:topicId",
    name: "topic",
    component: TopicView,
    props: true,
    meta: {
      ...defaultMeta,
      title: "Tópico - Veritas Fidei",
      description: "Conteúdo detalhado do tópico selecionado",
    },
  },
  {
    path: "/buscar",
    name: "search",
    component: SearchView,
    meta: {
      ...defaultMeta,
      title: "Buscar - Veritas Fidei",
      description: "Encontre conteúdo específico através da busca",
    },
  },
  {
    path: "/tags",
    name: "tags",
    component: TagView,
    meta: {
      ...defaultMeta,
      title: "Tags - Veritas Fidei",
      description: "Explore conteúdo através de tags",
    },
  },
  {
    path: "/tags/:tagId",
    name: "tag",
    component: TagView,
    props: true,
    meta: {
      ...defaultMeta,
      title: "Tag - Veritas Fidei",
      description: "Conteúdo relacionado à tag selecionada",
    },
  },
  {
    path: "/sobre",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
    meta: {
      ...defaultMeta,
      title: "Sobre - Veritas Fidei",
      description:
        "Conheça mais sobre o Veritas Fidei, nosso propósito e missão.",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
    meta: {
      ...defaultMeta,
      title: "Página não encontrada - Veritas Fidei",
      description: "A página que você está procurando não existe",
    },
  },
];

// Criação do router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

// Middleware para atualização de meta tags
router.beforeEach((to, from, next) => {
  // Atualiza o título da página
  document.title = to.meta.title as string;

  // Atualiza meta tags
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", to.meta.description as string);
  }

  // Atualiza meta tags para Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector(
    'meta[property="og:description"]'
  );
  const ogUrl = document.querySelector('meta[property="og:url"]');

  if (ogTitle) ogTitle.setAttribute("content", to.meta.title as string);
  if (ogDescription)
    ogDescription.setAttribute("content", to.meta.description as string);
  if (ogUrl) ogUrl.setAttribute("content", window.location.href);

  next();
});

export default router;
