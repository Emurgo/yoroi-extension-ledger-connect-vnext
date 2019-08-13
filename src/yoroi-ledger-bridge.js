// @flow

import 'babel-polyfill'; // this is need but no clear reasion why??
import AdaApp from '@cardano-foundation/ledgerjs-hw-app-cardano';
import type {
  BIP32Path,
  InputTypeUTxO,
  OutputTypeAddress,
  OutputTypeChange,
  GetVersionResponse
} from '@cardano-foundation/ledgerjs-hw-app-cardano';

import { listen } from '@ledgerhq/logs';
listen(log => console.log(log.type + ": " + log.message));

type MessageType = {
  action: string,
  success: boolean,
  payload: any
};

const YOROI_LEDGER_BRIDGE_TEARGET_NAME = 'YOROI-LEDGER-BRIDGE';

export default class YoroiLedgerBridge {

  transportGenerator: Function;
  
  constructor (transportGenerator: Function) {
    this.transportGenerator = transportGenerator;
    this.addEventListeners();
  }

  /**
   * @description Just to testing connectiong, result is not sent to iframe invoker
   * 
   * @returns {Promise<{major:number, minor:number, patch:number, flags:{isDebug:boolean}}>}
   */
  async getConnectedDeviceVersion(): Promise<GetVersionResponse> {
    let transport;
    try {
      transport = await this.transportGenerator();
      const adaApp = new AdaApp(transport);
      return adaApp.getVersion();
    } finally {
      transport && transport.close(); 
    }
  }

  /**
   * @description Returns an object containing the app version.
   * 
   * @param {*} replyAction
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
      console.debug(`[YOROI-LB]::getVersion::${replyAction}::args::`);
      transport = await this.transportGenerator();
      const adaApp = new AdaApp(transport);
      const res = await adaApp.getVersion();
      this.sendMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: res,
        });
    } catch (err) {
      console.error(`[YOROI-LB]::getVersion::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this.sendMessage(
        source,
        {
          action: replyAction,
          success: false,
          payload: { error: e.toString() }
        });
    } finally {
      transport && transport.close();
    }   
  }
  
  /**
   * @description Get a public key from the specified BIP 32 path.
   * 
   * @param {*} replyAction
   * @param {*} hdPath : The path indexes. Path must begin with `44'/1815'/n'`, and may be up to 10 indexes long. 
   * 
   * @return {Promise<{ publicKey:string, chainCode:string }>} The public key with chaincode for the given path.
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
      console.debug(`[YOROI-LB]::getExtendedPublicKey::${replyAction}::args::hdPath::${JSON.stringify(hdPath)}`);
      transport = await this.transportGenerator();
      const adaApp = new AdaApp(transport);
      const res = await adaApp.getExtendedPublicKey(hdPath);
      this.sendMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: res,
        });
    } catch (err) {
      console.error(`[YOROI-LB]::getExtendedPublicKey::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err)
      this.sendMessage(
        source,
        {
          action: replyAction,
          success: false,
          payload: { error: e.toString() }
        });
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
      console.debug(`[YOROI-LB]::signTransaction::${replyAction}::args::inputs::${JSON.stringify(inputs)}::outputs${JSON.stringify(outputs)}`);
      transport = await this.transportGenerator();
      const adaApp = new AdaApp(transport);
      const res = await adaApp.signTransaction(inputs, outputs);
      this.sendMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: res,
        });
    } catch (err) {
      console.error(`[YOROI-LB]::signTransaction::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this.sendMessage(
        source,
        {
          action: replyAction,
          success: false,
          payload: { error: e.toString() }
        });
    } finally {
      transport && transport.close();
    }
  }

  /**
   * @description Gets an address from the specified BIP 32 path.
   * 
   * @param {*} replyAction 
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
      console.debug(`[YOROI-LB]::deriveAddress::${replyAction}::args::hdPath::${JSON.stringify(hdPath)}`);
      transport = await this.transportGenerator();
      const adaApp = new AdaApp(transport);
      const res = await adaApp.deriveAddress(hdPath)
      this.sendMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: res,
        });
    } catch (err) {
      console.error(`[YOROI-LB]::deriveAddress::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this.sendMessage(
        source,
        {
          action: replyAction,
          success: false,
          payload: { error: e.toString() },
        });
    } finally {
      transport && transport.close();
    }
  }

  /**
   * @description Show an address on the Ledger device so the user can confirm the address not generated adversarially
   * Note: Show address under the hood is actually a deriveAddress call
   *
   * @param {*} replyAction 
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
      console.debug(`[YOROI-LB]::showAddress::${replyAction}::args::hdPath::${JSON.stringify(hdPath)}`);
      transport = await this.transportGenerator();
      const adaApp = new AdaApp(transport);
      const res = await adaApp.showAddress(hdPath);
      this.sendMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: res
        });
    } catch (err) {
      console.error(`[YOROI-LB]::showAddress::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this.sendMessage(
        source,
        {
          action: replyAction,
          success: false,
          payload: { error: e.toString() }
        });
    } finally {
      transport && transport.close();
    }
  }

  async isReady(
    source: window,
    replyAction: string
  ): Promise<void> {
    try {
      console.debug(`[YOROI-LB]::isReady::${replyAction}`);
      this.sendMessage(
        source,
        {
          action: replyAction,
          success: true,
          payload: true
        });
    } catch (err) {
      console.error(`[YOROI-LB]::isReady::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      this.sendMessage(
        source,
        {
          action: replyAction,
          success: false,
          payload: { error: err.toString() }
        });
    }
  }  

  addEventListeners(): void {
    window.addEventListener('message', async e => {
      if (e && e.data && e.data.target === YOROI_LEDGER_BRIDGE_TEARGET_NAME) {
        const { action, params } = e.data;
        const replyAction = `${action}-reply`;
        switch (action) {
          case 'is-ready':
            this.isReady(e.source, replyAction)
            break;          
          case 'ledger-get-version':
            this.getVersion(e.source, replyAction)
            break;
          case 'ledger-get-extended-public-key':
            this.getExtendedPublicKey(e.source, replyAction, params.hdPath)
            break;
          case 'ledger-sign-transaction':
            this.signTransaction(e.source, replyAction, params.inputs, params.outputs)
            break;
          case 'ledger-derive-address':
            this.deriveAddress(e.source, replyAction, params.hdPath)
            break;
          case 'ledger-show-address':
            this.showAddress(e.source, replyAction, params.hdPath)
            break;
        }
      }
    }, false)
  }

  sendMessage(source: window, msg: MessageType): void {
    if (source) {
      source.postMessage(msg, '*');
    } else {
      console.error('[YOROI-LB]::sendMessage::No Source window provided');
    }
  }  

  ledgerErrToMessage (err: any): any {
    const isU2FError = (err) => !!err && !!(err).metaData;
    const isStringError = (err) => typeof err === 'string';
    // https://developers.yubico.com/U2F/Libraries/Client_error_codes.html
    const isErrorWithId = (err) => err.hasOwnProperty('id') && err.hasOwnProperty('message');

    if (isU2FError(err)) {
      // Timeout
      if (err.metaData.code === 5) {
        return 'LEDGER_TIMEOUT'
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