import {
  useActiveTab,
  usePreviousVal,
  useDeviceDetect,
  useResponsiveUserId,
} from 'hooks';
import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import MobileMessagesHeader from './MobileMessagesHeader';
import MobileMessageInput from './MobileMessageInput';
import { useRouter } from 'next/router';
import { Message } from '@xmtp/xmtp-js';
import MobileMessagesBucket from './MobileMessagesBucket';
import MobileLoadingMessages from './MobileLoadingMessages';
import MobileMenu from './MobileMenu';
import { Status, useXmtp } from 'xmtp-react/context';
import {
  useMessages,
  useSendMessage,
  Status as SendMessageStatus,
} from 'xmtp-react/conversations';
import MobileStatusCard from './MobileStatusCard';
import { useRouterEnsData } from 'hooks';
import MobileLoadingEnsName from './MobileLoadingEnsName';

export default function Messages() {
  const { isMobile } = useDeviceDetect();

  const xmtp = useXmtp();
  const router = useRouter();
  const {
    name: peerEnsName,
    address: peerAddress,
    isLoading,
  } = useRouterEnsData();
  const messages = useMessages(peerAddress);
  const sendMessage = useSendMessage();
  // const { visibilityState: isTabVisible } = useActiveTab();
  // const prevMessagesCount = usePreviousVal(messages.length);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const divScrollToRef = useRef<HTMLInputElement>(null);
  const responsiveId = useResponsiveUserId(peerEnsName, peerAddress, 'N/A');

  const openMenu = useCallback(() => setShowMenu(true), [setShowMenu]);
  const closeMenu = useCallback(() => setShowMenu(false), [setShowMenu]);

  // const scrollToBottom = useCallback(() => {
  //   if (divScrollToRef.current) {
  //     divScrollToRef.current.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [divScrollToRef]);

  // useEffect(() => {
  //   if (status === ConversationStatus.ready) {
  //     scrollToBottom();
  //   }
  // }, [status, scrollToBottom]);

  // const sendNewMessageNotification = useCallback(
  //   (messages) => {
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
  //   [peerAddress, peerEnsName]
  // );

  // useEffect(() => {
  //   if (
  //     messages.length > 0 && !isTabVisible && prevMessagesCount
  //       ? prevMessagesCount < messages.length
  //       : false
  //   ) {
  //     sendNewMessageNotification(messages);
  //   }
  // }, [isTabVisible, messages, prevMessagesCount, sendNewMessageNotification]);

  const doSendMessage = useCallback(
    async (message: string) => {
      if (peerAddress && sendMessage.status === SendMessageStatus.ready) {
        sendMessage.send(peerAddress, message);
      }
    },
    [sendMessage, peerAddress]
  );

  const buckets = getMessageBuckets(
    Object.values(messages)
      .map((x) => x)
      .reverse()
  );

  const goToConversations = useCallback(() => {
    router.push('/conversations');
  }, [router]);

  if (isLoading)
    return (
      <>
        <MobileMessagesHeader
          onMenuClick={openMenu}
          onClickBack={goToConversations}
          titleText={responsiveId}
        />
        <MobileLoadingEnsName />;
      </>
    );

  if (typeof peerAddress !== 'string')
    return (
      <Page>
        <MobileMessagesHeader
          onClickBack={goToConversations}
          onMenuClick={openMenu}
          titleText={'N/A'}
        />
        <Centered>
          <MobileStatusCard
            title="Could not resolve ENS name"
            subtitle='Make sure to include the ".eth" suffix.'
            buttonText=""
            isLoading={false}
            isError={true}
            errorText={'Go Back to Conversations'}
            loadingText=""
            onClick={goToConversations}
          />
        </Centered>
      </Page>
    );

  return (
    <Page>
      <MobileMenu onClickClose={closeMenu} showMenu={showMenu} />
      <MobileMessagesHeader
        onClickBack={goToConversations}
        onMenuClick={openMenu}
        titleText={responsiveId}
      />
      {/* {status === ConversationStatus.noPeerAvailable && (
        <Centered>
          <MobileStatusCard
            noPeerAvailable
            title="Problem connecting to peer"
            subtitle="This address has not signed into XMTP yet."
            buttonText=""
            isLoading={false}
            isError={true}
            errorText={'Go Back to Conversations'}
            loadingText=""
            onClick={goToConversations}
          />
        </Centered>
      )} */}
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
                  startDate={bucketMessages[0].sent}
                  sentByAddress={bucketMessages[0].senderAddress}
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
}

const Page = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: #100817;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  overflow: scroll;
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

// This assumets messages are sorted by date already.
function getMessageBuckets(messages: Message[]): Array<Message[]> {
  return messages.reduce(
    (buckets: Array<Message[]>, message: Message) => {
      // If sent isn't set, always add it as it's own bucket
      if (message.sent === undefined) {
        return [...buckets, [message]];
      }

      // We initialize the reducer with [[]] so buckets should always be non-empty.
      const lastBucket = buckets[buckets.length - 1] as Message[];
      if (lastBucket.length === 0) return [[message]];

      // If this is the initial iteration, initialize buckets.
      if (buckets.length === 1 && buckets[0].length === 0) {
        const result: Array<Message[]> = [[message]];
        return result;
      }

      // If the last message in the last bucket is either sent to a different
      // address, undefined, sent is not set on it, or it's older than 5 minutes
      // from the current message, create a new bucket.
      const lastInLastBucket = buckets[buckets.length - 1]?.[0];
      if (lastInLastBucket?.recipientAddress !== message.recipientAddress)
        return [...buckets, [message]];
      if (lastInLastBucket === undefined) return [...buckets, [message]];
      if (lastInLastBucket.sent === undefined) return [...buckets, [message]];
      if (isFiveMinuteDifference(lastInLastBucket.sent, message.sent)) {
        return [...buckets, [message]];
      }

      // If the first message in the last bucket is either undefined, sent is
      // not set on it, or it's older than an hour from the current message,
      // create a new bucket.
      const firstInLastBucket = buckets[buckets.length - 1]?.[0];
      if (firstInLastBucket === undefined) return [...buckets, [message]];
      if (firstInLastBucket.sent === undefined) return [...buckets, [message]];
      if (isHourDifference(firstInLastBucket.sent, message.sent))
        return [...buckets, [message]];

      // If we got here then we just add the current message to the last bucket.
      lastBucket.push(message);
      return buckets;
    },
    // If you change this you might break this function, in particular the line
    // where we assert that the last bucket is type Message[].
    [[]]
  );
}

function isHourDifference(a: Date, b: Date): boolean {
  // 360000 is milliseconds in an hour
  return Math.abs(a.getTime() - b.getTime()) > 3600000;
}

function isFiveMinuteDifference(a: Date, b: Date): boolean {
  // 300000 is milliseconds in 5 minutes
  return Math.abs(a.getTime() - b.getTime()) > 300000;
}
