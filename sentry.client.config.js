import * as Sentry from '@sentry/nextjs';
import Config from 'config';

Sentry.init({
  dsn: Config.Sentry.dsn,
  environment: Config.Sentry.environment,
  tracesSampleRate: Config.Sentry.tracesSampleRate,
});
