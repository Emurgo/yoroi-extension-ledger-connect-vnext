// @flow
export type MessageType = {
  action: string,
  success: boolean,
  payload: any
};

export type RequestType = {
  action: OperationNameType,
  params: any,
}

export type URLParams = {
  transportId: TransportIdType,
  locale: string
}

export type VerifyAddressInfoType = {
  hdPath: string,
  address: string,
}

export const PROGRESS_STATE = Object.freeze({
  LOADING: 'LOADING',
  DEVICE_TYPE_SELECTION: 'DEVICE_TYPE_SELECTION',
  DEVICE_TYPE_SELECTED: 'DEVICE_TYPE_SELECTED',
  DETECTING_DEVICE: 'DETECTING_DEVICE',
  DEVICE_FOUND: 'DEVICE_FOUND',
});
export type ProgressStateType = $Values<typeof PROGRESS_STATE>;

export const OPERATION_NAME = Object.freeze({
  GET_LEDGER_VERSION: 'ledger-get-version',
  GET_EXTENDED_PUBLIC_KEY: 'ledger-get-extended-public-key',
  SIGN_TX: 'ledger-sign-transaction',
  SHOW_ADDRESS: 'ledger-show-address',
  DERIVE_ADDRESS: 'ledger-derive-address',
  CLOSE_WINDOW: 'close-window',
});
export type OperationNameType = $Values<typeof OPERATION_NAME>;

export const DEVICE_CODE = Object.freeze({
  NANO_S: 's',
  NANO_X: 'x',
});
export type DeviceCodeType = $Values<typeof DEVICE_CODE>;

export const TRANSPORT_ID = Object.freeze({
  WEB_AUTHN: 'webauthn',
  U2F: 'u2f',
  WEB_USB: 'webusb'
});
export type TransportIdType = $Values<typeof TRANSPORT_ID>;
