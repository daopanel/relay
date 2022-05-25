import styled from 'styled-components';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Arrow2Right from '../../public/assets/images/Arrow2Right';
import X from '../../public/assets/images/X';

interface CreateNewConversationProps {
  close: () => unknown;
}
export default function CreateNewConversation(
  props: CreateNewConversationProps
) {
  const [show, setShow] = useState(false);
  const [inputVal, setInputVal] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    setShow(true);
  }, []);

  const goToMessage = useCallback(() => {
    inputVal.length > 0 && router.push(inputVal);
  }, [router, inputVal]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') goToMessage();
    },
    [goToMessage]
  );

  const handleClose = useCallback(() => {
    setShow(false);
    setTimeout(props.close, 200);
  }, [props.close]);

  const handleClickAway = useCallback(
    (event: any) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        handleClose();
      }
    },
    [handleClose]
  );

  return (
    <MainContainer onBlur={handleClickAway} show={show}>
      <HeadlineContainer>
        <Headline>daopanel.chat/</Headline>
        <UserInput
          placeholder="Enter ENS name or address..."
          autoFocus
          spellCheck={'false'}
          type={'text'}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </HeadlineContainer>
      <RightContainer>
        <CreateButton onClick={goToMessage}>
          <ButtonText>Go to Conversation</ButtonText>
          <Arrow2Right />
        </CreateButton>
        <div onClick={handleClose}>
          <X />
        </div>
      </RightContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div<{ show: boolean }>`
  display: flex;
  justify-content: space-between;
  color: white;
  background: #9867ce;
  padding: 53px 42px;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  transform: translateY(${(props) => (props.show ? '0%' : '-100%')});
  transition: transform 200ms;
  z-index: 5;

  @media (max-width: 950.5px) {
    justify-content: center;
    height: 60px;
  }
`;

const HeadlineContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 350px;
`;
const Headline = styled.h2`
  font-weight: 400;
  font-family: ${({ theme }) => theme.fontFamily.Montserrat};
  font-size: 24px;
  color: #dad0e5;
  order: 1;

  @media (max-width: 950.5px) {
    display: none;
  }
`;

const UserInput = styled.input`
  font-family: ${({ theme }) => theme.fontFamily.Montserrat};
  font-weight: bold;
  border: none;
  font-size: 24px;
  background: transparent;
  color: white;
  order: 3;
  width: 100%;

  ::placeholder {
    color: transparent;
  }

  &:focus {
    outline: none;
  }

  &:focus + div {
    display: none;
  }

  @media (max-width: 950.5px) {
    ::placeholder {
      color: #dad0e5;
      font-size: 20px;
    }
  }
`;

const CreateButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  color: #dad0e5;
  > :nth-child(2) > * {
    stroke: #dad0e5;
    transition: stroke 400ms;
  }
  &:hover > :first-child {
    color: white;
  }
  &:hover > :nth-child(2) > * {
    stroke: white;
  }
`;

const ButtonText = styled.span`
  font-size: 24px;
  font-weight: 400;
  line-height: 29.26px;
  color: #dad0e5;
  margin-right: 21px;
  transition: color 400ms;
  font-family: Montserrat;
  min-width: max-content;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 42px;

  @media (max-width: 950.5px) {
    display: none;
  }

  > :nth-child(2) > :first-child {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    stroke: #dad0e5;
    margin-bottom: 3px;
  }

  > :nth-child(2):hover > :first-child {
    stroke: white;
    cursor: pointer;
  }
`;
