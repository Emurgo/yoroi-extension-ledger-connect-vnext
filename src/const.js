// @flow
import { TRANSPORT_ID } from './types/enum';

export const YOROI_LEDGER_CONNECT_TARGET_NAME = 'YOROI-LEDGER-CONNECT';
export const DEFAULT_TRANSPORT_PROTOCOL = TRANSPORT_ID.WEB_AUTHN;
export const DEFAULT_LOCALE = 'en-US';
export const ENV = {
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isFirefox: !!window.InstallTrigger
};
export const VIDEO_LINK_NANO_S = 'https://www.youtube.com/watch?v=YwdBLh7qAsI&t=2s';
export const VIDEO_LINK_NANO_X = 'https://www.youtube.com/watch?v=YwdBLh7qAsI&t=2s';
export const DEVICE_LOCK_CHECK_TIMEOUT = 500; // In milli-seconds
