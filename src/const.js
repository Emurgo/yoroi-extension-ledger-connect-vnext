// @flow
export const YOROI_LEDGER_CONNECT_TARGET_NAME = 'YOROI-LEDGER-CONNECT';
export const DEFAULT_TRANSPORT_PROTOCOL = 'webauthn';
export const DEFAULT_LOCALE = 'en-US';
export const ENV = {
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development'
};
