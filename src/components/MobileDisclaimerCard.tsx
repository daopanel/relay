import styled from 'styled-components';
import Image from 'next/image';

export interface MobileDisclaimerCardProps {
  title: string;
  subtitle: string;
  errorText?: string;
  onClick: () => void;
}
export default function MobileDisclaimerCard({
  title,
  subtitle,
  errorText,
  onClick,
}: MobileDisclaimerCardProps) {
  return (
    <Card>
      <Right>
        <Image
          src="/assets/images/MobileErrorIndicator.svg"
          height={20}
          width={20}
          alt="error"
        />
      </Right>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <GoToXmtp href="https://docs.xmtp.org" target="_blank">
        See disclaimer here.
      </GoToXmtp>
      <Button onClick={onClick}>{errorText}</Button>
    </Card>
  );
}

const GoToXmtp = styled.a`
  width: 100%;
  text-align: center;
  color: #f77272;
  display: block;
  margin-top: 1rem;
  text-decoration: none;
`;

const Right = styled.div`
  float: right;
`;

const Card = styled.div`
  max-width: 456px;
  min-width: 275px;
  border-radius: 8px;
  background-color: white;
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
