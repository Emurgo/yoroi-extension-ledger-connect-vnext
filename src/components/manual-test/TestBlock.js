// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { utils as CUtils } from '@cardano-foundation/ledgerjs-hw-app-cardano';

type Props = {|
  getVersion: Function,
  getExtendedPublicKey: Function,
  signTransaction: Function,
  deriveAddress: Function,
  showAddress: Function,
|};

@observer
export default class TestBlock extends React.Component<Props> {
  render() {
    const component = (
      <div>
        <button type="button" onClick={this.onLogVersion}>Log Version</button>
        <br />
        <br />
        <button type="button" onClick={this.onLogExtendedPublicKey}>Log Extended public key</button>
        <br />
        <br />
        <button type="button" onClick={this.onLogSignTransaction}>Log Sign Transaction</button>
        <br />
        <br />
        <button type="button" onClick={this.onLogDeriveAddress}>Log Derive Address</button>
        <br />
        <br />
        <button type="button" onClick={this.onLogShowAddress}>Log Show Address</button>
      </div>
    );

    return component;
  }

  onLogVersion = async () => {
    const resp = await this.props.getVersion(null, 'ledger-get-version-reply');
    console.debug(`onLogVersion: ${JSON.stringify(resp, null, 2)}`);
  }

  onLogExtendedPublicKey = async () => {
    const rootPathH = [
      CUtils.HARDENED + 44,
      CUtils.HARDENED + 1815,
      CUtils.HARDENED + 0
    ];
    const resp = await this.props.getExtendedPublicKey(
      null,
      'ledger-get-extended-public-key-reply',
      rootPathH
    );
    console.debug(`onLogExtendedPublicKey: ${JSON.stringify(resp, null, 2)}`);
  }

  onLogSignTransaction = async () => {
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

    const resp = await this.props.signTransaction(
      null,
      'ledger-sign-transaction-reply',
      inputs,
      outputs
    );
    console.debug(`onLogSignTransaction: ${JSON.stringify(resp, null, 2)}`);
  }

  onLogDeriveAddress = async () => {
    const resp = await this.props.deriveAddress(
      null,
      'ledger-derive-address-reply',
      CUtils.str_to_path("44'/1815'/0'/1/0")
    );
    console.debug(`onLogDeriveAddress: ${JSON.stringify(resp, null, 2)}`);
  }

  onLogShowAddress = async () => {
    const resp = await this.props.showAddress(
      null,
      'ledger-show-address-reply',
      CUtils.str_to_path("44'/1815'/1000'/1/0")
    );
    console.debug(`onLogDeriveAddress: ${JSON.stringify(resp, null, 2)}`);
  }
}
