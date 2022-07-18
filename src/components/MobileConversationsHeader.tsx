import styled from 'styled-components';
import MobileMenu from '../../public/assets/images/MobileDarkHamburgerMenu.svg';
import NewConversation from '../../public/assets/images/MobileNewConversationDark.svg';
import Image from 'next/image';
import MobileFixedHeader from './MobileFixedHeader';

interface MobileConversationsHeaderProps {
  onClickMenu: () => unknown;
  onClickNewConversation: () => unknown;
  activeCategory: string;
}

export default function MobileConversationsHeader(
  props: MobileConversationsHeaderProps
) {
  return (
    <MobileFixedHeader>
      <ClickableImage
        src={MobileMenu}
        alt="menu"
        width={30}
        height={30}
        onClick={props.onClickMenu}
      />
      <ActiveCategory>{props.activeCategory}</ActiveCategory>
      <ClickableImage
        src={NewConversation}
        alt="menu"
        width={20}
        height={20}
        onClick={props.onClickNewConversation}
      />
    </MobileFixedHeader>
  );
}

const ActiveCategory = styled.h1`
  color: #252727;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
`;

const ClickableImage = styled(Image)`
  cursor: pointer;
`;
