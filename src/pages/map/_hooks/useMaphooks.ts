import { Category } from "../_types/Marker.type";

export function mapTypesToCategory(types?: string[]): Category {
  if (!types || types.length === 0) return "Food"; // 기본값 아무거나
  const t = new Set(types);
  if (t.has("restaurant") || t.has("cafe")) return "Food";
  if (t.has("clothing_store") || t.has("shoe_store")) return "Clothes";
  if (t.has("atm") || t.has("bank")) return "ATM";
  return "Food"; // fallback
}
