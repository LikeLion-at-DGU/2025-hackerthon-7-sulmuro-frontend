// pages/CameraSearch/CameraSearchPage.tsx
import { useState } from "react";
import * as S from "./CameraSearchPage.styled";
import CameraCapture from "./_components/_camera/CameraCapture";
import ResultSection, { SearchItem } from "./_components/_result/ResultSection";

const CameraSearchPage = () => {
const [open, setOpen] = useState(false);
const [captured, setCaptured] = useState<string | null>(null);
const [results, setResults] = useState<SearchItem[]>([]);

const handleCaptured = async (dataUrl: string | null, file?: File) => {
// TODO: 백엔드 이미지 검색 API 연동
// 예시) const form = new FormData(); form.append("image", file ?? dataUrlBlob);
// const res = await instance.post("/api/search", form); setResults(res.data);
setCaptured(dataUrl);

// 🔧 데모용 목데이터
// setResults([
//     {
//     id: "1",
//     title: "떡볶이",
//     subtitle: "매콤달콤 즉석 떡볶이",
//     thumbnail: dataUrl ?? "",
//     },
//     {
//     id: "2",
//     title: "순대",
//     subtitle: "모둠 순대 & 내장",
//     thumbnail: dataUrl ?? "",
//     },
// ]);

setOpen(true);
};

return (
    <S.Wrapper>
        <CameraCapture onCaptured={handleCaptured} />
        <ResultSection
            open={open}
            onClose={() => setOpen(false)}
            captured={captured ?? undefined}
            items={results}
        />
    </S.Wrapper>
);
};

export default CameraSearchPage;
