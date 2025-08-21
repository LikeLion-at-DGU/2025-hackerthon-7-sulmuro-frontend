import { useLocation, matchPath } from "react-router-dom";

const hideFooterPatterns = ["/talk", "/ai", "saved/place", "saved/article"];

function useFooterVisible() {
  const location = useLocation();
  const isHidden = hideFooterPatterns.some((pattern: string) =>
    matchPath({ path: pattern, end: true }, location.pathname)
  );
  return !isHidden;
}

export default useFooterVisible;
