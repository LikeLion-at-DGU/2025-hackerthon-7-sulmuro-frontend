import { createBrowserRouter } from "react-router-dom";

// components
import DefaultLayout from "@/components/layout/DefaultLayout";

// pages
import MainPage from "@/pages/main/MainPage";
import CameraSearchPage from "@/pages/CameraSearch/CameraSearchPage";
import { ROUTE_PATHS } from "@/constants/routeConstants";
import MapPage from "@/pages/map/MapPage";
import SavePage from "@/pages/saved/SavedPage";
import DetailPlacePage from "@/pages/saved/DetailPlacePage";
import DetailArticlePage from "@/pages/saved/DetailArticlePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/AI", element: <CameraSearchPage /> },
      { path: ROUTE_PATHS.ARTICLE, element: <MainPage /> },
      { path: ROUTE_PATHS.SAVED, element: <SavePage /> },
      { path: ROUTE_PATHS.TALK, element: <MainPage /> },
      { path: ROUTE_PATHS.MAP, element: <MapPage /> },
      { path: ROUTE_PATHS.SAVED_PLACE, element: <DetailPlacePage /> },
      { path: ROUTE_PATHS.SAVED_ARTICLE, element: <DetailArticlePage /> },
    ],
  },
]);

export default router;
