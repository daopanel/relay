import { useConnect } from 'wagmi';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Conversations from 'components/Conversations';

export default function Page() {
  const { isConnected, isReconnecting } = useConnect();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected && !isReconnecting) router.push('/');
  }, [isConnected, isReconnecting, router]);

  return <Conversations />;
}
