export const ROUTE_PATHS = {
  MAP: "/",
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
  // ✅ number/string 모두 허용
  articleDetail: (id: number | string) => `${ROUTE_PATHS.ARTICLE}/${id}`,
} as const;
