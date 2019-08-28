// @flow
import 'babel-polyfill'; // this is need but no clear reasion why??
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

export default class CardanoLedger {

  transportGenerator: Function;

  constructor(transportGenerator: Function) {
    this.transportGenerator = transportGenerator;
    this.addEventListeners();
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
  async getVersion(): Promise<GetVersionResponse> {
    let transport;
    try {
      // console.debug(`[YOROI-LB]::getVersion::${replyAction}::args::`);

      transport = await this.transportGenerator();
      const adaApp = new AdaApp(transport);

      return await adaApp.getVersion();
      // this.sendMessage(
      //   source,
      //   {
      //     action: replyAction,
      //     success: true,
      //     payload: res,
      //   });
      // return res;
    } catch (err) {
      // console.error(`[YOROI-LB]::getVersion::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      throw new Error(e.toString());
      // this.sendMessage(
      //   source,
      //   {
      //     action: replyAction,
      //     success: false,
      //     payload: { error: e.toString() }
      //   });
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
  async getExtendedPublicKey(hdPath: BIP32Path): Promise<GetExtendedPublicKeyResponse> {
    let transport;
    try {
      // console.debug(`[YOROI-LB]::getExtendedPublicKey::${replyAction}::args::hdPath::${JSON.stringify(hdPath)}`);

      transport = await this.transportGenerator();
      const adaApp = new AdaApp(transport);

      return await adaApp.getExtendedPublicKey(hdPath);
      // this.sendMessage(
      //   source,
      //   {
      //     action: replyAction,
      //     success: true,
      //     payload: res,
      //   });
      // return res;
    } catch (err) {
      // console.error(`[YOROI-LB]::getExtendedPublicKey::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      throw new Error(e.toString());
      // this.sendMessage(
      //   source,
      //   {
      //     action: replyAction,
      //     success: false,
      //     payload: { error: e.toString() }
      //   });
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
    inputs: Array<InputTypeUTxO>,
    outputs: Array<OutputTypeAddress | OutputTypeChange>
  ): Promise<SignTransactionResponse> {
    let transport;
    try {
      // console.debug(`[YOROI-LB]::signTransaction::${replyAction}::args::inputs::${JSON.stringify(inputs)}::outputs${JSON.stringify(outputs)}`);

      transport = await this.transportGenerator();
      const adaApp = new AdaApp(transport);

      return await adaApp.signTransaction(inputs, outputs);
      // this.sendMessage(
      //   source,
      //   {
      //     action: replyAction,
      //     success: true,
      //     payload: res,
      //   });
      // return res;
    } catch (err) {
      // console.error(`[YOROI-LB]::signTransaction::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      throw new Error(e.toString());
      // this.sendMessage(
      //   source,
      //   {
      //     action: replyAction,
      //     success: false,
      //     payload: { error: e.toString() }
      //   });
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
  ): Promise<DeriveAddressResponse> {
    let transport;
    try {
      console.debug(`[YOROI-LB]::deriveAddress::${replyAction}::args::hdPath::${JSON.stringify(hdPath)}`);
      transport = await this.transportGenerator();
      const adaApp = new AdaApp(transport);

      return await adaApp.deriveAddress(hdPath);
      // this.sendMessage(
      //   source,
      //   {
      //     action: replyAction,
      //     success: true,
      //     payload: res,
      //   });
      // return res;  
    } catch (err) {
      console.error(`[YOROI-LB]::deriveAddress::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      throw new Error(e.toString());
      // this.sendMessage(
      //   source,
      //   {
      //     action: replyAction,
      //     success: false,
      //     payload: { error: e.toString() },
      //   });
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
      await adaApp.showAddress(hdPath);
      // this.sendMessage(
      //   source,
      //   {
      //     action: replyAction,
      //     success: true,
      //     payload: res
      //   });
      // return res;        
    } catch (err) {
      console.error(`[YOROI-LB]::showAddress::${replyAction}::error::${JSON.stringify(err)}`);
      const e = this.ledgerErrToMessage(err);
      throw new Error(e.toString());
      // this.sendMessage(
      //   source,
      //   {
      //     action: replyAction,
      //     success: false,
      //     payload: { error: e.toString() }
      //   });
    } finally {
      transport && transport.close();
    }
  }

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
