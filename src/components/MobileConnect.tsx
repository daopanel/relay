import { useAccount, useConnect, useDisconnect } from 'wagmi';
import styled from 'styled-components';
import background from '../../../public/assets/images/Artboard1.png';
import walletConnect from '../../../public/assets/images/walletconnect.png';
import portis from '../../../public/assets/images/Portis.png';
import torus from '../../../public/assets/images/Torus.png';
import fortmatic from '../../../public/assets/images/Formatic.png';
import coinbase from '../../../public/assets/images/Coinbase.png';
import LightCoinbase from '../../../public/assets/images/LightCoinbase.png';
import LightFormatic from '../../../public/assets/images/LightFormatic.png';
import LightPortis from '../../../public/assets/images/LightPortis.png';
import LightTorus from '../../../public/assets/images/LightTorus.png';
import LightWalletConnect from '../../../public/assets/images/LightWalletConnect.png';
import MetamaskPurple from '../../../public/assets/images/MetamaskPurple.svg';
import Metamask from '../../../public/assets/images/Metamask.svg';
import SignInLink from 'components/Connector';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useWindowSize } from 'hooks';

const highlight = '#7349e5';

export default function MobileConnect() {
  const { isConnected } = useConnect();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const { data: accountData } = useAccount();
  const { height } = useWindowSize();
  const router = useRouter();

  const handleConnect = useCallback(() => {
    connect(connectors[0]);
    // TODO Should redirect based on incoming request
    router.push('/conversations');
  }, [connect, router, connectors]);

  return (
    <Page>
      <Headline>Relay</Headline>
      <SubHeader>by Panel</SubHeader>
      <ConnectorList height={height}>
        <Connector>
          <SignInLink
            hoverLogo={Metamask.src}
            defaultLogo={Metamask.src}
            name={'Metamask'}
            onClick={isConnected ? disconnect : handleConnect}
          />
        </Connector>
        <Connector>
          <SignInLink
            hoverLogo={LightWalletConnect.src}
            defaultLogo={LightWalletConnect.src}
            name={'Wallet Connect'}
            onClick={() => connect(connectors[0])}
          />
        </Connector>
        <Connector>
          <SignInLink
            hoverLogo={LightPortis.src}
            defaultLogo={LightPortis.src}
            name={'Portis'}
            onClick={() => connect(connectors[0])}
          />
        </Connector>
        <Connector>
          <SignInLink
            hoverLogo={LightTorus.src}
            defaultLogo={LightTorus.src}
            name={'Torus'}
            onClick={() => connect(connectors[0])}
          />
        </Connector>
        <Connector>
          <SignInLink
            hoverLogo={LightFormatic.src}
            defaultLogo={LightFormatic.src}
            name={'Fortmatic'}
            onClick={() => connect(connectors[0])}
          />
        </Connector>
        <Connector>
          <SignInLink
            hoverLogo={LightCoinbase.src}
            defaultLogo={coinbase.src}
            name={'Coinbase'}
            onClick={() => connect(connectors[0])}
          />
        </Connector>
      </ConnectorList>
      <ConnectionStatus connected={Boolean(accountData?.address)}>
        {Boolean(accountData?.address) && String(accountData?.address)}
        {Boolean(accountData?.address) || 'Not Connected'}
      </ConnectionStatus>
    </Page>
  );
}

const Headline = styled.h1`
  color: ${highlight};
  font-style: normal;
  font-weight: 600;
  font-size: 100.755px;
  line-height: 161px;
  text-align: center;
  color: #7349e5;
`;

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${background.src}) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;

  &:after {
    background: linear-gradient(60deg, rgba(16, 8, 23, 92.5%), #100817);
    display: block;
    content: '';
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubHeader = styled.h2`
  margin-top: -2rem;
  font-style: normal;
  font-weight: 500;
  font-size: 18.8834px;
  line-height: 23px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 1rem;
`;

const ConnectorList = styled.ul<{ height: number | undefined }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  overflow: scroll;
`;

const Connector = styled.li`
  color: white;
  list-style-type: none;
  cursor: pointer;
  width: 100%;
  min-height: 80px;
  border-radius: 8px;
  background: rgba(16, 8, 23, 0.8);
`;

const ConnectionStatus = styled.div<{ connected: boolean }>`
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: ${(props) => (props.connected ? highlight : 'red')};
  opacity: 0.5;
  font-size: 12px;
`;
