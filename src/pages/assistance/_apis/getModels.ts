import { GoogleGenerativeAI } from '@google/generative-ai';

// API 키를 환경 변수에서 가져옵니다.
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function listAvailableModels() {
    try {
        const models = await genAI.listModels();
        console.log("사용 가능한 모델 목록:");
        models.forEach((model) => {
        console.log(`- 모델명: ${model.name}`);
        console.log(`  지원 메서드: ${model.supportedGenerationMethods.join(', ')}`);
        console.log('---');
        });
    } catch (error) {
        console.error("모델 목록을 불러오는 중 오류가 발생했습니다:", error);
    }
}