// pages/CameraSearch/CameraSearchPage.tsx
import { useState } from "react";
import * as S from "./CameraSearchPage.styled";
import CameraCapture from "./_components/_camera/CameraCapture";
import ResultSection, { SearchItem } from "./_components/_result/ResultSection";
import AIChat from "./_components/_result/AIChat";
import { UseImageAPI } from "./_hooks/UseImageAPI"; // ✅ 추가

type SheetMode = "result" | "chat";

const CameraSearchPage = () => {
    const [open, setOpen] = useState(false);
    const [captured, setCaptured] = useState<string | null>(null);
    const [results, setResults] = useState<SearchItem[]>([]);
    const [sheetMode, setSheetMode] = useState<SheetMode>("result");

    // ✅ API 훅
    const { data, loading, error, start, reset } = UseImageAPI({
        // authToken: `Bearer ${localStorage.getItem("token") ?? ""}`,
    });

    const handleCaptured = async (dataUrl: string | null, file?: File) => {
        setCaptured(dataUrl);

        // ✅ API 호출
        try {
        reset();
        if (file) {
            await start({ file });
        } else if (dataUrl) {
            await start({ dataUrl, filename: "capture" });
        }
        } catch (e) {
        /* 에러는 ResultSection에서 표시 */
        }

        setSheetMode("result");
        setOpen(true); // 바텀시트 열기
    };

    const closeSheet = () => {
        setOpen(false);
        setSheetMode("result");
    };

    // ✅ ResultSection이 위로 스와이프 전환 신호를 주면: 시트를 닫고 Chat 띄우기
    const switchToChat = () => {
        setOpen(false); // ResultSection 언마운트(닫힘)
        setSheetMode("chat"); // AIChat 오버레이 표시
    };

    return (
        <S.Wrapper>
        <CameraCapture onCaptured={handleCaptured} />

        {sheetMode === "result" && (
            <ResultSection
            open={open}
            onClose={closeSheet}
            captured={captured ?? undefined}
            items={results}
            onSwitchToChat={switchToChat}
            // ✅ API 데이터 바인딩
            loading={loading}
            errorMsg={error instanceof Error ? error.message : undefined}
            answer={data?.answer}
            />
        )}

        {sheetMode === "chat" && (
            <S.ChatOverlay>
            <AIChat
                captured={captured ?? undefined}
                roomId={data?.roomId}
                recommendedQuestions={data?.answer?.recommendedquestion?.map((q) => q.question) ?? []}
                introMessage={
                data?.answer
                    ? `분석 결과: ${data.answer.itemName} — 무엇이든 물어보세요!`
                    : undefined
                }
            />
            </S.ChatOverlay>
        )}
        </S.Wrapper>
    );
};

export default CameraSearchPage;
