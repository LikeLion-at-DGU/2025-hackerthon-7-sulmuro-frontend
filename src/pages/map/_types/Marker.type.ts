export type Category = "Food" | "Clothes" | "Foods" | "ATM";

export interface Place {
  id: string;
  name: string; // 장소이름
  address: string; // 주소
  lat: number; // 위도
  lng: number; // 경도
  category: Category; // 카테고리
}
