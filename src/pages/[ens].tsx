import { useConnect } from 'wagmi';
import { useEffect } from 'react';
import { useRedirect } from 'hooks';
import MobileMessages from 'components/MobileMessages';

export default function Page() {
  const { isConnected, isReconnecting } = useConnect();
  const { doRedirectAway } = useRedirect();

  useEffect(() => {
    if (!isConnected && !isReconnecting) {
      doRedirectAway && doRedirectAway('/');
    }
  }, [isConnected, isReconnecting, doRedirectAway]);

  return <MobileMessages />;
}
