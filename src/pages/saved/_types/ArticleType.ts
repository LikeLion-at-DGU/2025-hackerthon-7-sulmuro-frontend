import { Category } from "@/pages/map/_types/Marker.type";

export interface ArticleType {
  id: number;
  title: string;
  subTitle: string;
  theme: Category;
  location: string;
  imageUrls: string[];
}
