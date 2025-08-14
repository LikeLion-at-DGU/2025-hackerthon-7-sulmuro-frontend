import { createBrowserRouter } from "react-router-dom";

// components
import DefaultLayout from "@/components/layout/DefaultLayout";

// pages
import MainPage from "@/pages/main/MainPage";
import CameraSearchPage from "@/pages/CameraSearch/CameraSearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/main", element: <MainPage /> },
      { path: "/AI", element: <CameraSearchPage /> }


    ],
  },
]);

export default router;
