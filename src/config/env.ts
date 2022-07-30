// Environment Breakdown because the naming is confusing
//
// * Dev (npm run dev, local development)
// * Prod (npm run build)
//   * Relay (public site on XMTP production network)
//   * Relay Dev (public site on XMTP dev network)
//   * Preview (preview envs deployed by Vercel)
//   * Local (npm run build executed locally)

export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const isRelayProd = Boolean(process.env.NEXT_PUBLIC_IS_RELAY_PROD);
export const isRelayDev = Boolean(process.env.NEXT_PUBLIC_IS_RELAY_DEV);
export const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';
export const isLocal = Boolean(process.env.IS_LOCAL_PROD);

let envCount = 0;
isDev && envCount++;
isRelayProd && envCount++;
isRelayDev && envCount++;
isPreview && envCount++;
isLocal && envCount++;

let prodEnvCount = 0;
isRelayProd && prodEnvCount++;
isRelayDev && prodEnvCount++;
isPreview && prodEnvCount++;
isLocal && prodEnvCount++;

if (envCount > 1) {
  throw new Error(
    'More than 1 of isDev, isRelayProd, isRelayDev, isPreview, isLocal is true!'
  );
}
if (isProd && prodEnvCount === 0) {
  throw new Error(
    'isProd is true but isRelayProd, isRelayDev, isPreview, and isLocal are all false!'
  );
}
