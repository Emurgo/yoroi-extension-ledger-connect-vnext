// @flow

import type {
  OperationNameType,
  TransportIdType
} from './enum';

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
