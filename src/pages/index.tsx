import { useConnect } from 'wagmi';
import styled from 'styled-components';
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
import Image from 'next/image';
import PanelLogo from '../../public/assets/images/PanelLogo.png';

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
      <Header>
        <TopLeftFlexRow>
          <Image height={27} width={29} src={PanelLogo.src} alt="logo"></Image>
          <TopLeftTitle>Relay</TopLeftTitle>
          <From>from</From>
          <Panel>Panel</Panel>
        </TopLeftFlexRow>
        <TopRightTextContent>Public Beta</TopRightTextContent>
      </Header>
      <MaxContentWidth>
        <ModalHeader>Connect a wallet</ModalHeader>
        <ModalParagraph>
          Wallets are used to send, receive, store, and display digital assets
          like Ethereum and NFTs.
        </ModalParagraph>
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

const ModalHeader = styled.h1`
  font-size: 20px;
  font-weight: 600;
  line-height: 24.2px;
  margin-bottom: 5px;
`;

const ModalParagraph = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 48px;
  text-align: center;
  color: #5b5b5b;
`;

const TopLeftTitle = styled.div`
  font-size: 20px;
  margin-left: 10px;
  display: flex;
  align-items: center;

  &:after {
    content: '';
    height: 19px;
    width: 1px;
    display: inline-block;
    background-color: #d9d9d9;
    margin: 0rem 0.5rem;
  }
`;

const From = styled.span`
  color: #868686;
  font-weight: 500;
  font-size: 0.875rem;
`;

const Panel = styled.span`
  color: #868686;
  font-weight: 600;
  font-size: 0.875rem;
  margin-left: 0.25rem;
`;

const TopRightTextContent = styled.div`
  border-radius: 99rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  color: #5b5b5b;
  font-weight: 400;
  border: 1px solid #fbfbfb;
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.1));

  &:before {
    content: '';
    display: inline-block;
    transform: translate(-50%, -50%);
    margin-right: 4px;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    background-color: #84ffa7;
  }
`;

const TopLeftFlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomRight = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 1rem;
`;

const MaxContentWidth = styled.div`
  max-width: 360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 48px;
  border-radius: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 4px 54px rgba(159, 159, 159, 0.25);
`;

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  background: repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConnectorList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border-radius: 12px;
`;

const Connector = styled.li`
  color: white;
  list-style-type: none;
  cursor: pointer;
  width: 100%;
  min-height: 80px;
  border-radius: 8px;
`;

const MaybeHideOnMobileConnector = styled(Connector)<{ shouldHide: boolean }>`
  @media (pointer: coarse) {
    display: ${(p) => (p.shouldHide ? 'none' : 'flex')};
  }
`;

const Header = styled.header`
  width: 100%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1825rem 3rem;

  @media (max-width: 400px) {
    padding: 1.1825rem 1.5rem;
  }
`;
