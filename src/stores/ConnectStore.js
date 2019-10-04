// @flow
import { observable, action, runInAction, computed } from 'mobx';
import AdaApp from '@cardano-foundation/ledgerjs-hw-app-cardano';
import type {
  BIP32Path,
  InputTypeUTxO,
  OutputTypeAddress,
  OutputTypeChange,
  GetVersionResponse,
  GetExtendedPublicKeyResponse,
  SignTransactionResponse,
  DeriveAddressResponse
} from '@cardano-foundation/ledgerjs-hw-app-cardano';
import type Transport from '@ledgerhq/hw-transport';
import TransportWebAuthn from '@ledgerhq/hw-transport-webauthn';
import TransportU2F from '@ledgerhq/hw-transport-u2f';

import type {
  MessageType,
  RequestType,
  DeviceCodeType,
  ProgressStateType,
  OparationNameType,
  VerifyAddressInfoType
} from '../types/cmn';
import {
  PROGRESS_STATE,
  OPARATION_NAME,
} from '../types/cmn';
import { YOROI_LEDGER_CONNECT_TARGET_NAME } from '../const';
import { pathToString } from '../utils';

export type ExtenedPublicKeyResp = {
  ePublicKey: GetExtendedPublicKeyResponse,
  deviceVersion: GetVersionResponse
};

export default class ConnectStore {
  @observable transportId: string;
  @observable progressState: ProgressStateType;
  @observable currentOparationName: OparationNameType;
  @observable verifyAddressInfo: VerifyAddressInfoType;
  @observable deviceName: DeviceCodeType
  userInteractableRequest: RequestType;

  constructor(transportId: string) {
    window.addEventListener('message', this._onMessage);

    runInAction(() => {
      this.transportId = transportId;
      this.progressState = PROGRESS_STATE.IDLE;
      this.currentOparationName = OPARATION_NAME.NO_OPARATION;
    });
  }

  @computed
  get isTransportWebAuthn(): boolean {
    return this.transportId === 'webauthn';
  }

  @computed
  get isTransportU2F(): boolean {
    return this.transportId === 'u2f';
  }

  @action('Changing Transport')
  setTransport = (transportId: string) => {
    this.transportId = transportId;
  }

  @action('Changing Progress State')
  setProgressState = (progressState: ProgressStateType) => {
    this.progressState = progressState;
  }

  @action('Changing Current Oparation Name')
  setCurrentOparationName = (currentOparationName: OparationNameType) => {
    this.currentOparationName = currentOparationName;
  }

  @action('Changing device name')
  setDeviceName = (deviceName: DeviceCodeType) => {
    this.deviceName = deviceName;
  }

  @action('Change Verify Address Info')
  setVerifyAddressInfo = (verifyAddressInfo: VerifyAddressInfoType) => {
    this.verifyAddressInfo = verifyAddressInfo;
  }

  _makeTransport = async (): Promise<Transport<*>> => {
    let transport;
    if (this.transportId === 'webauthn') {
      transport = TransportWebAuthn;
    } else if (this.transportId === 'u2f') {
      transport = TransportU2F;
    } else {
      throw new Error('Transport protocol not supported');
    }

    return await transport.create();
  }

  _detectLedgerDevice = async (transport: Transport<*>): Promise<GetVersionResponse> => {
    this.setProgressState(PROGRESS_STATE.DETECTING_DEVICE);

    const adaApp = new AdaApp(transport);
    const verResp = await adaApp.getVersion();

    this.setProgressState(PROGRESS_STATE.DEVICE_FOUND);

    return verResp;
  }

  executeActionWithCustomRequest = (
    deviceName: DeviceCodeType,
    request: RequestType
  ) => {
    this.userInteractableRequest = request;
    this.executeAction(deviceName);
  }

  executeAction = (deviceName: DeviceCodeType) => {
    this.setDeviceName(deviceName);

    const actn = this.userInteractableRequest.action;
    const { params } = this.userInteractableRequest;

    switch (actn) {
      case OPARATION_NAME.GET_LEDGER_VERSION:
        this.getVersion(actn);
        break;
      case OPARATION_NAME.GET_EXTENDED_PUBLIC_KEY:
        this.getExtendedPublicKey(actn, params.hdPath);
        break;
      case OPARATION_NAME.SIGN_TX:
        this.signTransaction(actn, params.inputs, params.outputs);
        break;
      case OPARATION_NAME.SHOW_ADDRESS:
        this.showAddress(actn, params.hdPath, params.address);
        break;
      case OPARATION_NAME.DERIVE_ADDRESS:
        this.deriveAddress(actn, params.hdPath);
        break;
      default:
        // FOR NOW NO-OPERATION
        break;
    }
  }

  getVersion = async (
    actn: OparationNameType
  ): Promise<GetVersionResponse | void> => {
    let transport;
    try {
      transport = await this._makeTransport();

      const adaApp = new AdaApp(transport);
      const res: GetVersionResponse = await adaApp.getVersion();
      this._replyMessageWrap(actn, true, res);

      return res;
    } catch (err) {
      this._replyError(actn, err);
    } finally {
      transport && transport.close();
    }
  }

  getExtendedPublicKey = async (
    actn: OparationNameType,
    hdPath: BIP32Path
  ): Promise<ExtenedPublicKeyResp | void> => {
    let transport;
    try {
      transport = await this._makeTransport();
      const verResp = await this._detectLedgerDevice(transport);

      const adaApp = new AdaApp(transport);

      const ePublicKeyResp: GetExtendedPublicKeyResponse =
        await adaApp.getExtendedPublicKey(hdPath);

      const res = {
        ePublicKey: ePublicKeyResp,
        deviceVersion: verResp
      };
      this._replyMessageWrap(actn, true, res);

      return res;
    } catch (err) {
      this._replyError(actn, err);
    } finally {
      transport && transport.close();
    }
  }

  signTransaction = async (
    actn: OparationNameType,
    inputs: Array<InputTypeUTxO>,
    outputs: Array<OutputTypeAddress | OutputTypeChange>
  ): Promise<SignTransactionResponse | void> => {
    let transport;
    try {
      transport = await this._makeTransport();
      await this._detectLedgerDevice(transport);

      const adaApp = new AdaApp(transport);
      const res: SignTransactionResponse = await adaApp.signTransaction(inputs, outputs);
      this._replyMessageWrap(actn, true, res);

      return res;
    } catch (err) {
      this._replyError(actn, err);
    } finally {
      transport && transport.close();
    }
  }

  showAddress = async (
    actn: OparationNameType,
    hdPath: BIP32Path,
    address: string
  ): Promise<void> => {
    let transport;
    try {
      this.setVerifyAddressInfo({
        address,
        hdPath: pathToString(hdPath)
      });

      transport = await this._makeTransport();
      await this._detectLedgerDevice(transport);

      const adaApp = new AdaApp(transport);
      const res = await adaApp.showAddress(hdPath);
      this._replyMessageWrap(actn, true, res);

    } catch (err) {
      this._replyError(actn, err);
    } finally {
      transport && transport.close();
    }
  }

  deriveAddress = async (
    actn: OparationNameType,
    hdPath: BIP32Path
  ): Promise<DeriveAddressResponse | void> => {
    let transport;
    try {
      transport = await this._makeTransport();
      await this._detectLedgerDevice(transport);

      const adaApp = new AdaApp(transport);
      const res: DeriveAddressResponse = await adaApp.deriveAddress(hdPath);
      this._replyMessageWrap(actn, true, res);

      return res;
    } catch (err) {
      this._replyError(actn, err);
    } finally {
      transport && transport.close();
    }
  }

  // #==============================================#
  //  Website <==> Content Script communications
  // #==============================================#

  // Handle message from Content Script [ Website <== Content Script ]
  _onMessage = (req: any): void => {
    if (req && req.data && req.data.target === YOROI_LEDGER_CONNECT_TARGET_NAME) {
      const { source } = req;
      const { params } = req.data;
      const actn = req.data.action;

      console.debug(`[YLC]::request: ${actn}`);

      switch (actn) {
        case OPARATION_NAME.GET_LEDGER_VERSION:
        case OPARATION_NAME.GET_EXTENDED_PUBLIC_KEY:
        case OPARATION_NAME.SIGN_TX:
        case OPARATION_NAME.SHOW_ADDRESS:
        case OPARATION_NAME.DERIVE_ADDRESS:
          this.setCurrentOparationName(actn);
          if (!this.userInteractableRequest) {
            this.userInteractableRequest = {
              params,
              action: actn,
              source
            };
          }
          break;
        default:
          // FOR NOW NO-OPERATION
          break;
      }
    } else {
      console.debug(`[YLC]::Got non ledger connectore request: ${req.origin}}`);
    }
  }

  // Reply message to Content Script  [ Website ==> Content Script ]
  _replyMessageWrap = (
    a: string,
    s: boolean,
    p: any
  ): void => {
    this._replyMessage({
      action: a,
      success: s,
      payload: p
    });
  }

  _replyError = (
    actn: string,
    err: Error
  ): void => {
    console.error(`[YLC]::${actn}::error::${JSON.stringify(err)}`);
    const payload = {
      error: _ledgerErrToMessage(err).toString()
    };
    this._replyMessageWrap(actn, false, payload);
  }

  _replyMessage = (msg: MessageType): void => {
    msg.action = `${msg.action}-reply`;
    window.postMessage(msg, '*');
  }
}


/**
 * Converts error code to string
 * @param {*} err
 */
const _ledgerErrToMessage = (err: any): any => {
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
