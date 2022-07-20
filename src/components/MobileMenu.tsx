import styled from 'styled-components';
import Image from 'next/image';
import MobileConnectedWallet from './MobileConnectedWallet';
import MobileBetaStatus from './MobileBetaStatus';
import { useAccount, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import { useCallback, useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  onClickClose: () => unknown;
  showMenu: boolean;
}

export default function MobileMenu({
  onClickClose,
  showMenu,
}: MobileMenuProps) {
  const { data: accountData } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const slider = useRef(null);
  const minSwipeDistance = 50;

  //Closes Slider window when clicked off of
  /* eslint-disable-next-line */
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      /* eslint-disable-next-line */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          onClickClose();
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(slider);

  /* eslint-disable-next-line */
  const onTouchStart = (e: any) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  /* eslint-disable-next-line */
  const onTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe) {
      isLeftSwipe && onClickClose();
    }
  };

  const goHome = useCallback(() => {
    disconnect();
    router.push('/');
  }, [router, disconnect]);

  return (
    <FullHeightSlider
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      showMenu={showMenu}
      ref={slider}>
      <Header>
        <MobileBetaStatus />
        <ClickableImage
          src="/assets/images/ArrowLeftDark.svg"
          height={20}
          width={20}
          alt="close"
          onClick={onClickClose}
        />
      </Header>
      <ConnectedWrapper>
        <MobileConnectedWallet
          isLight={true}
          address={`${accountData?.address}`}
          onClickDisconnect={goHome}
        />
      </ConnectedWrapper>
      <MenuItems>
        <Link href={'/conversations'} passHref>
          <MenuItem>
            <Image
              src={'/assets/images/MessagesLight.png'}
              width={40}
              height={40}
              alt="github"
            />
            <MenuItemDescription>
              <PrimaryText>Messages</PrimaryText>
            </MenuItemDescription>
          </MenuItem>
        </Link>
        <Link href={'/groups'} passHref>
          <MenuItem>
            <Image
              src={'/assets/images/group.svg'}
              width={40}
              height={40}
              alt="groups"
            />
            <MenuItemDescription>
              <PrimaryText>Groups</PrimaryText>
            </MenuItemDescription>
          </MenuItem>
        </Link>
        <Link href={'/requests'} passHref>
          <MenuItem>
            <Image
              src={'/assets/images/Broadcasts.png'}
              width={40}
              height={40}
              alt="github"
            />
            <MenuItemDescription>
              <PrimaryText>Broadcasts</PrimaryText>
            </MenuItemDescription>
          </MenuItem>
        </Link>
      </MenuItems>
    </FullHeightSlider>
  );
}
interface StyleProps {
  showMenu: boolean;
}

const MenuItems = styled.nav`
  width: 100%;
  padding-right: 44px;
  padding-left: 40px;
`;

const MenuItem = styled.a`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #23193b;
  padding: 20px 0;
  gap: 0px;
  transition: gap 400ms;
  cursor: pointer;
  &:hover {
    gap: 10px;
  }
`;

const MenuItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

const PrimaryText = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  color: #292b2b;
`;

const SecondaryText = styled.h3`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: -0.01em;
  color: #75668c;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 90px;
  padding-right: 40px;
  padding-left: 40px;
  margin-bottom: 3rem;
`;

const FullHeightSlider = styled.div<StyleProps>`
  position: fixed;
  width: 90vw;
  height: 100vh;
  z-index: 100;
  background: white;
  border-right: 2px solid black;
  left: ${({ showMenu }) => (showMenu ? '0vw' : '-90vw')};
  visibility: auto;
  visibility: ${({ showMenu }) => (showMenu ? 'auto' : 'hidden')};
  transition: left 300ms ease-in-out, visibility 300ms ease-in-out;
`;

const ConnectedWrapper = styled.div`
  padding: 1rem;
`;

const ClickableImage = styled(Image)`
  cursor: pointer;
`;
