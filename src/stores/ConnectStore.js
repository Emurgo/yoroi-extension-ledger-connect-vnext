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
import {
  pathToString,
  ledgerErrToMessage,
  makeTransport
} from '../utils';

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

  @computed
  get isTransportWebUSB(): boolean {
    return this.transportId === 'webusb';
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

  _detectLedgerDevice = async (transport: any): Promise<GetVersionResponse> => {
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

  // #==============================================#
  //  Cardano Ledger APIs
  // #==============================================#

  getVersion = async (
    actn: OparationNameType
  ): Promise<GetVersionResponse | void> => {
    let transport;
    try {
      transport = await makeTransport(this.transportId);

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
      transport = await makeTransport(this.transportId);
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
      transport = await makeTransport(this.transportId);
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

      transport = await makeTransport(this.transportId);
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
      transport = await makeTransport(this.transportId);
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

  /**
   * Handle message from Content Script [ Website <== Content Script ]
   * @param {*} req request message object
   */
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
        case OPARATION_NAME.CLOSE_WINDOW:
          window.close();
          break;
        default:
          // FOR NOW NO-OPERATION
          break;
      }
    } else {
      console.debug(`[YLC]::Got non ledger connectore request: ${req.origin}}`);
    }
  }

  /**
   * Wrapper for _replyMessage()
   * @param {*} actn action string
   * @param {*} success success status boolean
   * @param {*} payload payload object
   */
  _replyMessageWrap = (
    actn: string,
    success: boolean,
    payload: any
  ): void => {
    this._replyMessage({
      success,
      payload,
      action: actn,
    });
  }

  /**
   * Wrapper for _replyMessage() for sending error
   * @param {*} actn action string
   * @param {*} err Error object
   */
  _replyError = (
    actn: string,
    err: Error
  ): void => {
    console.error(`[YLC]::${actn}::error::${JSON.stringify(err)}`);
    const payload = {
      error: ledgerErrToMessage(err).toString()
    };
    this._replyMessageWrap(actn, false, payload);
  }

  /**
   * Reply message to Content Script  [ Website ==> Content Script ]
   * @param {*} msg MessageType object as reply
   */
  _replyMessage = (msg: MessageType): void => {
    msg.action = `${msg.action}-reply`;
    window.postMessage(msg, '*');
  }
}
