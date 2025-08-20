import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 20px;
    background-color: #f8f8f8;
    margin-bottom : 80px;
`;

export const Header = styled.h1`
    font-size: 24px;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
`;

export const ChatBox = styled.div`
    flex: 1;
    height: 120px;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
`;

export const MessageWrapper = styled.div<{ isUser: boolean }>`
    display: flex;
    justify-content: ${({ isUser }) => (isUser ? 'flex-end' : 'flex-start')};
    margin-bottom: 10px;
    background-color: black;
    color: white;
`;

export const Message = styled.div<{ isUser: boolean }>`
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 18px;
    background-color: ${({ isUser }) => (isUser ? '#dcf8c6' : '#f1f0f0')};
    color: #000;
    line-height: 1.4;
    
`;

export const InputWrapper = styled.div`
    display: flex;
    margin-top: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
`;

export const Input = styled.input`
    flex: 1;
    border: none;
    padding: 12px;
    font-size: 16px;
    &:focus {
        outline: none;
    }
`;

export const SendButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
    &:disabled {
        background-color: #aaa;
        cursor: not-allowed;
    }
`;

export const LoadingText = styled.div`
  text-align: center;
  color: #888;
  margin-top: 10px;
`;

export const ErrorText = styled.div`
  text-align: center;
  color: #d9534f;
  margin-top: 10px;
`;