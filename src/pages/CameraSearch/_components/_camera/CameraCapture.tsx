// pages/CameraSearch/_components/_camera/CameraCapture.tsx
import { useEffect, useRef, useState } from "react";
import * as S from "./CameraCapture.styled";

type Props = {
    onCaptured: (dataUrl: string | null, file?: File) => void;
};

type CameraStatus = "init" | "loading" | "ready" | "error";

const CameraCapture = ({ onCaptured }: Props) => {
const videoRef = useRef<HTMLVideoElement | null>(null);
const frameRef = useRef<HTMLDivElement | null>(null);
const canvasRef = useRef<HTMLCanvasElement | null>(null);

const [status, setStatus] = useState<CameraStatus>("init");
const [errorMsg, setErrorMsg] = useState<string>("");

// 현재 사용 중인 스트림 저장해서 재시도/정리
const currentStream = useRef<MediaStream | null>(null);

const stopStream = () => {
currentStream.current?.getTracks().forEach((t) => t.stop());
currentStream.current = null;
};

const explainError = (err: unknown) => {
    const e = err as DOMException & { name?: string; message?: string };
    switch (e?.name) {
        case "NotAllowedError":
        return "카메라 권한이 거부되었습니다. 브라우저 주소창의 자물쇠 아이콘 → 사이트 설정 → 카메라 ‘허용’으로 변경해주세요.";
        case "NotFoundError":
        case "OverconstrainedError":
        return "사용 가능한 카메라를 찾지 못했습니다. 외부 카메라 연결 또는 후면 카메라가 없는 기기일 수 있어요.";
        case "NotReadableError":
        return "다른 앱이 카메라를 사용 중이거나 장치 접근에 실패했습니다. 다른 앱을 종료하고 다시 시도하세요.";
        case "SecurityError":
        return "보안 환경에서만 카메라를 사용할 수 있습니다. HTTPS 또는 localhost 환경에서 접속해주세요.";
        default:
        return e?.message || "알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.";
    }
    };

    const openStream = async () => {
    stopStream();

    if (!window.isSecureContext && location.hostname !== "localhost") {
        setStatus("error");
        setErrorMsg("보안 연결(HTTPS)에서만 카메라를 사용할 수 있어요. HTTPS로 접속해 주세요.");
        return;
    }
    if (!("mediaDevices" in navigator) || !navigator.mediaDevices?.getUserMedia) {
        setStatus("error");
        setErrorMsg("이 브라우저는 카메라 API를 지원하지 않습니다. 다른 브라우저를 이용해 주세요.");
        return;
    }

    setStatus("loading");
    try {
        // 1순위: 후면 카메라 시도
        let stream: MediaStream | null = null;
        try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: "environment" } },
            audio: false,
        });
        } catch {
        // 2순위: 아무 비디오(전면일 수 있음)
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        }

        currentStream.current = stream;
        if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
            await videoRef.current.play();
            setStatus("ready");
        } catch (playErr) {
            // 자동재생이 막힌 경우(모바일) - 탭으로 시작 유도
            setStatus("error");
            setErrorMsg("자동 재생이 차단되었습니다. 화면을 탭하여 카메라를 시작해주세요.");
        }
        } else {
        setStatus("error");
        setErrorMsg("비디오 엘리먼트를 초기화하지 못했습니다.");
        }
    } catch (err) {
        setStatus("error");
        setErrorMsg(explainError(err));
    }
};

// 최초 진입 시 카메라 시도
useEffect(() => {
    openStream();
    return stopStream; // 언마운트 시 정리
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 탭해서 play 재시도(모바일 자동재생 차단 시)
    const handleTapToPlay = async () => {
    try {
        await videoRef.current?.play();
        setStatus("ready");
    } catch (err) {
        setStatus("error");
        setErrorMsg(explainError(err));
    }
};

// 프레임 영역만 캡처
const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!video || !canvas || !frame) return;
    if (!video.videoWidth || !video.videoHeight) return;

    const videoRect = video.getBoundingClientRect();
    const frameRect = frame.getBoundingClientRect();

    const scaleX = video.videoWidth / videoRect.width;
    const scaleY = video.videoHeight / videoRect.height;

    const sx = (frameRect.left - videoRect.left) * scaleX;
    const sy = (frameRect.top - videoRect.top) * scaleY;
    const sw = frameRect.width * scaleX;
    const sh = frameRect.height * scaleY;

    canvas.width = Math.round(sw);
    canvas.height = Math.round(sh);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    onCaptured(dataUrl);
};

// 업로드 대체
const onSelectFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => onCaptured(String(reader.result), file);
    reader.readAsDataURL(file);
    };

    // 에러/로딩 오버레이
    const renderOverlay = () => {
        if (status === "loading") {
            return (
            <S.Overlay role="status" aria-live="polite">
                <S.Spinner />
                <S.OverlayTitle>카메라 시작 중…</S.OverlayTitle>
                <S.OverlayDesc>잠시만 기다려 주세요.</S.OverlayDesc>
            </S.Overlay>
            );
        }
        if (status === "error") {
            return (
            <S.Overlay role="alert" aria-live="assertive" onClick={handleTapToPlay}>
                <S.OverlayTitle>카메라를 시작할 수 없습니다</S.OverlayTitle>
                <S.OverlayDesc>{errorMsg}</S.OverlayDesc>
                <S.OverlayActions>
                <S.PrimaryButton onClick={openStream}>다시 시도</S.PrimaryButton>
                <S.UploadLabel>
                    이미지 업로드
                    <input type="file" accept="image/*" onChange={onSelectFile} hidden />
                </S.UploadLabel>
                </S.OverlayActions>
                <S.OverlayHint>모바일인 경우 화면을 탭하면 재생이 시작될 수 있어요.</S.OverlayHint>
            </S.Overlay>
            );
        }
        return null;
    };

    return (
    <S.Wrap>
        <S.Video ref={videoRef} playsInline muted onClick={handleTapToPlay} />
        <S.Frame ref={frameRef}>
        <S.Crosshair>+</S.Crosshair>
        </S.Frame>

        <S.BottomBar>
        <S.Hint>focus on the frame</S.Hint>
        <S.Actions>
            <S.CaptureButton aria-label="capture" onClick={handleCapture}>
            🔍
            </S.CaptureButton>

            <S.UploadLabel>
            upload image
            <input type="file" accept="image/*" onChange={onSelectFile} hidden />
            </S.UploadLabel>
        </S.Actions>
        </S.BottomBar>

        {/* 상태 오버레이 */}
        {renderOverlay()}

        {/* 캡쳐용 캔버스 (표시 안 함) */}
        <canvas ref={canvasRef} style={{ display: "none" }} />
    </S.Wrap>
    );
};

export default CameraCapture;
