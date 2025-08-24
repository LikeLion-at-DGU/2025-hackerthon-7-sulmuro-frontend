import { useLocation, matchPath } from "react-router-dom";

function useFooterVisible() {
  const { pathname } = useLocation();

  const isHidden =
    !!matchPath({ path: "/ai", end: true }, pathname) ||
    !!matchPath({ path: "/saved/place", end: true }, pathname) ||
    !!matchPath({ path: "/saved/article", end: true }, pathname) ||
    !!matchPath({ path: "/article/:id", end: true }, pathname);

  return !isHidden;
}

export default useFooterVisible;
