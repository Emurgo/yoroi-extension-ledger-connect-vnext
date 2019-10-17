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
  OperationNameType,
  VerifyAddressInfoType,
  TransportIdType,
} from '../types/cmn';
import {
  PROGRESS_STATE,
  OPERATION_NAME,
} from '../types/cmn';
import {
  YOROI_LEDGER_CONNECT_TARGET_NAME,
  DEVICE_LOCK_CHECK_TIMEOUT
} from '../const';
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
  @observable transportId: TransportIdType;
  @observable progressState: ProgressStateType;
  @observable currentOperationName: OperationNameType;
  @observable verifyAddressInfo: VerifyAddressInfoType;
  @observable deviceCode: DeviceCodeType
  @observable wasDeviceLocked: boolean;
  userInteractableRequest: RequestType;

  constructor(transportId: TransportIdType) {
    window.addEventListener('message', this._onMessage);

    runInAction(() => {
      this.wasDeviceLocked = false;
      this.transportId = transportId;
      this.progressState = PROGRESS_STATE.LOADING;
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
  setTransport = (transportId: TransportIdType): void => {
    this.transportId = transportId;
  }

  @action('Changing Progress State')
  setProgressState = (progressState: ProgressStateType): void => {
    this.progressState = progressState;
  }

  @action('Changing Current Operation Name')
  setCurrentOperationName = (currentOperationName: OperationNameType): void => {
    this.currentOperationName = currentOperationName;
  }

  @action('Changing device name')
  setDeviceCode = (deviceCode: DeviceCodeType): void => {
    this.deviceCode = deviceCode;
  }

  @action('Change Verify Address Info')
  setVerifyAddressInfo = (verifyAddressInfo: VerifyAddressInfoType): void => {
    this.verifyAddressInfo = verifyAddressInfo;
  }

  _detectLedgerDevice = async (transport: any): Promise<GetVersionResponse> => {

    setTimeout(() => {
      // Device is not detected till now so we assume that it's locked
      if (this.progressState === PROGRESS_STATE.DEVICE_TYPE_SELECTED) {
        runInAction(() => {
          this.wasDeviceLocked = true;
          this.setProgressState(PROGRESS_STATE.DETECTING_DEVICE);
        });
      }
    }, DEVICE_LOCK_CHECK_TIMEOUT);

    const adaApp = new AdaApp(transport);
    const verResp = await adaApp.getVersion();

    this.setProgressState(PROGRESS_STATE.DEVICE_FOUND);

    return verResp;
  }

  executeActionWithCustomRequest = (
    deviceCode: DeviceCodeType,
    request: RequestType
  ) => {
    this.userInteractableRequest = request;
    this.executeAction(deviceCode);
  }

  executeAction = (deviceCode: DeviceCodeType) => {
    runInAction(() => {
      this.setDeviceCode(deviceCode);
      this.setProgressState(PROGRESS_STATE.DEVICE_TYPE_SELECTED);
    });

    const actn = this.userInteractableRequest.action;
    const { params } = this.userInteractableRequest;

    switch (actn) {
      case OPERATION_NAME.GET_LEDGER_VERSION:
        this.getVersion(actn);
        break;
      case OPERATION_NAME.GET_EXTENDED_PUBLIC_KEY:
        this.getExtendedPublicKey(actn, params.hdPath);
        break;
      case OPERATION_NAME.SIGN_TX:
        this.signTransaction(actn, params.inputs, params.outputs);
        break;
      case OPERATION_NAME.SHOW_ADDRESS:
        this.showAddress(actn, params.hdPath, params.address);
        break;
      case OPERATION_NAME.DERIVE_ADDRESS:
        this.deriveAddress(actn, params.hdPath);
        break;
      default:
        throw new Error(`[YLC] Unexpected action called: ${actn}`);
    }
  }

  // #==============================================#
  //  Cardano Ledger APIs
  // #==============================================#

  getVersion = async (
    actn: OperationNameType
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
    actn: OperationNameType,
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
    actn: OperationNameType,
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
    actn: OperationNameType,
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
    actn: OperationNameType,
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
      const { params } = req.data;
      const actn = req.data.action;

      console.debug(`[YLC] request: ${actn}`);

      switch (actn) {
        case OPERATION_NAME.GET_LEDGER_VERSION:
        case OPERATION_NAME.GET_EXTENDED_PUBLIC_KEY:
        case OPERATION_NAME.SIGN_TX:
        case OPERATION_NAME.SHOW_ADDRESS:
        case OPERATION_NAME.DERIVE_ADDRESS:
          runInAction(() => {
            this.setCurrentOperationName(actn);
            this.setProgressState(PROGRESS_STATE.DEVICE_TYPE_SELECTION);
          });

          if (!this.userInteractableRequest) {
            this.userInteractableRequest = {
              params,
              action: actn,
            };
          }
          break;
        case OPERATION_NAME.CLOSE_WINDOW:
          window.close();
          break;
        default:
          console.debug(`[YLC] Unexpected action requested: ${actn}`);
          break;
      }
    } else {
      console.debug(`[YLC] Got non ledger connectore request: ${req.origin}}`);
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
    console.error(`[YLC] ${actn}::error::${JSON.stringify(err)}`);
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
