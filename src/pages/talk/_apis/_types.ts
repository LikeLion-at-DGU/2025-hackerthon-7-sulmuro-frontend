// src/pages/talk/_apis/_types.ts

// `as const`를 사용하여 좁은(literal) 타입으로 정의
export const PLACE_OPTIONS = ["서울광장시장"] as const;

// `typeof PLACE_OPTIONS[number]`를 사용하여 Union Type을 생성
export type Place = typeof PLACE_OPTIONS[number];