import { useConnect } from 'wagmi';
import styled from 'styled-components';
import background from '../../public/assets/images/Artboard1.png';
import walletConnect from '../../public/assets/images/walletconnect.png';
import coinbase from '../../public/assets/images/Coinbase.png';
import LightCoinbase from '../../public/assets/images/LightCoinbase.png';
import LightWalletConnect from '../../public/assets/images/LightWalletConnect.png';
import MetamaskPurple from '../../public/assets/images/MetamaskPurple.svg';
import Metamask from '../../public/assets/images/Metamask.svg';
import SignInLink from 'components/Connector';
import { useIsMetaMask } from 'hooks';
import { useEffect, useCallback } from 'react';
import MobileBetaStatus from 'components/MobileBetaStatus';
import { useRedirect } from 'hooks';
import { useRouter } from 'next/router';

const highlight = '#7349e5';

export default function Landing() {
  const router = useRouter();
  const { connect, connectors, isConnected } = useConnect();
  const isMetaMask = useIsMetaMask();
  const { doRedirectBack } = useRedirect();

  const metamaskConnector = connectors.find(
    (connector) => connector.id === 'injected'
  );

  const walletConnectConnector = connectors.find(
    (connector) => connector.id === 'walletConnect'
  );

  const coinbaseConnector = connectors.find(
    (connector) => connector.id === 'coinbaseWallet'
  );

  const handleClickMetamask = useCallback(() => {
    connect(metamaskConnector);
    /* eslint-disable-next-line */
  }, []);

  const handleClickCoinbase = useCallback(() => {
    connect(coinbaseConnector);
    /* eslint-disable-next-line */
  }, []);

  const handleClickWalletConnect = useCallback(() => {
    connect(walletConnectConnector);
    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    if (isConnected) {
      if (doRedirectBack) {
        doRedirectBack();
      } else {
        router.push('/conversations');
      }
    }
    /* eslint-disable-next-line */
  }, [isConnected, router]);

  return (
    <Page>
      <MaxContentWidth>
        <Headline>Relay</Headline>
        <SubHeader>
          web3 chat from{' '}
          <Wordmark href="https://daopanel.com" target="_blank">
            Panel
          </Wordmark>
        </SubHeader>
        <ConnectorList>
          {isMetaMask && (
            <Connector>
              <SignInLink
                hoverLogo={Metamask.src}
                defaultLogo={Metamask.src}
                name={'Metamask'}
                onClick={handleClickMetamask}
              />
            </Connector>
          )}
          <MaybeHideOnMobileConnector shouldHide={isMetaMask}>
            <SignInLink
              hoverLogo={LightWalletConnect.src}
              defaultLogo={LightWalletConnect.src}
              name={'Wallet Connect'}
              onClick={handleClickWalletConnect}
            />
          </MaybeHideOnMobileConnector>
          <MaybeHideOnMobileConnector shouldHide={isMetaMask}>
            <SignInLink
              hoverLogo={LightCoinbase.src}
              defaultLogo={LightCoinbase.src}
              name={'Coinbase'}
              onClick={handleClickCoinbase}
            />
          </MaybeHideOnMobileConnector>
        </ConnectorList>
      </MaxContentWidth>
      <BottomRight>
        <MobileBetaStatus />
      </BottomRight>
    </Page>
  );
}

const BottomRight = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 1rem;
`;

const MaxContentWidth = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-height: 800px) {
    margin-top: 100px;
  }
`;

const Headline = styled.h1`
  color: ${highlight};
  font-style: normal;
  font-weight: 600;
  font-size: 100.755px;
  line-height: 161px;
  text-align: center;
  color: #7349e5;
  display: flex;
  align-items: center;

  &:after {
    content: '';
    display: block;
    height: 85px;
    width: 3px;
    background-color: white;
    animation: flash 1500ms linear infinite;
    border-radius: 99rem;
    margin-left: 10px;
    margin-bottom: 5px;
  }

  @keyframes flash {
    0% {
      opacity: 1;
    }
    49% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    99% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${background.src}) repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  overflow: scroll;

  &:after {
    background: linear-gradient(60deg, rgba(16, 8, 23, 92.5%), #100817);
    display: block;
    content: '';
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubHeader = styled.h2`
  margin-left: -1rem;
  margin-top: -1rem;
  font-style: normal;
  font-weight: 300;
  font-size: 16.8834px;
  line-height: 23px;
  text-align: center;
  color: white;
  margin-bottom: 3rem;
`;

const Wordmark = styled.a`
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  display: inline;
`;

const ConnectorList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
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

const MaybeHideOnMobileConnector = styled(Connector)<{ shouldHide: boolean }>`
  @media (pointer: coarse) {
    display: ${(p) => (p.shouldHide ? 'none' : 'flex')};
  }
`;
