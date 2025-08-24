const KEY = "markit:bookmarks:places";
const KEY2 = "markit:bookmarks:articles";

// -------------------- 장소 --------------------
export function getPlaceBookmarks(): number[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export function setPlaceBookmarks(ids: number[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {}
}

export function hasPlace(id: number) {
  return getPlaceBookmarks().includes(id);
}

export function addPlace(id: number) {
  const next = Array.from(new Set([...getPlaceBookmarks(), id]));
  setPlaceBookmarks(next);
}

export function removePlace(id: number) {
  const next = getPlaceBookmarks().filter((x) => x !== id);
  setPlaceBookmarks(next);
}

export function togglePlace(id: number) {
  const list = getPlaceBookmarks();
  const exists = list.includes(id);
  exists
    ? setPlaceBookmarks(list.filter((x) => x !== id))
    : setPlaceBookmarks([...list, id]);
  return !exists;
}

// -------------------- 아티클 --------------------
export function getArticleBookmarks(): number[] {
  try {
    const raw = localStorage.getItem(KEY2);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export function setArticleBookmarks(ids: number[]) {
  try {
    localStorage.setItem(KEY2, JSON.stringify(ids));
  } catch {}
}

export function hasArticle(id: number) {
  return getArticleBookmarks().includes(id);
}

export function addArticle(id: number) {
  const next = Array.from(new Set([...getArticleBookmarks(), id]));
  setArticleBookmarks(next);
}

export function removeArticle(id: number) {
  const next = getArticleBookmarks().filter((x) => x !== id);
  setArticleBookmarks(next);
}

export function toggleArticle(id: number) {
  const list = getArticleBookmarks();
  const exists = list.includes(id);
  exists
    ? setArticleBookmarks(list.filter((x) => x !== id))
    : setArticleBookmarks([...list, id]);
  return !exists;
}
