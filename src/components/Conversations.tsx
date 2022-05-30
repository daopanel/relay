import { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  ConversationsStatus,
  useActiveTab,
  useXmtp,
  useXmtpConversations,
} from 'hooks';
import Conversation from './Conversation';
import MobileConversationsHeader from './MobileConversationsHeader';
import MobileMenu from './MobileMenu';
import CreateNewConversation from './CreateNewConversation';
import MobileStatusCard from './MobileStatusCard';
import { Conversation as ConversationType } from '@xmtp/xmtp-js/dist/types/src';
import { XmtpStatus } from 'contexts/XmtpContext';
import MobileLoadingPage from 'components/MobileLoadingPage';

export default function Conversations() {
  const { init, status: xmtpStatus } = useXmtp();
  const { conversations, status } = useXmtpConversations();
  const { visibilityState: isTabVisible } = useActiveTab();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showNewConversation, setShowNewConversation] =
    useState<boolean>(false);

  const [timestamped, setTimestamped] = useState<
    Record<string, Date | undefined>
  >({});
  const [numLoaded, setNumLoaded] = useState<number>(0);

  const allConversationsLoaded = useMemo(() => {
    return numLoaded > 0 && numLoaded === Object.entries(conversations).length;
  }, [numLoaded, conversations]);

  const sendNewMessageNotification = useCallback(
    (messages, peerEnsName, peerAddress) => {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.recipientAddress !== peerAddress) {
        new Notification(
          `Received new Message from ${peerEnsName || peerAddress}`,
          {
            body: messages[messages.length - 1]?.content,
          }
        );
      }
    },
    []
  );

  const handleConversationStatusEvent = useCallback(
    (ensName, peerAddress, messages, prevMessagesCount) => {
      const lastMessage = messages[messages.length - 1];
      const timestamp = lastMessage ? lastMessage.sent : new Date();

      if (
        messages.length > 0 && !isTabVisible && prevMessagesCount
          ? prevMessagesCount < messages.length
          : false
      ) {
        sendNewMessageNotification(messages, ensName, peerAddress);
      }

      setTimestamped((prevState) => {
        return {
          ...prevState,
          [peerAddress]: timestamp,
        };
      });
      if (!allConversationsLoaded) setNumLoaded((prevState) => prevState + 1);
    },
    [allConversationsLoaded, isTabVisible, sendNewMessageNotification]
  );

  const doOpenMenu = () => {
    setShowMenu(true);
  };

  const doCloseMenu = () => {
    setShowMenu(false);
  };

  const doNewConversation = () => {
    setShowNewConversation(true);
  };

  const doCloseCloseNewConversation = useCallback(() => {
    setShowNewConversation(false);
  }, []);

  return (
    <Page>
      <MobileMenu showMenu={showMenu} onClickClose={doCloseMenu} />
      <MobileConversationsHeader
        onClickMenu={doOpenMenu}
        onClickNewConversation={doNewConversation}
        activeCategory={'All Messages'}
      />
      {showNewConversation && (
        <CreateNewConversation close={doCloseCloseNewConversation} />
      )}
      {xmtpStatus === XmtpStatus.ready || (
        <Centered>
          <MobileStatusCard
            title="Initialize XMTP Client..."
            subtitle="To begin messaging, you must first initialize the XMTP client by signing a message."
            buttonText="Initialize Client"
            isLoading={xmtpStatus === XmtpStatus.loading}
            isError={xmtpStatus === XmtpStatus.denied}
            errorText={'Signature request cancelled. Try again...'}
            loadingText="Awaiting signature..."
            onClick={init}
          />
        </Centered>
      )}
      {status === ConversationsStatus.empty && (
        <Centered>
          <MobileStatusCard
            title="No conversations found."
            subtitle="To begin messaging, first create a conversation."
            buttonText="Create a Conversation"
            isLoading={false}
            isError={false}
            errorText=""
            loadingText=""
            onClick={doNewConversation}
          />
        </Centered>
      )}
      {xmtpStatus === XmtpStatus.ready &&
        status === ConversationsStatus.loading && <MobileLoadingPage />}
      <List>
        {sortedByTimestamp(conversations, timestamped).map(
          (peerAddress: string) => {
            return (
              <Conversation
                onLoadedOrNewMessage={handleConversationStatusEvent}
                show={status === ConversationsStatus.ready}
                key={peerAddress}
                peerAddress={peerAddress}
              />
            );
          }
        )}
      </List>
    </Page>
  );
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Page = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Centered = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  padding: 24px;
`;

function sortedByTimestamp(
  conversations: Record<string, ConversationType>,
  timestamped: Record<string, Date | undefined>
): string[] {
  const peerAddresses = Object.keys(conversations);
  return peerAddresses.sort((a, b) => {
    const tA = timestamped[a] || -Infinity;
    const tB = timestamped[b] || -Infinity;
    if (tA === tB) return 0;
    if (tA > tB) return -1;
    return 1;
  });
}
