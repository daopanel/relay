import { useState } from 'react';
import styled from 'styled-components';
import MessageSend from '../../../public/assets/images/MessageSend.svg';
import MessageInputIcon from '../../../public/assets/images/MessageInput.svg';
import Image from 'next/image';
import React, { useCallback } from 'react';

interface MessageInputProps {
  onSendMessage: (val: string) => unknown;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [inputVal, setInputVal] = useState<string>('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  }, []);

  const handleSend = useCallback(() => {
    onSendMessage(inputVal);
    setInputVal('');
  }, [inputVal, onSendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSend();
    },
    [handleSend]
  );

  return (
    <Container>
      <Image alt="lable" src={MessageInputIcon} />
      <StyledInput
        placeholder="Your message..."
        required
        value={inputVal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Send alt="send" src={MessageSend} onClick={handleSend} />
    </Container>
  );
};

const Send = styled(Image)`
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  background: #100817;
  backdrop-filter: blur(100px);
  width: 100%;
  height: 96px;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const StyledInput = styled.input`
  flex: 1;
  margin-right: 10px;
  margin-left: 24px;
  border: 1px solid #eee;
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
  font-family: ${({ theme }) => theme.fontFamily.Inter};
`;

export default MessageInput;
