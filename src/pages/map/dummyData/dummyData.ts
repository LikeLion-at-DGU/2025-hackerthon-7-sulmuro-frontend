// src/data/dummyData.ts
export type Category = "Food" | "Clothes" | "Foods" | "ATM";

export interface Place {
  id: string;
  name: string; // 장소이름
  address: string; // 주소
  lat: number; // 위도
  lng: number; // 경도
  category: Category; // 카테고리
}

export const places: Place[] = [
  {
    id: "p1",
    name: "테스트 음식점 A",
    address: "서울 종로구",
    lat: 37.570615, // 기본 위치(37.570115, 126.999706) 근처
    lng: 126.999806,
    category: "Food",
  },
  {
    id: "p2",
    name: "테스트 옷가게 B",
    address: "서울 종로구",
    lat: 37.569515,
    lng: 126.999406,
    category: "Clothes",
  },
  {
    id: "p3",
    name: "테스트 식료 잡화 C",
    address: "서울 종로구",
    lat: 37.570915,
    lng: 126.999506,
    category: "Foods",
  },
  {
    id: "p4",
    name: "테스트 ATM D",
    address: "서울 종로구",
    lat: 37.569715,
    lng: 127.000406,
    category: "ATM",
  },
  {
    id: "p5",
    name: "테스트 음식점 E",
    address: "서울 종로구",
    lat: 37.570315,
    lng: 127.000606,
    category: "Food",
  },
];
