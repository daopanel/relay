import React, { useState, useCallback, ReactElement, useMemo } from 'react';
import Redirect from 'contexts/RedirectContext';
import { useRouter } from 'next/router';

const RedirectProvider = (props: { children: ReactElement }) => {
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const router = useRouter();

  const doRedirectAway = useCallback(
    (awayPath: string) => {
      setRedirectTo(window.location.pathname);
      router.push(awayPath);
    },
    [setRedirectTo, router]
  );

  const doRedirectBack = useMemo(() => {
    if (redirectTo) {
      return () => {
        setRedirectTo(null);
        router.push(redirectTo);
      };
    } else {
      return null;
    }
  }, [router, redirectTo]);

  return (
    <Redirect.Provider value={{ doRedirectAway, doRedirectBack }}>
      {props.children}
    </Redirect.Provider>
  );
};

export default RedirectProvider;
