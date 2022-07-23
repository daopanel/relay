import styled from 'styled-components';
import ArrowLeftWhite from '../../public/assets/images/ArrowLeftDark.svg';
import MobileFixedHeader from './MobileFixedHeader';
import Image from 'next/image';
import useCopyClipboard from 'hooks/useCopyClipboard';
interface MobileMessageHeaderProps {
  titleText: string;
  onMenuClick: () => unknown;
  onClickBack: () => unknown;
}

export default function MobileMessagesHeader({
  titleText,
  onMenuClick,
  onClickBack,
}: MobileMessageHeaderProps) {
  const [isCopied, doCopy] = useCopyClipboard();
  return (
    <MobileFixedHeader>
      <Menu
        width={30}
        height={30}
        src={'/assets/images/MobileDarkHamburgerMenu.svg'}
        onClick={onMenuClick}
      />
      {isCopied || (
        <UserDisplay onClick={() => doCopy(titleText)}>{titleText}</UserDisplay>
      )}
      {isCopied && <Copied>Copied!</Copied>}
      <GoBack
        width={20}
        height={20}
        src={ArrowLeftWhite}
        onClick={onClickBack}
      />
    </MobileFixedHeader>
  );
}

const UserDisplay = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  color: #ffffff;
  color: #252727;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 16px;
  cursor: pointer;

  :hover {
    margin-bottom: 4px;
  }
`;

const Copied = styled(UserDisplay)`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 4px;
`;

const GoBack = styled(Image)`
  cursor: pointer;
`;

const Menu = styled(Image)`
  cursor: pointer;
`;
