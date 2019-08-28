// @flow
import { observable } from 'mobx';

import { YOROI_LEDGER_CONNECT_TARGET_NAME } from '../const';
import type { MessageType } from '../types';

export default class ConnectStore {
  @observable test: string;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.addEventListeners();
  }

  addEventListeners(): void {
    const processRequest = e => {
      if (e && e.data && e.data.target === YOROI_LEDGER_CONNECT_TARGET_NAME) {
        // console.log(`Something shows up: ${JSON.stringify(e, null, 2)}`);
        const { action, params } = e.data;
        const replyAction = `${action}-reply`;
        switch (action) {
          case 'is-ready':
            this.isReady(e.source, replyAction);
            break;          
          case 'ledger-get-version':
            // this.getVersion(e.source, replyAction);
            break;
          case 'ledger-get-extended-public-key':
            // this.getExtendedPublicKey(e.source, replyAction, params.hdPath);
            break;
          case 'ledger-sign-transaction':
            // this.signTransaction(e.source, replyAction, params.inputs, params.outputs);
            break;
          case 'ledger-derive-address':
            // this.deriveAddress(e.source, replyAction, params.hdPath);
            break;
          case 'ledger-show-address':
            // this.showAddress(e.source, replyAction, params.hdPath);
            break;
          default:
            // FOR NOW NO-OPERATION
            break;
        }
      }
    };

    window.addEventListener('message', processRequest, false);
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
        }
      );
    } catch (err) {
      console.error(`[YOROI-LB]::isReady::${replyAction}::error::${JSON.stringify(err)}`);
      this.sendMessage(
        source,
        {
          action: replyAction,
          success: false,
          payload: { error: err.toString() }
        }
      );
    }
  }

  sendMessage(source: window, msg: MessageType): void {
    if (source) {
      source.postMessage(msg, '*');
    } else {
      console.debug('[YOROI-LB]::sendMessage::No Source window provided');
    }
  }
}
