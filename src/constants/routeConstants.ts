export const ROUTE_PATHS = {
  SPLASH: "/",
  MAP: "/map",
  ARTICLE: "/article",
  AI: "/ai",
  TALK: "/talk",
  SAVED: "/marked",
  SAVED_PLACE: "/marked/place",
  SAVED_ARTICLE: "/marked/article",
  ASSISTANCE: "/assistance",
  TextTranslation: "/talk/text",
  VoiceTranslation: "/talk/voice",
};

export const buildRoute = {
  articleDetail: (id: number | string) => `${ROUTE_PATHS.ARTICLE}/${id}`,
} as const;
