import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useDeviceDetect } from 'hooks';
import { Status, useXmtp } from 'xmtp-react/context';
import Conversation from './Conversation';
import MobileConversationsHeader from './MobileConversationsHeader';
import MobileMenu from './MobileMenu';
import CreateNewConversation from './CreateNewConversation';
import MobileStatusCard from './MobileStatusCard';
import MobileLoadingConversations from './MobileLoadingPage';
import { useConversations } from 'xmtp-react/conversations';

export default function Conversations() {
  const { isMobile } = useDeviceDetect();
  const xmtp = useXmtp();
  // Right now this is just a list of peer addresses, assumed to be sorted.
  const conversations = useConversations();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showNewConversation, setShowNewConversation] =
    useState<boolean>(false);

  // const { visibilityState: isTabVisible } = useActiveTab();

  // const sendNewMessageNotification = useCallback(
  //   (messages, peerEnsName, peerAddress) => {
  //     const lastMessage = messages[messages.length - 1];
  //     if (lastMessage.recipientAddress !== peerAddress) {
  //       new Notification(
  //         `Received new Message from ${peerEnsName || peerAddress}`,
  //         {
  //           body: messages[messages.length - 1]?.content,
  //         }
  //       );
  //     }
  //   },
  //   []
  // );

  // const handleConversationStatusEvent = useCallback(
  //   (ensName, peerAddress, messages, prevMessagesCount) => {
  //     if (
  //       messages.length > 0 && !isTabVisible && prevMessagesCount
  //         ? prevMessagesCount < messages.length
  //         : false
  //     ) {
  //       sendNewMessageNotification(messages, ensName, peerAddress);
  //     }
  //   },
  //   [isTabVisible, sendNewMessageNotification]
  // );

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
        activeCategory={'Messages'}
      />
      {showNewConversation && (
        <CreateNewConversation close={doCloseCloseNewConversation} />
      )}
      {xmtp.status === Status.idle && (
        <Centered>
          <MobileStatusCard
            title="Initialize XMTP Client..."
            subtitle="To begin messaging, you must first initialize the XMTP client by signing a message."
            buttonText="Initialize Client"
            isLoading={false}
            isError={false}
            errorText={'Signature request cancelled. Try again...'}
            loadingText="Awaiting signature..."
            onClick={xmtp.init}
          />
        </Centered>
      )}
      {xmtp.status === Status.waiting && (
        <Centered>
          <MobileStatusCard
            title="Initialize XMTP Client..."
            subtitle="To begin messaging, you must first initialize the XMTP client by signing a message."
            buttonText="Initialize Client"
            isLoading={true}
            isError={false}
            errorText={'Signature request cancelled. Try again...'}
            loadingText="Awaiting signature..."
            onClick={() => null}
          />
        </Centered>
      )}
      {xmtp.status === Status.denied && (
        <Centered>
          <MobileStatusCard
            title="Initialize XMTP Client..."
            subtitle="To begin messaging, you must first initialize the XMTP client by signing a message."
            buttonText="Initialize Client"
            isLoading={false}
            isError={true}
            errorText={'Signature request cancelled. Try again...'}
            loadingText="Awaiting signature..."
            onClick={xmtp.init}
          />
        </Centered>
      )}
      {xmtp.status === Status.ready &&
        Object.keys(xmtp.conversations).length === 0 && (
          <Centered>
            <MobileStatusCard
              title="No conversations found."
              subtitle="Send your first message to any ENS name or Eth address. Note: They will first have to sign their own XMTP message, so tell them to get on daopanel.chat! Or message us at trydaopanel.eth to try it out."
              buttonText="Create a Conversation"
              isLoading={false}
              isError={false}
              errorText=""
              loadingText=""
              onClick={doNewConversation}
            />
            <MissingConversations>
              <div>Expected more conversations? </div>
              <GoToXmtp href="https://docs.xmtp.org" target="_blank">
                See disclaimer here.
              </GoToXmtp>
            </MissingConversations>
          </Centered>
        )}
      {xmtp.status === Status.loading && <MobileLoadingConversations />}
      {xmtp.status === Status.ready && (
        <List isMobile={isMobile}>
          {conversations.map((peerAddress: string) => {
            return <Conversation key={peerAddress} peerAddress={peerAddress} />;
          })}
        </List>
      )}
    </Page>
  );
}

const MissingConversations = styled.div`
  margin-top: 1rem;
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  line-height: 1.5;
`;

const GoToXmtp = styled.a`
  color: #f77272;
  margin-left: 0.5rem;
`;

const List = styled.ul<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: scroll;
  height: ${({ isMobile }) => (isMobile ? 'calc(100vh - 200px)' : '100vh')};
  z-index: 10;
`;

const Page = styled.div`
  width: 100vw;
  height: 100%;
`;

const Centered = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  padding: 24px;
`;
