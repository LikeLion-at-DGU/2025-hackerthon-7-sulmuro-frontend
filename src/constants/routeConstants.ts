export const ROUTE_PATHS = {
  MAP: "/",
  ARTICLE: "/article",
  AI : "/ai",
  TALK: "/talk",
  SAVED: "/saved",
  SAVED_PLACE: "/saved/place",
  SAVED_ARTICLE: "/saved/article",
};

export const buildRoute = {
  articleDetail: (id: string) => `${ROUTE_PATHS.ARTICLE}/${id}`,
} as const;