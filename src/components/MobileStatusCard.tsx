import styled from 'styled-components';
import Image from 'next/image';
import Loader from './LoadingSpinner';
import Link from 'next/link';

export interface MobileStatusCardProps {
  title: string;
  subtitle: string;
  buttonText: string;
  isLoading: boolean;
  loadingText?: string;
  isError: boolean;
  errorText?: string;
  noPeerAvailable?: boolean;
  onClick: () => void;
}
export default function MobileStatusCard({
  title,
  subtitle,
  buttonText,
  isLoading,
  loadingText,
  isError,
  errorText,
  noPeerAvailable = false,
  onClick,
}: MobileStatusCardProps) {
  return (
    <Card>
      {isLoading && (
        <Right>
          <Loader height={20} width={20} />
        </Right>
      )}
      {isError && (
        <Right>
          <Image
            src="/assets/images/MobileErrorIndicator.svg"
            height={20}
            width={20}
            alt="error"
          />
        </Right>
      )}
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {noPeerAvailable && (
        <ReferSubtitle>
          Invite them to try{' '}
          <a href="https://daopanel.chat" target="_blank" rel="noreferrer">
            daopanel.chat
          </a>{' '}
          or test it out by messaging the daopanel founder{' '}
          <Link href={'/seanwbren.eth'} passHref>
            <h6>seanwbren.eth</h6>
          </Link>
        </ReferSubtitle>
      )}

      <Button onClick={onClick}>
        {isLoading ? loadingText : isError ? errorText : buttonText}
      </Button>
    </Card>
  );
}

const Right = styled.div`
  float: right;
`;

const Card = styled.div`
  max-width: 456px;
  border-radius: 8px;
  background-color: #100817;
  border: 2px solid #402b5b;
  padding: 24px;
  position: relative;
`;

const Title = styled.h1`
  /* Headline/Headline 3 */
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: -0.01em;
  color: #ffffff;
`;

const Subtitle = styled.h6`
  margin-top: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  letter-spacing: -0.01em;
  color: #dad0e6;
`;

const ReferSubtitle = styled.h6`
  margin-top: 8px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #dad0e6;
  & > a {
    font-weight: normal;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.purple};
  }
  & > a:hover {
  }
  & > h6 {
    display: inline-block;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.purple};
    letter-spacing: -0.01em;
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  background-color: #271d47;
  border-radius: 8px;
  padding: 16px;
  border: none;
  height: 48px;
  margin-top: 32px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #ffffff;
  &:hover {
    background: #543a6e;
  }
  &:active {
    background: #7349e5;
  }
  &:hover {
    cursor: pointer;
  }
`;
