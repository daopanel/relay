import styled from 'styled-components';
import { Message } from '@xmtp/xmtp-js';
import MessageBubble from './MessageBubble';
import MessageSentBy from './MessageSentBy';
import { isGroupMessage } from 'xmtp-react/groups';

interface MobileMessagesBucketProps {
  peerAddress: string;
  sentByAddress: string | undefined;
  startDate: Date | undefined;
  messages: Message[];
}

export default function MessagesBucket(props: MobileMessagesBucketProps) {
  const sentByMe = props.sentByAddress !== props.peerAddress;
  if (props.messages.length === 0) return null;

  return (
    <>
      {props.messages.map((message: Message) => {
        return (
          <MessagePosition key={message.id} right={sentByMe}>
            <MessageBubble
              message={
                isGroupMessage(message)
                  ? message.content.payload
                  : message.content
              }
              backgroundColor={sentByMe ? '#50456f' : '#231A3A'}
            />
          </MessagePosition>
        );
      })}
      <SentByPosition right={sentByMe}>
        <MessageSentBy
          sentByMe={sentByMe}
          address={String(props.sentByAddress)}
          sentAt={props.startDate}
        />
      </SentByPosition>
    </>
  );
}

const MessagePosition = styled.div`
  max-width: 80%;
  align-self: ${(props: { right: boolean }) =>
    props.right ? 'flex-end' : 'flex-start'};
`;

const SentByPosition = styled.div`
  max-width: 100%;
  align-self: ${(props: { right: boolean }) =>
    props.right ? 'flex-end' : 'flex-start'};
`;
