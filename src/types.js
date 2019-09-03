// @flow
import type { Node } from 'react';

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

export type InjectedContainerProps = {|
  rootStore: IRootStore,
  children?: Node,
|}

export const ProgressState = Object.freeze({
  IDLE: 'IDLE',
  DETECTING_DEVICE: 'DETECTING_DEVICE',
  DEVICE_FOUND: 'DEVICE_FOUND',
});
export type ProgressStateType = $Values<typeof ProgressState>;
