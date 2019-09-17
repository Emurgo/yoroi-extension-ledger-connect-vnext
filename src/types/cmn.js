// @flow
export type MessageType = {
  action: string,
  success: boolean,
  payload: any
};

export type URLParams = {
  transportId: string,
  locale: string
}

export interface IRootStore {
  profileStore: IChildStore;
  connectStore: IChildStore;
}

export interface IChildStore {
  rootStore: IRootStore
}

export const PROGRESS_STATE = Object.freeze({
  IDLE: 'IDLE',
  DETECTING_DEVICE: 'DETECTING_DEVICE',
  DEVICE_FOUND: 'DEVICE_FOUND',
});
export type ProgressStateType = $Values<typeof PROGRESS_STATE>;

export const OPARATION_NAME = Object.freeze({
  NO_OPARATION: 'no-oparation',
  TEST_READY: 'is-ready', // TODO rename, is-ready -> test-ready
  GET_LEDGER_VERSION: 'ledger-get-version',
  GET_EXTENDED_PUBLIC_KEY: 'ledger-get-extended-public-key',
  SIGN_TX: 'ledger-sign-transaction',
  SHOW_ADDRESS: 'ledger-show-address',
  DERIVE_ADDRESS: 'ledger-derive-address',
});
export type OparationNameType = $Values<typeof OPARATION_NAME>;

export const DEVICE_NAME = Object.freeze({
  NANO_S: 'LedgerNanoS',
  NANO_X: 'LedgerNanoX',
});
export type DeviceNameType = $Values<typeof DEVICE_NAME>;
