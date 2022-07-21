import { useMemo, useState } from 'react';
import useCopyAddress from 'hooks/useCopyClipboard';
import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Avatar from './Avatar';
import { useConnect, useEnsName } from 'wagmi';
import door from '../../public/assets/images/exit-door-dark.svg';
import MobileExternalLink from '../../public/assets/images/MobileExternalLink';
import MobileCopyAddress from '../../public/assets/images/MobileCopyAddress';
import { useResponsiveUserId } from 'hooks';
interface MobileConnectedWalletProps {
  address: string | undefined;
  onClickDisconnect: () => unknown;
  isLight?: boolean;
}
export default function MobileConnectedWallet(
  props: MobileConnectedWalletProps
) {
  const { data: ensName } = useEnsName({ address: props.address });
  const { isConnected } = useConnect();
  const [isCopied, copyAddress] = useCopyAddress();
  const responsiveId = useResponsiveUserId(
    ensName,
    props.address,
    'Please connect your wallet...'
  );

  function handleClick(e: string | undefined) {
    copyAddress(e || '');
  }

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
          <Address>{responsiveId}</Address>
        </Row>
        <Row>
          {isConnected && (
            <LinkContainer>
              <Link onClick={() => handleClick(props.address)}>
                <MobileCopyAddress />
                {isCopied ? 'Copied' : 'Copy Address'}
              </Link>
              <ExternalLink
                href={`https://etherscan.io/address/${props.address}`}
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
  box-sizing: border-box;
  background: white;
  border-bottom: 1px solid rgb(35, 25, 59, 0.45);
  font-size: 1rem;
  transition: 200ms;
  -webkit-transition: background-image 200ms;
  transition: background-image 200ms;
  transition: gap 400ms;
  &:hover {
    gap: 1.5rem;
  }
`;

const Address = styled.h2`
  font-style: normal;
  font-size: 1rem;
  line-height: 18px;
  letter-spacing: -0.01em;
  color: #252727;
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
  > :first-child > :first-child,
  > :first-child > :nth-child(2),
  > :first-child > :nth-child(3) {
    transition: stroke 200ms ease-in-out;
  }
  //End SVG Styling
`;

const ExternalLink = styled.a`
  text-decoration: none;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
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
