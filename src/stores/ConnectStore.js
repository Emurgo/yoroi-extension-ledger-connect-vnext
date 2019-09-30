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

export default class ConnectStore {
  @observable transportId: string;
  @observable progressState: ProgressStateType;
  @observable currentOparationName: OparationNameType;
  @observable verifyAddressInfo: VerifyAddressInfoType;
  @observable deviceName: DeviceCodeType
  userInteractableRequest: RequestType;

  constructor(transportId: string) {
    this._addMessageEventListeners();

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

  // Ledger API
  _addMessageEventListeners = (): void => {
    const processMessage = async (e) => {
      if (e && e.data && e.data.target === YOROI_LEDGER_CONNECT_TARGET_NAME) {
        const { source } = e;
        const { params } = e.data;
        const actn = e.data.action;

        this._closeOnSorceClosed(source);

        console.debug(`[YLC]::request: ${actn}`);

        switch (actn) {
          case OPARATION_NAME.TEST_READY:
            this.testReady(source, actn);
            break;
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
        console.debug(`Got non ledger connectore request: ${e.origin}}`);
      }
    };

    window.addEventListener('message', processMessage, false);
  }

  _replyMessage = (source: window, msg: MessageType): void => {
    if (source) {
      msg.action = `${msg.action}-reply`;
      source.postMessage(msg, '*');
    } else {
      console.debug('[YOROI-LB]::_replyMessage::No Source window provided');
    }
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

  testReady = async (
    source: window,
    actn: string
  ): Promise<void> => {
    try {
      console.debug(`[YOROI-LB]::testReady::${actn}`);
      this._replyMessage(
        source,
        {
          action: actn,
          success: true,
          payload: true
        }
      );
    } catch (err) {
      console.error(`[YOROI-LB]::testReady::${actn}::error::${JSON.stringify(err)}`);
      this._replyMessage(
        source,
        {
          action: actn,
          success: false,
          payload: { error: err.toString() }
        }
      );
    }
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
    const source = this.userInteractableRequest.source;
    const { params } = this.userInteractableRequest;

    switch (actn) {
      case OPARATION_NAME.GET_LEDGER_VERSION:
        this.getVersion(source, actn);
        break;
      case OPARATION_NAME.GET_EXTENDED_PUBLIC_KEY:
        this.getExtendedPublicKey(source, actn, params.hdPath);
        break;
      case OPARATION_NAME.SIGN_TX:
        this.signTransaction(source, actn, params.inputs, params.outputs);
        break;
      case OPARATION_NAME.SHOW_ADDRESS:
        this.showAddress(source, actn, params.hdPath, params.address);
        break;
      case OPARATION_NAME.DERIVE_ADDRESS:
        this.deriveAddress(source, actn, params.hdPath);
        break;
      default:
        // FOR NOW NO-OPERATION
        break;
    }
  }

  getVersion = async (
    source: window,
    actn: OparationNameType
  ): Promise<GetVersionResponse | void> => {
    let transport;
    try {

      transport = await this._makeTransport();
      const adaApp = new AdaApp(transport);

      const res: GetVersionResponse = await adaApp.getVersion();
      this._replyMessage(
        source,
        {
          action: actn,
          success: true,
          payload: res,
        }
      );
      return res;
    } catch (err) {
      console.error(`[YOROI-LB]::getVersion::${actn}::error::${JSON.stringify(err)}`);
      const e = this._ledgerErrToMessage(err);
      this._replyMessage(
        source,
        {
          action: actn,
          success: false,
          payload: { error: e.toString() }
        }
      );
    } finally {
      transport && transport.close();
    }
  }

  getExtendedPublicKey = async (
    source: window,
    actn: OparationNameType,
    hdPath: BIP32Path
  ): Promise<GetExtendedPublicKeyResponse | void> => {
    let transport;
    try {

      transport = await this._makeTransport();
      const verResp = await this._detectLedgerDevice(transport);

      const adaApp = new AdaApp(transport);

      const res: GetExtendedPublicKeyResponse = await adaApp.getExtendedPublicKey(hdPath);
      this._replyMessage(
        source,
        {
          action: actn,
          success: true,
          payload: res,
        }
      );
      return res;
    } catch (err) {
      console.error(`[YOROI-LB]::getExtendedPublicKey::${actn}::error::${JSON.stringify(err)}`);
      const e = this._ledgerErrToMessage(err);
      this._replyMessage(
        source,
        {
          action: actn,
          success: false,
          payload: { error: e.toString() }
        }
      );
    } finally {
      transport && transport.close();
    }
  }

  signTransaction = async (
    source: window,
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
      this._replyMessage(
        source,
        {
          action: actn,
          success: true,
          payload: res,
        }
      );
      return res;
    } catch (err) {
      console.error(`[YOROI-LB]::signTransaction::${actn}::error::${JSON.stringify(err)}`);
      const e = this._ledgerErrToMessage(err);
      this._replyMessage(
        source,
        {
          action: actn,
          success: false,
          payload: { error: e.toString() }
        }
      );
    } finally {
      transport && transport.close();
    }
  }

  showAddress = async (
    source: window,
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
      this._replyMessage(
        source,
        {
          action: actn,
          success: true,
          payload: res
        }
      );
    } catch (err) {
      console.error(`[YOROI-LB]::showAddress::${actn}::error::${JSON.stringify(err)}`);
      const e = this._ledgerErrToMessage(err);
      this._replyMessage(
        source,
        {
          action: actn,
          success: false,
          payload: { error: e.toString() }
        }
      );
    } finally {
      transport && transport.close();
    }
  }

  deriveAddress = async (
    source: window,
    actn: OparationNameType,
    hdPath: BIP32Path
  ): Promise<DeriveAddressResponse | void> => {
    let transport;
    try {

      transport = await this._makeTransport();
      await this._detectLedgerDevice(transport);

      const adaApp = new AdaApp(transport);

      const res: DeriveAddressResponse = await adaApp.deriveAddress(hdPath);
      this._replyMessage(
        source,
        {
          action: actn,
          success: true,
          payload: res,
        }
      );
      return res;
    } catch (err) {
      console.error(`[YOROI-LB]::deriveAddress::${actn}::error::${JSON.stringify(err)}`);
      const e = this._ledgerErrToMessage(err);
      this._replyMessage(
        source,
        {
          action: actn,
          success: false,
          payload: { error: e.toString() },
        }
      );
    } finally {
      transport && transport.close();
    }
  }

  _closeOnSorceClosed = (source: window) => {
    setInterval(() => {
      if (source.closed) {
        window.close();
      }
    }, 1000);
  }

  /**
   * Converts error code to string
   * @param {*} err
   */
  _ledgerErrToMessage = (err: any): any => {
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
  }
}
