import { useState } from 'react';
import { getAssistance } from '../_apis/getAssistance';

interface ChatMessage {
    role: 'user' | 'model';
    parts: string;
}

export const useAssistance = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]); // 시스템 메시지는 API 호출 시점에 추가
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const sendMessage = async (userMessage: string) => {
        setIsLoading(true);
        setError(null);

        const newUserMessage: ChatMessage = { role: 'user', parts: userMessage };
        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);

        try {
        const response = await getAssistance(updatedMessages);
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'model', parts: response }
        ]);
        } catch (err) {
        setError('챗봇 응답을 받는 데 실패했습니다. 다시 시도해 주세요.');
        } finally {
        setIsLoading(false);
        }
    };

    return { messages, isLoading, error, sendMessage };
};