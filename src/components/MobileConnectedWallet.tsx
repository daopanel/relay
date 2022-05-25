import { useMemo, useState } from 'react';
import useCopyAddress from 'hooks/useCopyClipboard';
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Avatar from './Avatar';
import { useEnsName } from 'wagmi';
import door from '../../public/assets/images/exit-door-white.svg';
import MobileExternalLink from '../../public/assets/images/MobileExternalLink';
import MobileCopyAddress from '../../public/assets/images/MobileCopyAddress';
import { useXmtp } from 'hooks';
import * as secp from '@noble/secp256k1';

interface MobileConnectedWalletProps {
  address: string | undefined;
  onClickDisconnect: () => unknown;
  isLight?: boolean;
}
export default function MobileConnectedWallet(
  props: MobileConnectedWalletProps
) {
  const { client } = useXmtp();

  const { data: ensName } = useEnsName({ address: props.address });
  const [isConnected, setIsConnected] = useState(false);
  const [isCopied, copyAddress] = useCopyAddress();
  const [currentUserEns, setCurrentUserEns] = useState<string | undefined>('');
  const signature =
    client &&
    secp.utils.bytesToHex(
      client?.keys?.preKeys[0]?.secp256k1?.bytes as Uint8Array
    );

  //See notes under External Link for why this function exists
  function handleUrlClick() {
    setCurrentUserEns(props.address);
  }

  function handleClick(e: string | undefined) {
    copyAddress(e || '');
  }

  const displayName = useMemo(() => {
    if (ensName) {
      setIsConnected(true);
      return shortAddress(ensName);
    }
    if (props.address) {
      setIsConnected(true);
      return shortAddress(props.address);
    } else {
      setIsConnected(false);
      return 'Please connect your wallet...';
    }
  }, [ensName, props.address]);

  return (
    <Container isLight={props.isLight}>
      {props.address !== undefined && (
        <AbsoluteCorner>
          <ClickableImage
            src={door}
            width={25}
            height={25}
            alt="disconnect"
            onClick={props.onClickDisconnect}
          />
        </AbsoluteCorner>
      )}
      <Avatar size="large" address={props.address} />
      <Column>
        <Row>
          <Address signature={signature}>
            <span>Wallet Address: </span>
            {displayName}
          </Address>
        </Row>
        {signature && (
          <Row>
            <Signature>
              <span>Signature: </span>
              {signature}
            </Signature>
          </Row>
        )}
        <Row>
          {isConnected && (
            <LinkContainer>
              <Link onClick={() => handleClick(props.address)}>
                <MobileCopyAddress />
                {isCopied ? 'Copied' : 'Copy Address'}
              </Link>
              <ExternalLink
                // I had to put this click event on the link to get updated state for the users
                //ETH address. It was turning to undefined after page refresh and breaking the link
                onClick={handleUrlClick}
                href={`https://etherscan.io/address/${currentUserEns}`}
                target="_blank"
                rel="noreferrer">
                <Link>
                  <MobileExternalLink />
                  View on Explorer
                </Link>
              </ExternalLink>
            </LinkContainer>
          )}
        </Row>
      </Column>
    </Container>
  );
}

const Container = styled.div<{ isLight?: boolean }>`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding-left: 24px;
  padding-right: 19px;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 8px;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${(props) =>
    props.isLight ? '#2f2042' : 'rgba(16, 8, 23, 0.8)'};
  border: ${(props) =>
    props.isLight ? '2px solid #523f64' : '2px solid #191027'};
  font-size: 1rem;
  transition: 200ms;
  -webkit-transition: background-image 200ms;
  transition: background-image 200ms;
  transition: gap 400ms;

  &:hover {
    background: #2f2042;
    border: 2px solid #523f64;
    gap: 1.5rem;
  }
`;

const Address = styled.h2<{ signature: string | null }>`
  font-style: normal;
  font-size: 1rem;
  line-height: 18px;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.dimmedPurple};
  margin-bottom: ${({ signature }) => (signature ? '10px' : '0')};

  & > span {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Signature = styled.h3`
  font-size: 1rem;
  line-height: 18px;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.dimmedPurple};
  margin-right: 30px;
  & > span {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Link = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #9486aa;
  display: flex;
  gap: 9px;
  cursor: pointer;
  transition: color 200ms ease-in-out;
  margin-top: 12px;
  margin-right: 16px;
  min-width: 105px;

  //SVG Styling
  :first-child > :first-child {
    stroke: white;
  }
  &:hover {
    color: white;
  }
  > :first-child > :first-child,
  > :first-child > :nth-child(2),
  > :first-child > :nth-child(3) {
    transition: stroke 200ms ease-in-out;
  }
  &:hover > :first-child > :first-child,
  &:hover > :first-child > :nth-child(2),
  &:hover > :first-child > :nth-child(3) {
    stroke: white;
  }
  //End SVG Styling
`;

const ExternalLink = styled.a`
  text-decoration: none;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const AbsoluteCorner = styled.div`
  position: absolute;
  right: 10px;
  top: 12px;
`;

const ClickableImage = styled(Image)`
  cursor: pointer;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

function shortAddress(address: string): string {
  if (address.length < 15) return address;
  return address.slice(0, 8) + '...' + address.slice(-4);
}
