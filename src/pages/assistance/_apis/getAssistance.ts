import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// Gemini API 키를 환경 변수에서 가져옵니다.
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// API 클라이언트 초기화
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// 모델 선택 (예: gemini-pro)
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

interface ChatMessage {
    role: 'user' | 'model';
    parts: string;
}
interface ChatMessage {
    role: 'user' | 'model';
    parts: string;
}

// 챗봇으로부터 응답을 받는 함수
export const getAssistance = async (history: ChatMessage[]): Promise<string> => {
    // 'system' 프롬프트는 직접 전달할 수 없으므로, 대화 기록에 포함시켜 컨텍스트를 제공합니다.
    const systemPrompt = "You are a tourist guide at Gwangjang Market in Seoul. Answer questions about the market kindly and in detail.";
    
    // Gemini API는 'user'와 'model' 두 가지 역할만 사용합니다.
    // 시스템 프롬프트를 대화의 맨 처음에 'user' 역할로 추가하여 컨텍스트를 제공합니다.
    const formattedHistory = [
        { role: 'user', parts: systemPrompt },
        ...history,
    ].map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.parts }]
    }));
    
    // Gemini의 대화 API를 활용합니다.
    const chat = model.startChat({
        history: formattedHistory,
        safetySettings: [
            {
                // 'category'는 어떤 유해성 카테고리인지 지정합니다.
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                // 'threshold'는 해당 카테고리에 대한 차단 수준을 지정합니다.
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
        ],
        
    });

    try {
        // 사용자의 최신 메시지를 전송합니다.
        const result = await chat.sendMessage(history[history.length - 1].parts);
        const response = await result.response;
        return response.text();

    } catch (error) {
        console.error('Gemini API 호출 중 오류 발생:', error);
        throw new Error('챗봇 응답을 가져오는 데 실패했습니다.');
    }
    };