import React, { useState, useEffect, useRef } from 'react';
import { useAssistance } from './_hooks/useAssistance';
import * as S from './Assistansce.styled';

const AssistancePage: React.FC = () => {
    const [input, setInput] = useState('');
    const { messages, isLoading, error, sendMessage } = useAssistance();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
        if (input.trim()) {
        sendMessage(input);
        setInput('');
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <S.Container>
        <S.Header>광장 시장 가이드 챗봇</S.Header>
        <S.ChatBox>
            {messages.map((msg, index) => (
            <S.MessageWrapper key={index} isUser={msg.role === 'user'}>
                <S.Message isUser={msg.role === 'user'}>
                {msg.parts}
                </S.Message>
            </S.MessageWrapper>
            ))}
            {isLoading && <S.LoadingText>응답 생성 중...</S.LoadingText>}
            <div ref={messagesEndRef} />
        </S.ChatBox>
        <S.InputWrapper>
            <S.Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="궁금한 것을 물어보세요!"
            />
            <S.SendButton onClick={handleSend} disabled={isLoading}>
            전송
            </S.SendButton>
        </S.InputWrapper>
        {error && <S.ErrorText>{error}</S.ErrorText>}
        </S.Container>
    );
};

export default AssistancePage;