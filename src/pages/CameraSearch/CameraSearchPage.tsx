// pages/CameraSearch/CameraSearchPage.tsx
import { useState } from "react";
import * as S from "./CameraSearchPage.styled";
import CameraCapture from "./_components/_camera/CameraCapture";
import ResultSection, { SearchItem } from "./_components/_result/ResultSection";
import AIChat from "./_components/_result/AIChat";

type SheetMode = "result" | "chat";

const CameraSearchPage = () => {
    const [open, setOpen] = useState(false);
    const [captured, setCaptured] = useState<string | null>(null);
    const [results, setResults] = useState<SearchItem[]>([]);
    const [sheetMode, setSheetMode] = useState<SheetMode>("result");

    const handleCaptured = async (dataUrl: string | null, file?: File) => {
        setCaptured(dataUrl);
        // setResults([...]); // 필요시 결과 세팅
        setSheetMode("result");
        setOpen(true); // 바텀시트 열기
    };

    const closeSheet = () => {
        setOpen(false);
        setSheetMode("result");
    };

    // ✅ ResultSection이 위로 스와이프 전환 신호를 주면: 시트를 닫고 Chat 띄우기
    const switchToChat = () => {
        setOpen(false);           // ResultSection 언마운트(닫힘)
        setSheetMode("chat");     // AIChat 오버레이 표시
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
                onSwitchToChat={switchToChat}   // ⬅️ 위로 스와이프 시 호출
            />
        )}

        {sheetMode === "chat" && (
            <S.ChatOverlay>                {/* 얕은 시트 형태의 오버레이 */}
                <AIChat captured={captured ?? undefined} />
            </S.ChatOverlay>
        )}
        </S.Wrapper>
    );
};

export default CameraSearchPage;
