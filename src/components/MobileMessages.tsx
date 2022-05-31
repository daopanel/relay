import { useXmtpConversation, ConversationStatus, useXmtp } from 'hooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MobileMessagesHeader from './MobileMessagesHeader';
import MobileMessageInput from './MobileMessageInput';
import { useRouter } from 'next/router';
import { Message } from '@xmtp/xmtp-js';
import MobileMessagesBucket from './MobileMessagesBucket';
import MobileLoadingMessages from './MobileLoadingMessages';
import MobileMenu from './MobileMenu';
import { XmtpStatus } from 'contexts/XmtpContext';
import MobileStatusCard from './MobileStatusCard';
import { useRouterEnsData, useActiveTab, usePreviousVal } from 'hooks';
import MobileLoadingEnsName from './MobileLoadingEnsName';

export default function Messages() {
  const { init, status: xmtpStatus } = useXmtp();
  const router = useRouter();
  const {
    name: peerEnsName,
    address: peerAddress,
    isLoading,
  } = useRouterEnsData();
  const { messages, status, sendMessage } = useXmtpConversation(peerAddress);
  const { visibilityState: isTabVisible } = useActiveTab();
  const prevMessagesCount = usePreviousVal(messages.length);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const divScrollToRef = useRef<HTMLInputElement>(null);

  const openMenu = useCallback(() => setShowMenu(true), [setShowMenu]);
  const closeMenu = useCallback(() => setShowMenu(false), [setShowMenu]);

  const scrollToBottom = useCallback(() => {
    if (divScrollToRef.current) {
      divScrollToRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [divScrollToRef]);

  useEffect(() => {
    if (status === ConversationStatus.ready) {
      scrollToBottom();
    }
  }, [status, scrollToBottom]);

  const sendNewMessageNotification = useCallback(
    (messages) => {
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
    [peerAddress, peerEnsName]
  );

  useEffect(() => {
    if (
      messages.length > 0 && !isTabVisible && prevMessagesCount
        ? prevMessagesCount < messages.length
        : false
    ) {
      sendNewMessageNotification(messages);
    }
  }, [isTabVisible, messages, prevMessagesCount, sendNewMessageNotification]);

  const doSendMessage = useCallback(
    (message: string) => {
      sendMessage(message);
    },
    [sendMessage]
  );

  const buckets = getMessageBuckets(messages.map((x) => x).reverse());

  const goToConversations = useCallback(() => {
    router.push('/conversations');
  }, [router]);

  if (isLoading)
    return (
      <>
        <MobileMessagesHeader
          onBackClick={goToConversations}
          onMenuClick={openMenu}
          peerAddressOrName={peerEnsName || peerAddress || 'N/A'}
        />
        <MobileLoadingEnsName />;
      </>
    );

  if (typeof peerAddress !== 'string')
    return (
      <Page>
        <MobileMessagesHeader
          onBackClick={goToConversations}
          onMenuClick={openMenu}
          peerAddressOrName={peerEnsName || peerAddress || 'N/A'}
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
        onBackClick={goToConversations}
        onMenuClick={openMenu}
        peerAddressOrName={peerEnsName || peerAddress || 'N/A'}
      />
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
      {status === ConversationStatus.noPeerAvailable && (
        <Centered>
          <MobileStatusCard
            title="Problem connecting to peer"
            subtitle="Peer has not yet joined the XMTP network..."
            buttonText=""
            isLoading={false}
            isError={true}
            errorText={'Go Back to Conversations'}
            loadingText=""
            onClick={goToConversations}
          />
        </Centered>
      )}
      {status === ConversationStatus.loadingMessages && (
        <MobileLoadingMessages />
      )}
      <List loadingMessages={status === ConversationStatus.loadingMessages}>
        <div ref={divScrollToRef}></div>
        {buckets.map((bucketMessages, index) => {
          if (bucketMessages.length > 0) {
            return (
              <MobileMessagesBucket
                key={index}
                messages={bucketMessages}
                peerAddress={peerAddress}
                startDate={bucketMessages[0].sent}
                sentByAddress={bucketMessages[0].senderAddress}
              />
            );
          }
          return null;
        })}
      </List>
      <FixedFooter>
        <MobileMessageInput onSendMessage={doSendMessage} />
      </FixedFooter>
    </Page>
  );
}

const Page = styled.div`
  height: 100vh;
  width: 100vw;
  background: #100817;
  display: flex;
  flex-direction: column;
`;

const List = styled.ul<{ loadingMessages: boolean }>`
  display: ${(props) => (props.loadingMessages ? 'none' : 'flex')};
  flex-direction: column-reverse;
  overflow: scroll;
  gap: 0.75rem;
  padding: 1rem;
  width: 100%;
  height: calc(100vh - 164px);
`;

const FixedFooter = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 2px solid #191027;
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
