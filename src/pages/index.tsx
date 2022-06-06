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
import { useEffect, useCallback, useState } from 'react';
import MobileBetaStatus from 'components/MobileBetaStatus';
import { useRedirect } from 'hooks';
import { useRouter } from 'next/router';

const highlight = '#9867ce';

export default function Landing() {
  const router = useRouter();
  const { connect, connectors, isConnected } = useConnect();
  const isMetaMask = useIsMetaMask();
  const { doRedirectBack } = useRedirect();
  const [userDidConnect, setUserDidConnect] = useState<boolean>(false);

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
    setUserDidConnect(true);
    connect(metamaskConnector);
    /* eslint-disable-next-line */
  }, []);

  const handleClickCoinbase = useCallback(() => {
    setUserDidConnect(true);
    connect(coinbaseConnector);
    /* eslint-disable-next-line */
  }, []);

  const handleClickWalletConnect = useCallback(() => {
    setUserDidConnect(true);
    connect(walletConnectConnector);
    /* eslint-disable-next-line */
  }, []);

  useEffect(() => {
    if (isConnected) {
      if (doRedirectBack) {
        doRedirectBack();
      } else {
        if (userDidConnect) {
          router.push('/conversations');
        }
      }
    }
    /* eslint-disable-next-line */
  }, [isConnected, router]);

  return (
    <Page>
      <MaxContentWidth>
        <Headline>Hello.</Headline>
        <SubHeader>
          from <Wordmark>daopanel</Wordmark>
        </SubHeader>
        <ConnectorList>
          {isMetaMask && (
            <Connector>
              <SignInLink
                hoverLogo={Metamask.src}
                defaultLogo={MetamaskPurple.src}
                name={'Metamask'}
                onClick={handleClickMetamask}
              />
            </Connector>
          )}
          <MaybeHideOnMobileConnector shouldHide={isMetaMask}>
            <SignInLink
              hoverLogo={LightWalletConnect.src}
              defaultLogo={walletConnect.src}
              name={'Wallet Connect'}
              onClick={handleClickWalletConnect}
            />
          </MaybeHideOnMobileConnector>
          <MaybeHideOnMobileConnector shouldHide={isMetaMask}>
            <SignInLink
              hoverLogo={LightCoinbase.src}
              defaultLogo={coinbase.src}
              name={'Coinbase'}
              onClick={handleClickCoinbase}
            />
          </MaybeHideOnMobileConnector>
          <SignInLink
            hoverLogo={LightCoinbase.src}
            defaultLogo={coinbase.src}
            name={'TEST SENTRY'}
            onClick={() => {
              throw new Error('Did Sentry see it?');
            }}
          />
        </ConnectorList>
      </MaxContentWidth>
      <MobileBetaStatus />
    </Page>
  );
}
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
  color: #9867ce;
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
  margin-top: -2rem;
  font-style: normal;
  font-weight: 300;
  font-size: 16.8834px;
  line-height: 23px;
  text-align: center;
  color: #dad0e6;
  margin-bottom: 3rem;
`;

const Wordmark = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
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
