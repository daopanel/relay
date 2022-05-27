import { providers } from 'ethers';
import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import XmtpProvider from 'components/XmtpProvider';
import RedirectProvider from 'components/RedirectProvider';
import { GlobalStyles, theme } from 'styles/global';
import {
  Provider as WagmiProvider,
  chain,
  createClient,
  defaultChains,
} from 'wagmi';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

const alchemyKey = 'kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx';

const chains = defaultChains;
const defaultChain = chain.mainnet;

// Set up connectors
const wagmi = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const chain = chains.find((x) => x.id === chainId) ?? defaultChain;
    const rpcUrl = chain.rpcUrls.alchemy
      ? `${chain.rpcUrls.alchemy}/${alchemyKey}`
      : chain.rpcUrls.default;
    return [
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi',
          chainId: chain.id,
          jsonRpcUrl: rpcUrl,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
          rpc: { [chain.id]: rpcUrl },
        },
      }),
      new InjectedConnector({
        chains,
        options: { shimDisconnect: true },
      }),
    ];
  },
  provider(config) {
    return new providers.AlchemyProvider(config.chainId, alchemyKey);
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WagmiProvider client={wagmi}>
        <XmtpProvider>
          <RedirectProvider>
            <>
              <GlobalStyles />
              <Component {...pageProps} />
            </>
          </RedirectProvider>
        </XmtpProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
