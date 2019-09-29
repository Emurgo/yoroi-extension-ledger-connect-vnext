// @flow
import type { BIP32Path } from '@cardano-foundation/ledgerjs-hw-app-cardano';

const HARDENED = 0x80000000;

export const pathToString = (hdPath: BIP32Path) => {
  return `m/${hdPath
    .map((item) => (item % HARDENED) + (item >= HARDENED ? "'" : ''))
    .join('/')}`;
};
