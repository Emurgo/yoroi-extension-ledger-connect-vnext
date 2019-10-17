/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { utils as CUtils } from '@cardano-foundation/ledgerjs-hw-app-cardano';

import type { TransportId } from '../../types/cmn';
import {
  OPERATION_NAME,
  TRANSPORT_ID
} from '../../types/cmn';
import { YOROI_LEDGER_CONNECT_TARGET_NAME } from '../../const';
import { SUPPORTED_LOCALS } from '../../i18n/translations';

import styles from './TestBlock.scss';

type Props = {|
  setTransport: Function,
  currentTransportId: TransportId,
  setLocale: Function,
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

  onCompClicked = () => {
    this.setState({ visible: `${styles.visible}` });
  }

  onCompDoubleClicked = () => {
    this.setState({ visible: `${styles.hidden}` });
  }

  onTransportSelectionChange = (transportId: TransportId) => {
    if (this.props.currentLocale !== transportId &&
      this.state.visible === `${styles.visible}`
    ) {
      console.debug(`[YLC]::Transport Selection Changed to : ${transportId}`);
      this.props.setTransport(transportId);
    }
  };

  onLangSelectionChange = (locale: string) => {
    if (this.props.currentTransportId !== locale &&
      this.state.visible === `${styles.visible}`
    ) {
      this.props.setLocale(locale);
      console.debug(`[YLC]::Language Selection Changed to : ${locale}`);
    }
  };

  render() {
    return (
      <div
        className={`${styles.component} ${this.state.visible}`}
        onClick={this.onCompClicked}
        onDoubleClick={this.onCompDoubleClicked}
      >
        <div className={styles.column1}>
          {SUPPORTED_LOCALS.map(locale => {
            return (
              <div key={locale}>
                <input
                  type="radio"
                  name="language"
                  id={locale}
                  checked={this.props.currentLocale === locale}
                  onChange={this.onLangSelectionChange.bind(null, locale)}
                />
                <label htmlFor={locale}>{locale}</label>
              </div>
            );
          })}
        </div>
        <div className={styles.column2}>
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
                      onChange={this.onTransportSelectionChange.bind(null, tranportId)}
                    />
                    <label
                      className={styles.tranportLabel}
                      htmlFor={tranportId}
                    >
                      {tranportId}
                    </label>
                  </span>
                );
              }
              return null;
            })}
          </div>
          <div className={styles.operationSelection}>
            <button
              type="button"
              onClick={this.onLogExtendedPublicKey}
            >
              Log Extended public key
            </button>
            <button
              type="button"
              onClick={this.onLogSignTransaction}
            >
              Log Sign Transaction
            </button>
            <button
              type="button"
              onClick={this.onLogShowAddress}
            >
              Log Verify Address
            </button>
            <button
              type="button"
              onClick={this.onLogDeriveAddress}
            >
              Log Derive Address
            </button>
            <button
              type="button"
              onClick={this.onLogVersion}
            >
              Log Device Version
            </button>
          </div>
          <div className={styles.visibilityInfo}>
            *Double click=invisible | single click=visible again
          </div>
        </div>
      </div>
    );
  }

  /**
   * Test getVersion
   */
  onLogVersion = async () => {
    if (this.state.visible === `${styles.visible}`) {
      const req = {
        action: OPERATION_NAME.GET_LEDGER_VERSION,
        params: null,
        target: YOROI_LEDGER_CONNECT_TARGET_NAME,
      };
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onLogVersion`);
  }

  /**
   * Test getExtendedPublicKey
   */
  onLogExtendedPublicKey = async () => {
    if (this.state.visible === `${styles.visible}`) {
      const hdPath = CUtils.str_to_path("44'/1815'/0'");
      const req = {
        action: OPERATION_NAME.GET_EXTENDED_PUBLIC_KEY,
        params: { hdPath },
        target: YOROI_LEDGER_CONNECT_TARGET_NAME,
      };
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onLogExtendedPublicKey`);
  }

  /**
   * Test signTransaction
   */
  onLogSignTransaction = async () => {
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

      const req = {
        action: OPERATION_NAME.SIGN_TX,
        params: {
          inputs,
          outputs
        },
        target: YOROI_LEDGER_CONNECT_TARGET_NAME,
      };
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onLogSignTransaction`);
  }

  /**
   * Test showAddress = Verify Address
   */
  onLogShowAddress = async () => {
    if (this.state.visible === `${styles.visible}`) {
      const hdPath = CUtils.str_to_path("44'/1815'/1'/1/0");
      const address = 'Ae2tdPwUPEZ46CWnexxkBpEM4Y1Y2QQxz8zDE9TtFK6PjM7xsizBAPShHVV';
      const req = {
        action: OPERATION_NAME.SHOW_ADDRESS,
        params: { hdPath, address },
        target: YOROI_LEDGER_CONNECT_TARGET_NAME,
      };
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onLogShowAddress`);
  }

  /**
   * Test deriveAddress
   */
  onLogDeriveAddress = async () => {
    if (this.state.visible === `${styles.visible}`) {
      const hdPath = CUtils.str_to_path("44'/1815'/0'/0/0");
      const req = {
        action: OPERATION_NAME.DERIVE_ADDRESS,
        params: { hdPath },
        target: YOROI_LEDGER_CONNECT_TARGET_NAME,
      };
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onLogDeriveAddress`);
  }
}
