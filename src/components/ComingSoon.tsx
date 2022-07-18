import MobileMenu from 'components/MobileMenu';
import MobileMessagesHeader from 'components/MobileMessagesHeader';
import MobileStatusCard from 'components/MobileStatusCard';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface ComingSoonProps {
  text: string;
}

const ComingSoon = ({ text }: ComingSoonProps) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();

  const openMenu = useCallback(() => setShowMenu(true), [setShowMenu]);
  const closeMenu = useCallback(() => setShowMenu(false), [setShowMenu]);
  const goToConversations = useCallback(
    () => router.push('/conversations'),
    [router]
  );

  return (
    <Page>
      <MobileMenu onClickClose={closeMenu} showMenu={showMenu} />
      <MobileMessagesHeader
        onClickBack={() => router.back()}
        onMenuClick={openMenu}
        titleText={text}
      />
      <Centered>
        <MobileStatusCard
          title="Feature under development..."
          subtitle="Check back soon!"
          isLoading={false}
          isError={false}
          errorText=""
          buttonText="Go Back to Conversations"
          onClick={goToConversations}
        />
      </Centered>
    </Page>
  );
};

const Page = styled.div`
  height: 100%;
  width: 100vw;
  background: white;
  display: flex;
  flex-direction: column;
`;

const Centered = styled.div`
  margin: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  padding: 24px;
`;

export default ComingSoon;
