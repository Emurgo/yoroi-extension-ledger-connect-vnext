// @flow
import type { BIP32Path } from '@cardano-foundation/ledgerjs-hw-app-cardano';
import TransportWebAuthn from '@ledgerhq/hw-transport-webauthn';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';

const HARDENED = 0x80000000;

/**
 * Converts hardened BIP32Path to it's string version
 * @param {*} hdPath hardened BIP32Path
 */
export const pathToString = (hdPath: BIP32Path) => {
  return `m/${hdPath
    .map((item) => (item % HARDENED) + (item >= HARDENED ? "'" : ''))
    .join('/')}`;
};

/**
 * Converts error code to string
 * @param {*} err
 */
export const ledgerErrToMessage = (err: any): any => {
  const isU2FError = (error) => !!error && !!(error).metaData;
  const isStringError = (error) => typeof error === 'string';

  // https://developers.yubico.com/U2F/Libraries/Client_error_codes.html
  const isErrorWithId = (error) => (
    Object.prototype.hasOwnProperty.call(error, 'id') &&
    Object.prototype.hasOwnProperty.call(error, 'message')
  );

  if (isU2FError(err)) {
    // Timeout
    if (err.metaData.code === 5) {
      return 'LEDGER_TIMEOUT';
    }
    return err.metaData.type;
  }

  if (isStringError(err)) {
    // Wrong app logged into
    if (err.includes('6804')) {
      return 'LEDGER_WRONG_APP';
    }
    // Ledger locked
    if (err.includes('6801')) {
      return 'LEDGER_LOCKED';
    }
    return err;
  }

  if (isErrorWithId(err)) {
    // Browser doesn't support U2F
    if (err.message.includes('U2F not supported')) {
      return 'U2F_NOT_SUPPORTED';
    }
  }

  // Other
  return err.toString();
};

/**
 * Create Ledger Transport protocol
 * @param {*} transportId transportId string
 */
export const makeTransport = async (transportId: string): Promise<Transport<*>> => {
  let transport;

  switch (transportId) {
    case 'webauthn':
      transport = TransportWebAuthn;
      break;
    case 'u2f':
      transport = TransportU2F;
      break;
    case 'webusb':
      transport = TransportWebUSB;
      break;
    default:
      throw new Error('Transport protocol not supported');
  }

  return await transport.create();
};
