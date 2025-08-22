export type Category =
  | "All"
  | "Clothes"
  | "Food"
  | "ATM"
  | "cafe"
  | "Bar"
  | "Goods";

export interface Place {
  id?: number;
  name: string; // 장소이름
  address: string; // 주소
  lat: number; // 위도
  lng: number; // 경도
  category: Category; // 카테고리
}
