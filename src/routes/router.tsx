import { createBrowserRouter } from "react-router-dom";

// components
import DefaultLayout from "@/components/layout/DefaultLayout";

// pages
import MainPage from "@/pages/main/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [{ path: "/main", element: <MainPage /> }],
  },
]);

export default router;
