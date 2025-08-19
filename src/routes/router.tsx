import { createBrowserRouter } from "react-router-dom";

// components
import DefaultLayout from "@/components/layout/DefaultLayout";

// pages
import MainPage from "@/pages/main/MainPage";
import CameraSearchPage from "@/pages/CameraSearch/CameraSearchPage";
import { ROUTE_PATHS } from "@/constants/routeConstants";
import MapPage from "@/pages/map/MapPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/AI", element: <CameraSearchPage /> },
      { path: ROUTE_PATHS.ARTICLE, element: <MainPage /> },
      { path: ROUTE_PATHS.SAVED, element: <MainPage /> },
      { path: ROUTE_PATHS.TALK, element: <MainPage /> },
      { path: ROUTE_PATHS.MAP, element: <MapPage /> },
    ],
  },
]);

export default router;
