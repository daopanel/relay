import styled from 'styled-components';
import Image from 'next/image';
import Github from './Github';
import MirrorWhite from '../../public/assets/images/mirror-white.png';

export default function MobileBetaStatus() {
  return (
    <Wrapper>
      <a href="https://www.daopanel.com/" target="_blank" rel="noreferrer">
        <Image
          src="/assets/images/whiteonly.png"
          width="28"
          height="24"
          alt="white-logo"
        />
      </a>
      <Spacer />
      <a
        href="https://www.github.com/daopanel"
        target="_blank"
        rel="noreferrer">
        <Github />
      </a>
      <Spacer />
      <MirrorLink
        href="https://www.mirror.xyz/panel.eth"
        target="_blank"
        rel="noreferrer"
      />
    </Wrapper>
  );
}

const Spacer = styled.span`
  width: 1px;
  height: 28px;
  background-color: #9771ff;
  margin-right: 10px;
`;

const MirrorLink = styled.a`
  display: block;
  background-image: url(${MirrorWhite.src});
  background-repeat: no-repeat;
  background-size: contain;
  height: 24px;
  width: 18px;
  margin-left: 3px;
`;

const PublicBeta = styled.a`
  font-weight: 900;
  font-variant: small-caps;
  font-size: 16px;
  display: inline;
  cursor: pointer;
  text-decoration: none;
  color: #f77272;
  margin-left: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #7349e5;
  border: 2px solid #9771ff;
  padding: 0.5rem 0.25rem 0.5rem 0.5rem;
  border-radius: 12px;

  & > a {
    margin-right: 0.5rem;
  }
`;
