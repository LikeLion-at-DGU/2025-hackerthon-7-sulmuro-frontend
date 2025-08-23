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
  const [results, _setResults] = useState<SearchItem[]>([]);
  const [sheetMode, setSheetMode] = useState<SheetMode>("result");

    // ✅ API 훅
    const { data, loading, error, start, reset } = UseImageAPI({
        // authToken: `Bearer ${localStorage.getItem("token") ?? ""}`,
    });

    // pages/CameraSearch/CameraSearchPage.tsx
const handleCaptured = (dataUrl: string | null, file?: File) => {
  setCaptured(dataUrl);

  // 1) 먼저 시트를 연다 + 결과 모드로 전환한다
  setSheetMode("result");
  setOpen(true);

  // 2) 이전 상태 초기화 (로딩/데이터/에러)
  reset();

  // 3) API는 비동기로 시작 (await X)
  const p = file
    ? start({ file })
    : dataUrl
    ? start({ dataUrl, filename: "capture" })
    : Promise.resolve();

  // 4) 실패해도 시트는 열려 있고, ResultSection이 에러 메시지를 보여준다
  p.catch(() => {});
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
              title={data?.answer?.itemName}
              description={data?.answer?.description}
              recommendedStores={data?.answer?.recommendedStores}
              recommendedQuestions={data?.answer?.recommendedquestion?.map(q => q.question)}
              // introMessage={
              //   data?.answer ? `분석 결과: ${data.answer.itemName} — 무엇이든 물어보세요!` : undefined
              // }
              averagePrice={data?.answer?.averagePrice}
            />
            </S.ChatOverlay>
        )}
        </S.Wrapper>
    );
};

export default CameraSearchPage;
