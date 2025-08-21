import image from "./image.jpg";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";

export const savedPlaces = [
  {
    id: 1,
    name: "일호상회인데 긴글씨 테스트중입니다람쥐",
    thumbnailUrl: image,

    address: "East A 23",
  },
  {
    id: 2,
    name: "순희네 빈대떡",
    thumbnailUrl: image,
    address: "주소 영어인가요? 주소도 당연히 예외처리되어있죠",
  },
  {
    id: 3,
    name: "박가네 마약김밥",
    thumbnailUrl: image,
    address: "종로5가역 8번 출구 근처",
  },
];

// 2. 저장한 아티클 리스트
export const savedArticles = [
  {
    id: 1,
    title: "시장에서 시작하는 하루",
    // 사진 5장을 담는 배열
    images: [image1, image2, image1, image2, image1],
    location: "서울광장시장",
  },
  {
    id: 2,
    title: "나 이동건이 보장하는 맛집이요",
    // 사진 5장을 담는 배열
    images: [image1, image2, image1, image2, image1],
    location: "서울광장시장",
  },
];
