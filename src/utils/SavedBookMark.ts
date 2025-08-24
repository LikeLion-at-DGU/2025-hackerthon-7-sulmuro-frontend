const KEY = "markit:bookmarks:places";
const KEY2 = "markit:bookmarks:articles";

export function getPlaceBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setPlaceBookmarks(ids: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {}
}

export function hasPlace(id: string | number) {
  const k = String(id);
  return getPlaceBookmarks().includes(k);
}

export function addPlace(id: string | number) {
  const k = String(id);
  const next = Array.from(new Set([...getPlaceBookmarks(), k]));
  setPlaceBookmarks(next);
}

export function removePlace(id: string | number) {
  const k = String(id);
  const next = getPlaceBookmarks().filter((x) => x !== k);
  setPlaceBookmarks(next);
}

export function togglePlace(id: string | number) {
  const k = String(id);
  const list = getPlaceBookmarks();
  const exists = list.includes(k);
  exists
    ? setPlaceBookmarks(list.filter((x) => x !== k))
    : setPlaceBookmarks([...list, k]);
  return !exists;
}

export function getArticleBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(KEY2);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setArticleBookmarks(ids: string[]) {
  try {
    localStorage.setItem(KEY2, JSON.stringify(ids));
  } catch {}
}

export function hasArticle(id: string | number) {
  const k = String(id);
  return getArticleBookmarks().includes(k);
}

export function addArticle(id: string | number) {
  const k = String(id);
  const next = Array.from(new Set([...getArticleBookmarks(), k]));
  setArticleBookmarks(next);
}

export function removeArticle(id: string | number) {
  const k = String(id);
  const next = getArticleBookmarks().filter((x) => x !== k);
  setArticleBookmarks(next);
}

export function toggleArticle(id: string | number) {
  const k = String(id);
  const list = getArticleBookmarks();
  const exists = list.includes(k);
  exists
    ? setArticleBookmarks(list.filter((x) => x !== k))
    : setArticleBookmarks([...list, k]);
  return !exists;
}
