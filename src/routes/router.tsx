import { createBrowserRouter } from "react-router-dom";

// components
import DefaultLayout from "@/components/layout/DefaultLayout";

// pages
// import MainPage from "@/pages/main/MainPage";
import CameraSearchPage from "@/pages/CameraSearch/CameraSearchPage";
import { ROUTE_PATHS } from "@/constants/routeConstants";
import MapPage from "@/pages/map/MapPage";
import SavePage from "@/pages/saved/SavedPage";
import DetailPlacePage from "@/pages/saved/DetailPlacePage";
import DetailArticlePage from "@/pages/saved/DetailArticlePage";
import ArticlePage from "@/pages/article/ArticlePage";

import ArticleDetailPage from "@/pages/article/ArticleDetailPage"; // ✅ 신규
import TalkPage from "@/pages/talk/TalkPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: ROUTE_PATHS.AI, element: <CameraSearchPage /> },
      // { path: ROUTE_PATHS.ARTICLE, element: <MainPage /> },
      { path: ROUTE_PATHS.SAVED, element: <SavePage /> },
      { path: ROUTE_PATHS.TALK, element: <TalkPage /> },
      { path: ROUTE_PATHS.MAP, element: <MapPage /> },
      { path: ROUTE_PATHS.SAVED_PLACE, element: <DetailPlacePage /> },
      { path: ROUTE_PATHS.SAVED_ARTICLE, element: <DetailArticlePage /> },
      { path: ROUTE_PATHS.ARTICLE, element: <ArticlePage /> },
      { path: `${ROUTE_PATHS.ARTICLE}/:id`, element: <ArticleDetailPage /> },

    ],
  },
]);

export default router;
