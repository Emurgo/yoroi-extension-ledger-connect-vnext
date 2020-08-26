/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
// @flow //
import React from 'react';
import { observer } from 'mobx-react';
import { cardano, CertTypes, AddressTypeNibbles } from '@cardano-foundation/ledgerjs-hw-app-cardano';

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

const MainnetIds = Object.freeze({
  protocolMagic: 764824073, // for legacy Byron-era addresses
  chainNetworkId: 1, // for Shelley-era addresses
});

type Props = {|
  setLocale: setLocaleFunc,
  setTransport: setTransportFunc,
  currentTransportId: TransportIdType,
  currentLocale: string
|};

type State = {|
  visible: string,
  /** we can't change what Ledger query we're doing or how it's done once started */
  startedQuery: boolean,
|};

@observer
export default class TestBlock extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      visible: `${styles.visible}`,
      startedQuery: false,
    };
  }

  onCompClicked = (): void => {
    this.setState({ visible: `${styles.visible}` });
  }

  onCompDoubleClicked = () => {
    this.setState({ visible: `${styles.hidden}` });
  }

  setStartedQuery = () => {
    this.setState({ startedQuery: true });
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
            const transportId = TRANSPORT_ID[key];
            return (
              <span key={transportId}>
                <input
                  key={transportId}
                  type="radio"
                  name="transport"
                  id={transportId}
                  checked={this.props.currentTransportId === transportId}
                  onChange={this.onTransportSelectionChange.bind(this, transportId)}
                />
                <label className={styles.tranportLabel} htmlFor={transportId}>{transportId}</label>
              </span>
            );
          }
          return null;
        })}
      </div>
    );

    const operationSelection = (
      <div className={styles.operationSelection}>
        <div>
          <button type="button" onClick={this.onExtendedByronPublicKey}>Extended Byron key</button>
          <button type="button" onClick={this.onExtendedShelleyPublicKey}>Extended Shelley key</button>
        </div>
        <button type="button" onClick={this.onSignTransaction}>Sign transaction</button>
        <div>
          <button type="button" onClick={this.onShowByronAddress}>Verify Byron address</button>
          <button type="button" onClick={this.onShowBasePathAddress}>Verify base path address</button>
          <button type="button" onClick={this.onShowBaseHexAddress}>Verify base hex address</button>
          <button type="button" onClick={this.onShowPointerAddress}>Verify pointer address</button>
          <button type="button" onClick={this.onShowEnterpriseAddress}>Verify enterprise address</button>
          <button type="button" onClick={this.onShowRewardAddress}>Verify reward address</button>
        </div>
        <div>
          <button type="button" onClick={this.onDeriveByronAddress}>Derive Byron address</button>
          <button type="button" onClick={this.onDeriveBasePathAddress}>Derive base path address</button>
          <button type="button" onClick={this.onDeriveBaseHexAddress}>Derive base hex address</button>
          <button type="button" onClick={this.onDerivePointerAddress}>Derive pointer address</button>
          <button type="button" onClick={this.onDeriveEnterpriseAddress}>Derive enterprise address</button>
          <button type="button" onClick={this.onDeriveRewardAddress}>Derive reward address</button>
        </div>
        <button type="button" onClick={this.onLogVersion}>Device version</button>
        <button type="button" onClick={this.onLogSerial}>Serial number</button>
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
        {this.state.startedQuery === false && (
          <div className={styles.column2}>
            {transportSelection}
            {operationSelection}
            {visibilityInfo}
          </div>
        )}
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
   * Test getSerial
   */
  onLogSerial = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.GET_SERIAL,
        null
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onLogSerial`);
  }

  /**
   * Test getExtendedPublicKey
   */
  onExtendedByronPublicKey = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const path = cardano.str_to_path("44'/1815'/0'");

      const req = this.makeRequest(
        OPERATION_NAME.GET_EXTENDED_PUBLIC_KEY,
        { path }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onExtendedByronPublicKey`);
  }
  onExtendedShelleyPublicKey = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const path = cardano.str_to_path("1852'/1815'/0'");

      const req = this.makeRequest(
        OPERATION_NAME.GET_EXTENDED_PUBLIC_KEY,
        { path }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onExtendedByronPublicKey`);
  }

  /**
   * Test signTransaction
   */
  onSignTransaction = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const inputs = [
        {
          txHashHex: 'e3a768c5b3109fa3268d875316063809a298602a272d7933c2b4443b69058d7a',
          outputIndex: 0,
          path: cardano.str_to_path("1852'/1815'/0'/0/0")
        }
      ];

      const outputs = [
        {
          amountStr: '700000',
          // Ae2tdPwUPEZCfyggUgSxD1E5UCx5f5hrXCdvQjJszxE7epyZ4ox9vRNUbHf
          addressHex: '82d818582183581c9f01f38ec3af8341f45a301b075bfd6fd0cfbaddb01c5ebe780918b9a0001adb482c56',
        },
        {
          addressTypeNibble: AddressTypeNibbles.BASE,
          amountStr: '100000',
          spendingPath: cardano.str_to_path("1852'/1815'/0'/1/0"),
          stakingBlockchainPointer: undefined,
          stakingKeyHashHex: undefined,
          stakingPath: cardano.str_to_path("1852'/1815'/0'/2/0"),
        },
        {
          addressTypeNibble: AddressTypeNibbles.BASE,
          amountStr: '100000',
          spendingPath: cardano.str_to_path("1852'/1815'/0'/1/0"),
          stakingBlockchainPointer: undefined,
          stakingKeyHashHex: '0f662d6ceb1b65733a69a1ed72f86f0bac5a16505a028897af1be345',
          stakingPath: undefined,
        }
      ];

      const req = this.makeRequest(
        OPERATION_NAME.SIGN_TX,
        {
          networkId: MainnetIds.chainNetworkId,
          protocolMagic: MainnetIds.protocolMagic,
          inputs,
          outputs,
          feeStr: '500',
          ttlStr: '20',
          certificates: [{
            type: CertTypes.staking_key_registration,
            path: cardano.str_to_path("1852'/1815'/0'/2/0"),
          },
          {
            type: CertTypes.delegation,
            path: cardano.str_to_path("1852'/1815'/0'/2/0"),
            poolKeyHashHex: 'df1750df9b2df285fcfb50f4740657a18ee3af42727d410c37b86207',
          },
          {
            type: CertTypes.staking_key_deregistration,
            path: cardano.str_to_path("1852'/1815'/0'/2/0"),
          }],
          withdrawals: [{
            path: cardano.str_to_path("1852'/1815'/0'/2/0"),
            amountStr: '1000000',
          }],
          metadataHashHex: 'deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
        }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onSignTransaction`);
  }

  /**
   * Test showAddress = Verify Address
   */
  onShowByronAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.SHOW_ADDRESS,
        {
          address: 'Ae2tdPwUPEZ46CWnexxkBpEM4Y1Y2QQxz8zDE9TtFK6PjM7xsizBAPShHVV',
          addressTypeNibble: AddressTypeNibbles.BYRON,
          networkIdOrProtocolMagic: MainnetIds.protocolMagic,
          spendingPath: cardano.str_to_path("44'/1815'/0'/0/0"),
          stakingPath: null,
          stakingKeyHashHex: null,
          stakingBlockchainPointer: null,
        }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onShowAddress`);
  }
  onShowBasePathAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.SHOW_ADDRESS,
        {
          address: 'addr1qxf84wnw7ez8s0clpchhxlrx7a8mrsx9f9n2xjfazlc62tnvz7nwqamg2fan294qzxlt89nt0ez4xzxpw4vtg7h2fggqgse4hr',
          addressTypeNibble: AddressTypeNibbles.BASE,
          networkIdOrProtocolMagic: MainnetIds.chainNetworkId,
          spendingPath: cardano.str_to_path("1852'/1815'/0'/0/0"),
          stakingPath: cardano.str_to_path("1852'/1815'/0'/2/0"),
          stakingKeyHashHex: null,
          stakingBlockchainPointer: null
        }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onDeriveAddress`);
  }
  onShowBaseHexAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.SHOW_ADDRESS,
        {
          address: 'addr1qxf84wnw7ez8s0clpchhxlrx7a8mrsx9f9n2xjfazlc62tnvz7nwqamg2fan294qzxlt89nt0ez4xzxpw4vtg7h2fggqgse4hr',
          addressTypeNibble: AddressTypeNibbles.BASE,
          networkIdOrProtocolMagic: MainnetIds.chainNetworkId,
          spendingPath: cardano.str_to_path("1852'/1815'/0'/0/0"),
          stakingPath: null,
          stakingKeyHashHex: '927aba6ef644783f1f0e2f737c66f74fb1c0c54966a3493d17f1a52e',
          stakingBlockchainPointer: null
        }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onDeriveAddress`);
  }
  onShowPointerAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.SHOW_ADDRESS,
        {
          address: 'addr1gxf84wnw7ez8s0clpchhxlrx7a8mrsx9f9n2xjfazlc62tsqqypqv2s002',
          addressTypeNibble: AddressTypeNibbles.POINTER,
          networkIdOrProtocolMagic: MainnetIds.chainNetworkId,
          spendingPath: cardano.str_to_path("1852'/1815'/0'/0/0"),
          stakingPath: null,
          stakingKeyHashHex: null,
          stakingBlockchainPointer: {
            blockIndex: 0,
            txIndex: 1,
            certificateIndex: 2,
          }
        }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onDeriveAddress`);
  }
  onShowEnterpriseAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.SHOW_ADDRESS,
        {
          address: 'addr1vxf84wnw7ez8s0clpchhxlrx7a8mrsx9f9n2xjfazlc62tsmdww5t',
          addressTypeNibble: AddressTypeNibbles.ENTERPRISE,
          networkIdOrProtocolMagic: MainnetIds.chainNetworkId,
          spendingPath: cardano.str_to_path("1852'/1815'/0'/0/0"),
          stakingPath: null,
          stakingKeyHashHex: null,
          stakingBlockchainPointer: null,
        }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onDeriveAddress`);
  }
  onShowRewardAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.SHOW_ADDRESS,
        {
          address: 'addr1u8pcjgmx7962w6hey5hhsd502araxp26kdtgagakhaqtq8sxy9w7g',
          addressTypeNibble: AddressTypeNibbles.REWARD,
          networkIdOrProtocolMagic: MainnetIds.chainNetworkId,
          spendingPath: cardano.str_to_path("1852'/1815'/0'/2/0"),
          stakingPath: null,
          stakingKeyHashHex: null,
          stakingBlockchainPointer: null,
        }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onDeriveAddress`);
  }

  /**
   * Test deriveAddress
   */
  onDeriveByronAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.DERIVE_ADDRESS,
        {
          addressTypeNibble: AddressTypeNibbles.BYRON,
          networkIdOrProtocolMagic: MainnetIds.protocolMagic,
          spendingPath: cardano.str_to_path("44'/1815'/0'/0/0"),
          stakingPath: null,
          stakingKeyHashHex: null,
          stakingBlockchainPointer: null
        }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onDeriveAddress`);
  }
  onDeriveBasePathAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.DERIVE_ADDRESS,
        {
          addressTypeNibble: AddressTypeNibbles.BASE,
          networkIdOrProtocolMagic: MainnetIds.chainNetworkId,
          spendingPath: cardano.str_to_path("1852'/1815'/0'/0/0"),
          stakingPath: cardano.str_to_path("1852'/1815'/0'/2/0"),
          stakingKeyHashHex: null,
          stakingBlockchainPointer: null
        }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onDeriveAddress`);
  }
  onDeriveBaseHexAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.DERIVE_ADDRESS,
        {
          addressTypeNibble: AddressTypeNibbles.BASE,
          networkIdOrProtocolMagic: MainnetIds.chainNetworkId,
          spendingPath: cardano.str_to_path("1852'/1815'/0'/0/0"),
          stakingPath: null,
          stakingKeyHashHex: '927aba6ef644783f1f0e2f737c66f74fb1c0c54966a3493d17f1a52e',
          stakingBlockchainPointer: null
        }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onDeriveAddress`);
  }
  onDerivePointerAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.DERIVE_ADDRESS,
        {
          addressTypeNibble: AddressTypeNibbles.POINTER,
          networkIdOrProtocolMagic: MainnetIds.chainNetworkId,
          spendingPath: cardano.str_to_path("1852'/1815'/0'/0/0"),
          stakingPath: null,
          stakingKeyHashHex: null,
          stakingBlockchainPointer: {
            blockIndex: 0,
            txIndex: 1,
            certificateIndex: 2,
          }
        }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onDeriveAddress`);
  }
  onDeriveEnterpriseAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.DERIVE_ADDRESS,
        {
          addressTypeNibble: AddressTypeNibbles.ENTERPRISE,
          networkIdOrProtocolMagic: MainnetIds.chainNetworkId,
          spendingPath: cardano.str_to_path("1852'/1815'/0'/0/0"),
          stakingKeyHashHex: null,
          stakingBlockchainPointer: null,
        }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onDeriveAddress`);
  }
  onDeriveRewardAddress = (): void => {
    if (this.state.visible === `${styles.visible}`) {
      const req = this.makeRequest(
        OPERATION_NAME.DERIVE_ADDRESS,
        {
          addressTypeNibble: AddressTypeNibbles.REWARD,
          networkIdOrProtocolMagic: MainnetIds.chainNetworkId,
          spendingPath: cardano.str_to_path("1852'/1815'/0'/2/0"),
          stakingKeyHashHex: null,
          stakingBlockchainPointer: null,
        }
      );
      window.postMessage(req);
    }
    console.debug(`[YLC] TEST:onDeriveAddress`);
  }

  /**
   * Makes Request object
   */
  makeRequest = (action: string, params: any) => {
    this.setStartedQuery();
    return {
      action,
      params,
      target: YOROI_LEDGER_CONNECT_TARGET_NAME,
    };
  }
}
