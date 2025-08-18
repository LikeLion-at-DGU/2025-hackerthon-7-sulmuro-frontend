import { Category } from "../_types/Marker.type";

export function mapTypesToCategory(types?: string[]): Category {
  if (!types || types.length === 0) return "All"; // 기본값 아무거나
  const t = new Set(types);
  if (t.has("atm") || t.has("fast_food_restaurant")) return "ATM";
  if (t.has("restaurant") || t.has("fast_food_restaurant")) return "Foods";
  if (t.has("clothing_store") || t.has("shoe_store")) return "Clothes";
  if (
    t.has("cafe") ||
    t.has("dog_cafe ") ||
    t.has("cafeteria ") ||
    t.has("cat_cafe")
  )
    return "Cafe";
  if (t.has("bar") || t.has("wine_bar") || t.has("pub")) return "Bar";
  return "All";
}
