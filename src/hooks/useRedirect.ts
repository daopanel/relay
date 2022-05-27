import Redirect from 'contexts/RedirectContext';
import { useContext } from 'react';

export function useRedirect() {
  const context = useContext(Redirect);
  if (context === undefined)
    throw new Error('This hook must be used inside an Redirect.Provider');
  return context;
}
