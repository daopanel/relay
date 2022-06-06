import Config from 'config';

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: Config.Sentry.dsn,
  environment: Config.Sentry.environment,
  tracesSampleRate: Config.Sentry.tracesSampleRate,
});
