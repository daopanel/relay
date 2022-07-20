import { useCallback } from 'react';
import styled from 'styled-components';
import { useEnsName } from 'wagmi';
import Text from './Text';
import { useRouter } from 'next/router';
import Avatar from './Avatar';
import MobileLoadingText from 'components/MobileLoadingText';
import { shortDate } from 'utils/date';
import { useMessages, getLastMessage } from 'xmtp-react/conversations';
import { useResponsiveUserId } from 'hooks';

interface ConversationProps {
  peerAddress: string;
}

export default function Conversation(props: ConversationProps) {
  const messages = useMessages(props.peerAddress);
  const { data: ensName, isLoading } = useEnsName({
    address: props.peerAddress,
  });
  const responsiveId = useResponsiveUserId(ensName, props.peerAddress, '');
  const lastMessage = getLastMessage(messages);
  const router = useRouter();

  const goToConversation = useCallback(() => {
    router.push(`/${ensName || props.peerAddress}`);
  }, [ensName, props.peerAddress, router]);

  return (
    <Container onClick={goToConversation} isRequest={false}>
      <div>
        <div>
          <Avatar address={props.peerAddress} />
        </div>
        <div>
          {isLoading && <MobileLoadingText />}
          {isLoading || <StyledTitle tag="span" text={responsiveId} />}
          {lastMessage === undefined ? (
            <MobileLoadingText />
          ) : (
            <StyledSubTitle
              tag="span"
              text={previewMessage(`${lastMessage?.content}`)}
            />
          )}
        </div>
      </div>
      <div>
        {lastMessage == undefined ? (
          <MobileLoadingText />
        ) : (
          <StyledText
            tag="span"
            text={`${shortDate(lastMessage?.sent)}`}
            isRequest={false}
          />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div<{ isRequest: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 22px;
  transition: all 0.4s;
  border-bottom: 1px solid rgba(35, 25, 59, 0.45);
  cursor: pointer;

  & > div:first-child {
    display: flex;
    & > div:last-child {
      display: flex;
      flex-direction: column;
      margin-left: 16px;
      transition: all 0.4s;
    }
  }
  & > div:last-child {
    display: flex;
    flex-direction: ${({ isRequest }) => (isRequest ? 'row' : 'column')};
    transition: ${({ isRequest }) => (isRequest ? 'all 0.4s' : 'none')};
    padding: ${({ isRequest }) => (isRequest ? '4px 8px' : '0')};
    border-radius: ${({ isRequest }) => (isRequest ? '4px' : '0')};
    background-color: ${({ isRequest }) => (isRequest ? '#433764' : 'none')};
    align-items: ${({ isRequest }) => (isRequest ? 'center' : 'flex-end')};
    &:hover {
      background-color: ${({ isRequest, theme }) =>
        isRequest ? theme.colors.purple : 'none'};
      cursor: ${({ isRequest }) => (isRequest ? 'pointer' : 'default')};
    }
  }

  &:hover {
    & > div:first-child {
      & > div:last-child {
        margin-left: 23px;
      }
    }
  }
`;

const StyledTitle = styled(Text)`
  color: #252727;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  letter-spacing: -0.01em;
  margin-bottom: 5px;
`;

const StyledSubTitle = styled(Text)`
  color: #252727;
  letter-spacing: -0.01em;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;
  word-break: break-word;
`;

const StyledText = styled(Text)<{ isRequest: boolean }>`
  color: ${({ theme, isRequest }) =>
    isRequest ? theme.colors.lightPurple : theme.colors.dimmedPurple};
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: -0.01em;
  margin-left: 6px;
  margin-bottom: ${({ isRequest }) => (isRequest ? '0' : '5px')};
  color: #252727;
`;

function previewMessage(message: string): string {
  if (message.length < 50) return message;
  return message.slice(0, 50) + '...';
}
