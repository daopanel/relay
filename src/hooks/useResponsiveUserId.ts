import { useMemo } from 'react';
import { useWindowSize } from './useWindowSize';
export const useResponsiveUserId = (
  ensName: string | null | undefined,
  address: string | null | undefined,
  fallback: string
) => {
  const { width } = useWindowSize();

  const userDisplayId = useMemo(() => {
    return ensName || address;
  }, [ensName, address]);

  const responsiveDisplayId = useMemo(() => {
    if (!userDisplayId) {
      return fallback;
    } else {
      if (width && width < 768) {
        return truncated(userDisplayId);
      } else {
        return userDisplayId;
      }
    }
  }, [userDisplayId, width, fallback]);

  return responsiveDisplayId;
};

function truncated(str: string): string {
  return str.slice(0, 6) + '...' + str.slice(-4);
}
