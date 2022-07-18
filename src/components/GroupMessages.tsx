import { useDeviceDetect } from 'hooks';
import { FunctionComponent, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import MobileMessagesHeader from './MobileMessagesHeader';
import MobileMessageInput from './MobileMessageInput';
import { useRouter } from 'next/router';
import MobileMessagesBucket from './MobileMessagesBucket';
import MobileLoadingMessages from './MobileLoadingMessages';
import MobileMenu from './MobileMenu';
import { Status, useXmtp } from 'xmtp-react/context';
import MobileStatusCard from './MobileStatusCard';
import { useGroupMessages, useGroups, useSendGroupMessage } from 'xmtp-react';

export const GroupMessages: FunctionComponent = () => {
  const { isMobile } = useDeviceDetect();

  const xmtp = useXmtp();
  const router = useRouter();
  const groupId = router.query.groupId as unknown as string;
  const groups = useGroups();
  const group = groups[groupId];
  const messages = useGroupMessages(groupId);
  const sendGroupMessage = useSendGroupMessage();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const divScrollToRef = useRef<HTMLInputElement>(null);
  const openMenu = useCallback(() => setShowMenu(true), [setShowMenu]);
  const closeMenu = useCallback(() => setShowMenu(false), [setShowMenu]);

  const doSendMessage = useCallback(
    async (message: string) => {
      sendGroupMessage(group, message);
    },
    [group, sendGroupMessage]
  );

  // TODO The buckets function wasn't working with group chat. The hackaround
  // that seems to work is treating every single message as a bucket.
  const buckets = Object.values(messages)
    .map((x) => [x])
    .reverse();

  return (
    <Page>
      <MobileMenu onClickClose={closeMenu} showMenu={showMenu} />
      <MobileMessagesHeader
        onMenuClick={openMenu}
        titleText={''}
        onClickBack={() => router.push('/groups')}
      />
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
      {xmtp.status === Status.loading && (
        <MobileLoadingMessages isMobile={isMobile} />
      )}
      {xmtp.status === Status.ready && (
        <List isMobile={isMobile}>
          <div ref={divScrollToRef}></div>
          {buckets.map((bucketMessages, index) => {
            if (bucketMessages.length > 0) {
              return (
                <MobileMessagesBucket
                  key={index}
                  messages={bucketMessages}
                  clientAddress={xmtp.client.address}
                  sentByAddress={bucketMessages[0].senderAddress}
                  startDate={bucketMessages[0].sent}
                />
              );
            }
            return null;
          })}
        </List>
      )}

      {(xmtp.status === Status.loading ||
        xmtp.status === Status.ready ||
        Object.keys(messages).length === 0) && (
        <FixedFooter>
          <MobileMessageInput
            onSendMessage={doSendMessage}
            isMobile={isMobile}
          />
        </FixedFooter>
      )}
    </Page>
  );
};

const Page = styled.div`
  height: 100%;
  width: 100vw;
  background: white;
  display: flex;
  flex-direction: column;
`;

const List = styled.ul<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column-reverse;
  overflow: scroll;
  gap: 0.75rem;
  padding: 1rem;
  width: 100%;
  height: ${({ isMobile }) =>
    isMobile ? 'calc(100vh - 240px)' : 'calc(100vh - 164px);'};
  z-index: 10;
`;

const FixedFooter = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.darkPurple};
`;

const Centered = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  padding: 24px;
`;
