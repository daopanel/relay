import { useCallback } from 'react';
import styled from 'styled-components';
// import { useEnsName } from 'wagmi';
import Text from './Text';
import { useRouter } from 'next/router';
import Avatar from './Avatar';
// import MobileLoadingText from 'components/MobileLoadingText';
import { shortDate } from 'utils/date';
import { useGroupMessages } from 'xmtp-react/groups';

interface GroupConversationProps {
  groupId: string;
}

export default function GroupConversation(props: GroupConversationProps) {
  const messages = useGroupMessages(props.groupId);
  const lastMessage = Object.values(messages)[0];
  const router = useRouter();

  const goToConversation = useCallback(() => {
    router.push(`/g/${props.groupId}`);
  }, [props.groupId, router]);

  return (
    <Container onClick={goToConversation} isRequest={false}>
      <div>
        <div>
          <Avatar address={props.groupId} />
        </div>
        <div>
          <StyledTitle tag="span" text={props.groupId} />
          <StyledSubTitle
            tag="span"
            text={previewMessage(`${lastMessage?.content.payload}`)}
          />
        </div>
      </div>
      <div>
        <StyledText
          tag="span"
          text={`${shortDate(lastMessage?.sent)}`}
          isRequest={false}
        />
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
  border-radius: 8px;
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
`;

function shortAddress(str: string): string {
  return str.slice(0, 6) + '...' + str.slice(-4);
}

function previewMessage(message: string): string {
  if (message.length < 50) return message;
  return message.slice(0, 50) + '...';
}
