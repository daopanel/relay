import styled from 'styled-components';
import Avatar from './Avatar';
import { useEnsName } from 'wagmi';
import { shortDate } from 'utils/date';
import { useResponsiveUserId } from 'hooks';

export interface MobileMessageSentByProps {
  address: string;
  sentAt: Date | undefined;
  sentByMe: boolean;
}

export default function MobileMessageSentBy(props: MobileMessageSentByProps) {
  const { data: ensName } = useEnsName({ address: props.address });
  const responsiveId = useResponsiveUserId(ensName, props.address, '');
  return (
    <Aligned>
      {props.sentByMe || <Avatar address={props.address} />}
      {props.sentByMe && <SentAt>{shortDate(props.sentAt)}</SentAt>}
      <SentBy>{props.sentByMe ? 'You' : responsiveId}</SentBy>
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
  color: #252727;
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
  color: #75668c;
`;
