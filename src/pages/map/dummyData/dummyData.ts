// src/data/dummyData.ts
import { Place } from "../_types/Marker.type";

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
