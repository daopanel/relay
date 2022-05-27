import { createContext } from 'react';

export interface RedirectContext {
  doRedirectAway: ((awayPath: string) => unknown) | null;
  doRedirectBack: (() => unknown) | null;
}

const Redirect = createContext<RedirectContext>({
  doRedirectAway: null,
  doRedirectBack: null,
});

export default Redirect;
