import { useState } from 'react';
import styled from 'styled-components';
import MessageSendg from '../../public/assets/images/MessageSend';
import TrashCang from '../../public/assets/images/MobileTrashCan';
import React, { useCallback } from 'react';

interface MessageInputProps {
  onSendMessage: (val: string) => unknown;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [inputVal, setInputVal] = useState<string>('');

  const clearInput = useCallback(() => {
    setInputVal('');
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  }, []);

  const handleSend = useCallback(() => {
    if (inputVal.length < 1) return;
    onSendMessage(inputVal);
    setInputVal('');
  }, [inputVal, onSendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSend();
    },
    [handleSend]
  );

  const inputTextCount = inputVal.length;

  return (
    <Container>
      <StyledInput
        placeholder="Type..."
        required
        value={inputVal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoFocus={true}
      />
      <SvgContainer inputTextCount={inputTextCount} onClick={clearInput}>
        <TrashCang />
      </SvgContainer>
      <SvgContainer inputTextCount={inputTextCount} onClick={handleSend}>
        <MessageSendg />
      </SvgContainer>
    </Container>
  );
};
interface StyleProps {
  inputTextCount: number;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  background: #100817;
  backdrop-filter: blur(100px);
  width: 100%;
  height: 68px;
  padding-left: 20px;
  padding-right: 20px;
  gap: 20px;

  @media (max-width: 335px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border-radius: 2px;
  background-color: transparent;
  border: none;
  outline: none;
  &::placeholder {
    color: #75668c;
    font-weight: 400;
  }
  color: white;
  font-size: 18px;
`;

const SvgContainer = styled.div<StyleProps>`
  cursor: pointer;

  &:nth-of-type(2) > :first-child > :first-child {
    stroke: ${({ inputTextCount }) =>
      inputTextCount > 0 ? 'white' : '#75668c'};
  }

  @media (hover: none), (pointer: coarse) {
    display: none;
  }
`;

export default MessageInput;
