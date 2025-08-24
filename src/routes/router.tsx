// router.tsx
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "@/components/layout/DefaultLayout";
import CameraSearchPage from "@/pages/CameraSearch/CameraSearchPage";
import { ROUTE_PATHS } from "@/constants/routeConstants";
import MapPage from "@/pages/map/MapPage";
import SavePage from "@/pages/saved/SavedPage";
import DetailPlacePage from "@/pages/saved/DetailPlacePage";
import DetailArticlePage from "@/pages/saved/DetailArticlePage";
import ArticlePage from "@/pages/article/ArticlePage";
import ArticleDetailPage from "@/pages/article/ArticleDetailPage";
import TalkPage from "@/pages/talk/TalkPage";
import TextTranslation from "@/pages/talk/_components/TextTranslation";
import VoiceTranslation from "@/pages/talk/_components/VoiceTranslation";
import NotFound from "@/pages/notFound/NotFound";
import SplashPage from "@/pages/splash/SplashPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: ROUTE_PATHS.AI, element: <CameraSearchPage /> },
      { path: ROUTE_PATHS.SAVED, element: <SavePage /> },
      { path: ROUTE_PATHS.TALK, element: <TalkPage /> },
      { path: ROUTE_PATHS.MAP, element: <MapPage /> },
      { path: ROUTE_PATHS.SAVED_PLACE, element: <DetailPlacePage /> },
      { path: ROUTE_PATHS.SAVED_ARTICLE, element: <DetailArticlePage /> },
      { path: ROUTE_PATHS.ARTICLE, element: <ArticlePage /> },
      { path: `${ROUTE_PATHS.ARTICLE}/:id`, element: <ArticleDetailPage /> },
      { path: ROUTE_PATHS.TextTranslation, element: <TextTranslation /> },
      { path: ROUTE_PATHS.VoiceTranslation, element: <VoiceTranslation /> },
      { path: ROUTE_PATHS.SPLASH, element: <SplashPage /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
