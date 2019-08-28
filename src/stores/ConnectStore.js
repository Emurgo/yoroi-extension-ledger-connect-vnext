// @flow
import { observable } from 'mobx';
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
import TransportWebAuthn from '@ledgerhq/hw-transport-webauthn';
import TransportU2F from '@ledgerhq/hw-transport-u2f';

import { YOROI_LEDGER_CONNECT_TARGET_NAME } from '../const';
import type { MessageType } from '../types';

export default class ConnectStore {
  transportId: string;

  constructor(rootStore) {
    this.addEventListeners();
    this.rootStore = rootStore;
  }

  addEventListeners(): void {
    const processMessage = async e => {
      if (e && e.data && e.data.target === YOROI_LEDGER_CONNECT_TARGET_NAME) {
        const { action, params } = e.data;
        console.debug(`[YLC]::request: ${action}`);

        const replyAction = `${action}-reply`;
        // const isProtocolSupported = await this.isProtocolSupported();
        // if (isProtocolSupported) {
        switch (action) {
          case 'is-ready':
            this.isReady(e.source, replyAction);
            break;
          case 'ledger-get-version':
            this.getVersion(e.source, replyAction);
            break;
          case 'ledger-get-extended-public-key':
            this.getExtendedPublicKey(e.source, replyAction, params.hdPath);
            break;
          case 'ledger-sign-transaction':
            this.signTransaction(e.source, replyAction, params.inputs, params.outputs);
            break;
          case 'ledger-derive-address':
            this.deriveAddress(e.source, replyAction, params.hdPath);
            break;
          case 'ledger-show-address':
            this.showAddress(e.source, replyAction, params.hdPath);
            break;
          default:
            // FOR NOW NO-OPERATION
            break;
        }
        // } else {
        //   this.replyMessage(
        //     e.source,
        //     {
        //       action: replyAction,
        //       success: false,
        //       payload: { error: 'Your browser does not support requested protocol, please enable WebAuthn protocol' }
        //     }
        //   );
        //   console.error('Requested protocol not supported');
        // }
      } else {
        console.error('Got untrusted request');
      }
    };

    window.addEventListener('message', processMessage, false);
  }

  replyMessage(source: window, msg: MessageType): void {
    if (source) {
      source.postMessage(msg, '*');
    } else {
      console.debug('[YOROI-LB]::replyMessage::No Source window provided');
    }
  }

  async isReady(
    source: window,
    replyAction: string
  ): Promise<void> {
    try {
      console.debug(`[YOROI-LB]::isReady::${replyAction}`);
      this.replyMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: true
        }
      );
    } catch (err) {
      console.error(`[YOROI-LB]::isReady::${replyAction}::error::${JSON.stringify(err)}`);
      this.replyMessage(
        source,
        {
          action: replyAction,
          success: false,
          payload: { error: err.toString() }
        }
      );
    }
  }

  async makeTransport(): Promise<any> {
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

  // async isProtocolSupported(): Promise<boolean> {
  //   const isWebAuthnSupported = await TransportWebAuthn.isSupported();
  //   console.log(`isWebAuthnSupported: ${isWebAuthnSupported}`);
  //   const isU2FSupported = await TransportU2F.isSupported();
  //   console.log(`isU2FSupported: ${isU2FSupported}`);
  //   if (isWebAuthnSupported || isU2FSupported) {
  //     return true;
  //   }
  //   return false;
  // }

  /**
   * @description Returns an object containing the app version.
   *
   * @param {*} replyAction : replyAction is used to determine method to call in inter browser window
   * @returns {Promise<{major:number, minor:number, patch:number, flags:{isDebug:boolean}}>}
   *
   * @example
   * const { major, minor, patch, flags } = await app.getVersion();
   */
  async getVersion(
    source: window,
    replyAction: string
  ): Promise<void> {
    let transport;
    try {
      transport = await this.makeTransport();
      const adaApp = new AdaApp(transport);

      const res: GetVersionResponse = await adaApp.getVersion();
      this.replyMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: res,
        }
      );
    } catch (err) {
      console.error(`[YOROI-LB]::getVersion::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this.replyMessage(
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
   * @description Get a public key from the specified BIP 32 path.
   *
   * @param {*} replyAction : used to determine method to call in inter browser window
   * @param {*} hdPath : The path indexes.
   * Path must begin with `44'/1815'/n'`, and may be up to 10 indexes long.
   *
   * @return {Promise<{ publicKey:string, chainCode:string }>}
   * The public key with chaincode for the given path.
   *
   * @example
   * const { publicKey, chainCode } = await ada.getExtendedPublicKey([ HARDENED + 44, HARDENED + 1815, HARDENED + 1 ]);
   *
   */
  async getExtendedPublicKey(
    source: window,
    replyAction: string,
    hdPath: BIP32Path
  ): Promise<void> {
    let transport;
    try {
      transport = await this.makeTransport();
      const adaApp = new AdaApp(transport);

      const res:GetExtendedPublicKeyResponse = await adaApp.getExtendedPublicKey(hdPath);
      this.replyMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: res,
        }
      );
    } catch (err) {
      console.error(`[YOROI-LB]::getExtendedPublicKey::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this.replyMessage(
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
   * @description SignTx on device
   * 
   * @returns { txHashHex, witnesses }
   */
  async signTransaction(
    source: window,
    replyAction: string,
    inputs: Array<InputTypeUTxO>,
    outputs: Array<OutputTypeAddress | OutputTypeChange>
  ): Promise<void> {
    let transport;
    try {
      transport = await this.makeTransport();
      const adaApp = new AdaApp(transport);

      const res:SignTransactionResponse = await adaApp.signTransaction(inputs, outputs);
      this.replyMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: res,
        }
      );
    } catch (err) {
      console.error(`[YOROI-LB]::signTransaction::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this.replyMessage(
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
   * @description Gets an address from the specified BIP 32 path.
   *
   * @param {*} replyAction : used to determine method to call in inter browser window
   * @param {*} hdPath : The path indexes. Path must begin with `44'/1815'/i'/(0 or 1)/j`, and may be up to 10 indexes long
   * 
   * @throws 5001 - The path provided does not have the first 3 indexes hardened or 4th index is not 0 or 1
   * @throws 5002 - The path provided is less than 5 indexes
   * @throws 5003 - Some of the indexes is not a number
   *
   * @example
   * const { address } = await ada.deriveAddress([ HARDENED + 44, HARDENED + 1815, HARDENED + 1, 0, 5 ]);
   * 
   * @return {Promise<{ address58:string }>} The address for the given path.
   */
  async deriveAddress(
    source: window,
    replyAction: string,
    hdPath: BIP32Path
  ): Promise<void> {
    let transport;
    try {
      transport = await this.makeTransport();
      const adaApp = new AdaApp(transport);

      const res: DeriveAddressResponse = await adaApp.deriveAddress(hdPath)
      this.replyMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: res,
        }
      );
    } catch (err) {
      console.error(`[YOROI-LB]::deriveAddress::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this.replyMessage(
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

  /**
   * @description Show an address on the Ledger device so the user can confirm the address not generated adversarially
   * Note: Show address under the hood is actually a deriveAddress call
   *
   * @param {*} replyAction : used to determine method to call in inter browser window
   * @param {*} hdPath : The path indexes. Path must begin with `44'/1815'/i'/(0 or 1)/j`, and may be up to 10 indexes long
   * 
   * @throws 5001 - The path provided does not have the first 3 indexes hardened or 4th index is not 0 or 1
   * @throws 5002 - The path provided is less than 5 indexes
   * @throws 5003 - Some of the indexes is not a number
   *
   * @example
   *  await ada.showAddress(hdPath)
   * 
   * @return {Promise<void>}
   */
  async showAddress(
    source: window,
    replyAction: string,
    hdPath: BIP32Path
  ): Promise<void> {
    let transport;
    try {
      transport = await this.makeTransport();
      const adaApp = new AdaApp(transport);

      const res = await adaApp.showAddress(hdPath);
      this.replyMessage(
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
      this.replyMessage(
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
  ledgerErrToMessage(err: any): any {
    const isU2FError = (error) => !!error && !!(error).metaData;
    const isStringError = (error) => typeof error === 'string';
    // https://developers.yubico.com/U2F/Libraries/Client_error_codes.html
    const isErrorWithId = (error) => error.hasOwnProperty('id') && error.hasOwnProperty('message');

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
