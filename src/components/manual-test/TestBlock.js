/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { utils as CUtils } from '@cardano-foundation/ledgerjs-hw-app-cardano';

import type { TransportIdType } from '../../types/enum';
import {
  OPERATION_NAME,
  TRANSPORT_ID,
} from '../../types/enum';
import type {
  setLocaleFunc,
  setTransportFunc,
} from '../../types/func';
import { YOROI_LEDGER_CONNECT_TARGET_NAME } from '../../const';
import { SUPPORTED_LOCALS } from '../../i18n/translations';

import styles from './TestBlock.scss';

type Props = {|
  setLocale: setLocaleFunc,
  setTransport: setTransportFunc,
  currentTransportId: TransportIdType,
  currentLocale: string
|};

type State = {|
  visible: string,
|};

@observer
export default class TestBlock extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      visible: `${styles.visible}`,
    };
  }

  onCompClicked = (): void => {
    this.setState({ visible: `${styles.visible}` });
  }

  onCompDoubleClicked = () => {
    this.setState({ visible: `${styles.hidden}` });
  }

  onLangSelectionChange = (locale: string): void => {
    if (this.props.currentTransportId !== locale &&
      this.state.visible === `${styles.visible}`
    ) {
      this.props.setLocale(locale);
      console.debug(`[YLC] Language Selection Changed to : ${locale}`);
    }
  };

  onTransportSelectionChange = (transportId: TransportIdType): void => {
    if (this.props.currentLocale !== transportId &&
      this.state.visible === `${styles.visible}`
    ) {
      this.props.setTransport(transportId);
      console.debug(`[YLC] Transport Selection Changed to : ${transportId}`);
    }
  };

  render() {
    const supportedLocals = (
      SUPPORTED_LOCALS.map(locale => {
        return (
          <div key={locale}>
            <input
              type="radio"
              name="language"
              id={locale}
              checked={this.props.currentLocale === locale}
              onChange={this.onLangSelectionChange.bind(this, locale)}
            />
            <label htmlFor={locale}>{locale}</label>
          </div>
        );
      })
    );

    const transportSelection = (
      <div className={styles.transportSelection}>
        {Object.keys(TRANSPORT_ID).map(key => {
          if (Object.prototype.hasOwnProperty.call(TRANSPORT_ID, key)) {
            const tranportId = TRANSPORT_ID[key];
            return (
              <span key={tranportId}>
                <input
                  key={tranportId}
                  type="radio"
                  name="transport"
                  id={tranportId}
                  checked={this.props.currentTransportId === tranportId}
                  onChange={this.onTransportSelectionChange.bind(this, tranportId)}
                />
                <label className={styles.tranportLabel} htmlFor={tranportId}>{tranportId}</label>
              </span>
            );
          }
          return null;
        })}
      </div>
    );

    const operationSelection = (
      <div className={styles.operationSelection}>
        <button type="button" onClick={this.onExtendedPublicKey}>Extended public key</button>
        <button type="button" onClick={this.onSignTransaction}>Sign Transaction</button>
        <button type="button" onClick={this.onShowAddress}>Verify Address</button>
        <button type="button" onClick={this.onDeriveAddress}>Derive Address</button>
        <button type="button" onClick={this.onLogVersion}>Device Version</button>
      </div>
    );

    const visibilityInfo = (
      <div className={styles.visibilityInfo}>
        *Double click=invisible | single click=visible again
      </div>
    );

    return (
      <div
        className={`${styles.component} ${this.state.visible}`}
        onClick={this.onCompClicked}
        onDoubleClick={this.onCompDoubleClicked}
      >
        <div className={styles.column1}>
          {supportedLocals}
        </div>
        <div className={styles.column2}>
          {transportSelection}
          {operationSelection}
          {visibilityInfo}
        </div>
      </div>
    );
  }

  /**
   * Test getVersion
   */
  onLogVersion = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.GET_LEDGER_VERSION,
        null
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onLogVersion`);
  }

  /**
   * Test getExtendedPublicKey
   */
  onExtendedPublicKey = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const hdPath = CUtils.str_to_path("44'/1815'/0'");

      const req = this.makeRequest(
        OPERATION_NAME.GET_EXTENDED_PUBLIC_KEY,
        { hdPath }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onExtendedPublicKey`);
  }

  /**
   * Test signTransaction
   */
  onSignTransaction = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const inputs = [
        {
          txDataHex:
            '839f8200d8185824825820918c11e1c041a0cb04baea651b9fb1bdef7ee5295f' +
            '032307e2e57d109de118b8008200d81858248258208f34e4f719effe82c28c8f' +
            'f45e426233651fc03686130cb7e1d4bc6de20e689c01ff9f8282d81858218358' +
            '1cb6f4b193e083530aca83ff03de4a60f4e7a6732b68b4fa6972f42c11a0001a' +
            '907ab5c71a000f42408282d818584283581cb5bacd405a2dcedce19899f8647a' +
            '8c4f45d84c06fb532c63f9479a40a101581e581c6b8487e9d22850b7539db255' +
            'e27dd48dc0a50c7994d678696be64f21001ac5000d871a03dc396fffa0',
          outputIndex: 0,
          path: CUtils.str_to_path("44'/1815'/0'/0/0")
        }
      ];

      const outputs = [
        {
          amountStr: '700000',
          address58:
            'DdzFFzCqrhsoarXqLakMBEiURCGPCUL7qRvPf2oGknKN2nNix5b9SQKj2YckgXZK' +
            '6q1Ym7BNLxgEX3RQFjS2C41xt54yJHeE1hhMUfSG'
        },
        {
          amountStr: '100000',
          path: CUtils.str_to_path("44'/1815'/0'/1/0")
        }
      ];

      const req = this.makeRequest(
        OPERATION_NAME.SIGN_TX,
        { inputs, outputs }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onSignTransaction`);
  }

  /**
   * Test showAddress = Verify Address
   */
  onShowAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const hdPath = CUtils.str_to_path("44'/1815'/1'/1/0");
      const address = 'Ae2tdPwUPEZ46CWnexxkBpEM4Y1Y2QQxz8zDE9TtFK6PjM7xsizBAPShHVV';

      const req = this.makeRequest(
        OPERATION_NAME.SHOW_ADDRESS,
        { hdPath, address }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onShowAddress`);
  }

  /**
   * Test deriveAddress
   */
  onDeriveAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const hdPath = CUtils.str_to_path("44'/1815'/0'/0/0");

      const req = this.makeRequest(
        OPERATION_NAME.DERIVE_ADDRESS,
        { hdPath }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onDeriveAddress`);
  }

  /**
   * Makes Request object
   */
  makeRequest = (action: string, params: any) => {
    return {
      action,
      params,
      target: YOROI_LEDGER_CONNECT_TARGET_NAME,
    };
  }
}
