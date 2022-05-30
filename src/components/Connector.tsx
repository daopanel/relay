import styled from 'styled-components';
import MobileLoadingText from './MobileLoadingText';

interface ConnectorProps {
  defaultLogo: string;
  hoverLogo: string;
  name: string;
  onClick: () => unknown;
  connectState?: 'connecting' | 'connected'; // undefined === 'idle'
}

interface LogoProps {
  defaultLogo?: string;
  hoverLogo?: string;
}

export default function Connector(props: ConnectorProps) {
  const { hoverLogo, defaultLogo, name } = props;

  return (
    <Container onClick={props.onClick} hoverLogo={hoverLogo}>
      <LogoContainer defaultLogo={defaultLogo} />
      <span>{name}</span>
      <ConnectStatus>
        {props.connectState === 'connecting' && <MobileLoadingText />}
      </ConnectStatus>
    </Container>
  );
}

const Container = styled.div<LogoProps>`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding-left: 24px;
  padding-right: 19px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  background: rgba(16, 8, 23, 0.8);
  border: 2px solid #191027;
  font-size: 1rem;
  transition: 200ms;
  -webkit-transition: background-image 200ms;
  transition: gap 400ms;
  &:hover {
    background: #2f2042;
    border: 2px solid #523f64;
    gap: 1.5rem;
  }
  &:hover > :first-child {
    background-image: url(${(props) => props.hoverLogo});
  }
`;

const LogoContainer = styled.div<LogoProps>`
  height: 40px;
  width: 40px;
  transition: background-image 400ms;
  background-image: url(${(props) => props.defaultLogo});
`;

const ConnectStatus = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
`;
