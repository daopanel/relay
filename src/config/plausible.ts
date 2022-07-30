import { isRelayProd, isRelayDev } from './env';

export class Plausible {
  public static enabled() {
    if (process.env.NEXT_PUBLIC_ENABLE_PLAUSIBLE === 'false') return false;
    return Boolean(process.env.NEXT_PUBLIC_ENABLE_PLAUSIBLE);
  }

  public static domain() {
    // TODOD The domains in plausible don't match the current domains, maybe there is
    // a way to fix that.
    if (isRelayProd) return 'daopanel.chat';
    if (isRelayDev) return 'devpanel.chat';
    return 'daopanel.local';
  }

  public static trackLocalhost() {
    if (process.env.NEXT_PUBLIC_TRACK_LOCALHOST === 'false') return false;
    return Boolean(process.env.NEXT_PUBLIC_TRACK_LOCALHOST);
  }
}
