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
  ProgressStateType,
  OparationNameType,
} from '../types/cmn';
import {
  PROGRESS_STATE,
  OPARATION_NAME,
} from '../types/cmn';
import { YOROI_LEDGER_CONNECT_TARGET_NAME } from '../const';

export default class ConnectStore {
  @observable transportId: string;
  @observable progressState: ProgressStateType;
  @observable currentOparationName: OparationNameType;

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

  // Ledger API
  _addMessageEventListeners = (): void => {
    const processMessage = async (e) => {
      if (e && e.data && e.data.target === YOROI_LEDGER_CONNECT_TARGET_NAME) {
        const actn = e.data.action;
        const { params } = e.data;
        console.debug(`[YLC]::request: ${actn}`);

        const replyAction = `${actn}-reply`;
        switch (actn) {
          case OPARATION_NAME.TEST_READY:
            this.testReady(e.source, replyAction);
            break;
          case OPARATION_NAME.GET_LEDGER_VERSION:
            this.getVersion(e.source, replyAction);
            break;
          case OPARATION_NAME.GET_EXTENDED_PUBLIC_KEY:
            this.getExtendedPublicKey(e.source, replyAction, params.hdPath);
            break;
          case OPARATION_NAME.SIGN_TX:
            this.signTransaction(e.source, replyAction, params.inputs, params.outputs);
            break;
          case OPARATION_NAME.SHOW_ADDRESS:
            this.showAddress(e.source, replyAction, params.hdPath);
            break;
          case OPARATION_NAME.DERIVE_ADDRESS:
            this.deriveAddress(e.source, replyAction, params.hdPath);
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

  testReady = async (source: window, replyAction: string): Promise<void> => {
    try {
      console.debug(`[YOROI-LB]::testReady::${replyAction}`);
      this._replyMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: true
        }
      );
    } catch (err) {
      console.error(`[YOROI-LB]::testReady::${replyAction}::error::${JSON.stringify(err)}`);
      this._replyMessage(
        source,
        {
          action: replyAction,
          success: false,
          payload: { error: err.toString() }
        }
      );
    }
  }

  getVersion = async (
    source: window,
    replyAction: string
  ): Promise<GetVersionResponse | void> => {
    let transport;
    try {
      transport = await this._makeTransport();
      const adaApp = new AdaApp(transport);

      const res: GetVersionResponse = await adaApp.getVersion();
      this._replyMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: res,
        }
      );
      return res;
    } catch (err) {
      console.error(`[YOROI-LB]::getVersion::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this._replyMessage(
        source,
        {
          action: replyAction,
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
    replyAction: string,
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
          action: replyAction,
          success: true,
          payload: res,
        }
      );
      return res;
    } catch (err) {
      console.error(`[YOROI-LB]::getExtendedPublicKey::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this._replyMessage(
        source,
        {
          action: replyAction,
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
    replyAction: string,
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
          action: replyAction,
          success: true,
          payload: res,
        }
      );
      return res;
    } catch (err) {
      console.error(`[YOROI-LB]::signTransaction::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this._replyMessage(
        source,
        {
          action: replyAction,
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
    replyAction: string,
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
          action: replyAction,
          success: true,
          payload: res,
        }
      );
      return res;
    } catch (err) {
      console.error(`[YOROI-LB]::deriveAddress::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this._replyMessage(
        source,
        {
          action: replyAction,
          success: false,
          payload: { error: e.toString() },
        }
      );
    } finally {
      transport && transport.close();
    }
  }

  showAddress = async (
    source: window,
    replyAction: string,
    hdPath: BIP32Path
  ): Promise<void> => {
    let transport;
    try {
      transport = await this._makeTransport();
      await this._detectLedgerDevice(transport);

      const adaApp = new AdaApp(transport);

      const res = await adaApp.showAddress(hdPath);
      this._replyMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: res
        }
      );
    } catch (err) {
      console.error(`[YOROI-LB]::showAddress::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this._replyMessage(
        source,
        {
          action: replyAction,
          success: false,
          payload: { error: e.toString() }
        }
      );
    } finally {
      transport && transport.close();
    }
  }

  /**
   * Converts error code to string
   * @param {*} err
   */
  ledgerErrToMessage = (err: any): any => {
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
