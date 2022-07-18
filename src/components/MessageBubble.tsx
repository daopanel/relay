import styled, { CSSProperties } from 'styled-components';

interface TextBubbleProps {
  message: string;
  backgroundColor: string;
  color: string;
}

const MessageBubble = (props: TextBubbleProps) => {
  return (
    <TextWrapper
      style={{ '--background': props.backgroundColor } as CSSProperties}>
      <MessageText style={{ '--color': props.color } as CSSProperties}>
        {props.message}
      </MessageText>
    </TextWrapper>
  );
};

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 16px 20px;
  border-radius: 8px;
  width: 100%;
  background-color: var(--background);
  hyphens: auto;
`;

const MessageText = styled.p`
  font-family: ${({ theme }) => theme.fontFamily.Montserrat};
  color: var(--color);
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  word-break: break-word;
`;

export default MessageBubble;
