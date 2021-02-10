// @flow //

import type {
  OperationNameType,
  TransportIdType
} from './enum';
import type {
  BIP32Path,
  InputTypeUTxO,
  TxOutputTypeAddress,
  TxOutputTypeAddressParams,
  StakingBlockchainPointer,
  Certificate,
  Withdrawal,
} from '@cardano-foundation/ledgerjs-hw-app-cardano';
import { AddressTypeNibbles } from '@cardano-foundation/ledgerjs-hw-app-cardano';

export type MessageType = {
  action: string,
  extension: ?string,
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

export type GetVersionRequest = void;
export type GetSerialRequest = void;
export type GetExtendedPublicKeyRequest = {|
  path: BIP32Path
|};
export type DeriveAddressRequest = {|
  addressTypeNibble: $Values<typeof AddressTypeNibbles>,
  networkIdOrProtocolMagic: number,
  spendingPath: BIP32Path,
  stakingPath: ?BIP32Path,
  stakingKeyHashHex: ?string,
  stakingBlockchainPointer: ?StakingBlockchainPointer,
|};
export type ShowAddressRequest = {|
  addressTypeNibble: $Values<typeof AddressTypeNibbles>,
  networkIdOrProtocolMagic: number,
  spendingPath: BIP32Path,
  stakingPath: ?BIP32Path,
  stakingKeyHashHex: ?string,
  stakingBlockchainPointer: ?StakingBlockchainPointer
|};
export type SignTransactionRequest = {|
  networkId: number,
  protocolMagic: number,
  inputs: Array<InputTypeUTxO>,
  outputs: Array<TxOutputTypeAddress | TxOutputTypeAddressParams>,
  feeStr: string,
  ttlStr: string,
  certificates: Array<Certificate>,
  withdrawals: Array<Withdrawal>,
  metadataHashHex: ?string
|};

export type VerifyAddressInfoType = {|
  address: string,
  ...ShowAddressRequest,
|}
