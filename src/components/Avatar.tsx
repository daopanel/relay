import { useEnsAvatar } from 'wagmi';
import Image from 'next/image';
import styled from 'styled-components';
import Blockies from 'react-blockies';
import LoadingSpinner from './LoadingSpinner';

interface AvatarProps {
  address?: string | undefined;
  size?: 'small' | 'medium' | 'large';
}
export default function Avatar(props: AvatarProps) {
  const {
    data: ensAvatar,
    isFetching,
    isLoading,
  } = useEnsAvatar({ addressOrName: props.address });

  if (!ensAvatar) {
    return (
      <Blockies
        seed={props.address || ''}
        size={10}
        scale={4}
        className={'circle'}
      />
    );
  } else if (isFetching || isLoading) {
    return <LoadingSpinner width={40} height={40} />;
  } else {
    return (
      <AvatarImage
        src={ensAvatar}
        width={props.size === 'large' ? 60 : 40}
        height={props.size === 'large' ? 60 : 40}
        alt="user"
      />
    );
  }
}

const AvatarImage = styled(Image)`
  border-radius: 50%;
`;
