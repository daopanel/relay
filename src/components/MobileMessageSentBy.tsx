import styled from 'styled-components';
import Avatar from './Avatar';
import { useEnsName } from 'wagmi';
import { shortDate } from 'utils/date';

export interface MobileMessageSentByProps {
  address: string;
  sentAt: Date | undefined;
  sentByMe: boolean;
}

export default function MobileMessageSentBy(props: MobileMessageSentByProps) {
  const { data: ensName } = useEnsName({ address: props.address });
  return (
    <Aligned>
      {props.sentByMe || <Avatar address={props.address} />}
      {props.sentByMe && <SentAt>{shortDate(props.sentAt)}</SentAt>}
      <SentBy>
        {props.sentByMe ? 'You' : shortAddress(ensName || props.address)}
      </SentBy>
      {props.sentByMe && <Avatar address={props.address} />}
      {props.sentByMe || <SentAt>{shortDate(props.sentAt)}</SentAt>}
    </Aligned>
  );
}

const Aligned = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
`;

const SentBy = styled.h3`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  color: #ffffff;
`;

const SentAt = styled.time`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  color: white;
`;

// This function can be used as a standard for shorthands throughout the app(can be moved in 'utils' folder)
function shortAddress(str: string): string {
  return str.length < 15 ? str : str.slice(0, 15) + '...';
}
