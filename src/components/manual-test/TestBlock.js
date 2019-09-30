/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { utils as CUtils } from '@cardano-foundation/ledgerjs-hw-app-cardano';

import type {
  DeviceCodeType,
} from '../../types/cmn';
import {
  OPARATION_NAME,
  DEVICE_CODE,
} from '../../types/cmn';
import styles from './TestBlock.scss';

type Props = {|
  executeActionWithCustomRequest: Function,
  setCurrentOparationName: Function,
|};

type State = {|
  selectedDevice: DeviceCodeType
|};

@observer
export default class TestBlock extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      selectedDevice: DEVICE_CODE.NANO_S
    };
  }

  onDeviceSelectionChange = (deviceName: DeviceCodeType) => {
    if (this.state.selectedDevice !== deviceName) {
      console.debug(`Device Selection Changed to : ${deviceName}`);
      this.setState({ selectedDevice: deviceName });
    }
  };

  render() {
    return (
      <div className={styles.component}>
        <div className={styles.devArea}>Test Area for Development</div>
        <div>
          <input
            type="radio"
            name="device"
            id={DEVICE_CODE.NANO_S}
            checked={this.state.selectedDevice === DEVICE_CODE.NANO_S}
            onChange={this.onDeviceSelectionChange.bind(null, DEVICE_CODE.NANO_S)}
          />
          <label style={{ marginRight: '26px' }} htmlFor={DEVICE_CODE.NANO_S}>Nano S</label>
          <input
            type="radio"
            name="device"
            id={DEVICE_CODE.NANO_X}
            checked={this.state.selectedDevice === DEVICE_CODE.NANO_X}
            onChange={this.onDeviceSelectionChange.bind(null, DEVICE_CODE.NANO_X)}
          />
          <label htmlFor={DEVICE_CODE.NANO_X}>Nano X</label>
        </div>
        <div className={styles.btnWrap}>
          <button
            type="button"
            onClick={this.onLogExtendedPublicKey}
          >
            Log Extended public key
          </button>
        </div>
        <div className={styles.btnWrap}>
          <button
            type="button"
            onClick={this.onLogSignTransaction}
          >
            Log Sign Transaction
          </button>
        </div>
        <div className={styles.btnWrap}>
          <button
            type="button"
            onClick={this.onLogShowAddress}
          >
            Log Verify Address
          </button>
        </div>
        <div className={styles.btnWrap}>
          <button
            type="button"
            onClick={this.onLogDeriveAddress}
          >
            Log Derive Address
          </button>
        </div>
        <div className={styles.btnWrap}>
          <button
            type="button"
            onClick={this.onLogVersion}
          >
              Log Device Version
          </button>
        </div>
      </div>
    );
  }

  /**
   * Test getVersion
   */
  onLogVersion = async () => {
    const req = {
      action: OPARATION_NAME.GET_LEDGER_VERSION,
      params: null,
      source: null
    };

    this.props.setCurrentOparationName(OPARATION_NAME.GET_LEDGER_VERSION);
    const resp = await this.props.executeActionWithCustomRequest(this.state.selectedDevice, req);
    console.debug(`onLogVersion: ${JSON.stringify(resp, null, 2)}`);
  }

  /**
   * Test getExtendedPublicKey
   */
  onLogExtendedPublicKey = async () => {
    const hdPath = CUtils.str_to_path("44'/1815'/0'");
    const req = {
      action: OPARATION_NAME.GET_EXTENDED_PUBLIC_KEY,
      params: { hdPath },
      source: null
    };

    this.props.setCurrentOparationName(OPARATION_NAME.GET_EXTENDED_PUBLIC_KEY);
    const resp = await this.props.executeActionWithCustomRequest(this.state.selectedDevice, req);
    console.debug(`onLogExtendedPublicKey: ${JSON.stringify(resp, null, 2)}`);
  }

  /**
   * Test signTransaction
   */
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

    const req = {
      action: OPARATION_NAME.SIGN_TX,
      params: {
        inputs,
        outputs
      },
      source: null
    };

    this.props.setCurrentOparationName(OPARATION_NAME.SIGN_TX);
    const resp = await this.props.executeActionWithCustomRequest(this.state.selectedDevice, req);
    console.debug(`onLogSignTransaction: ${JSON.stringify(resp, null, 2)}`);
  }

  /**
   * Test showAddress
   */
  onLogShowAddress = async () => {
    const hdPath = CUtils.str_to_path("44'/1815'/1'/1/0");
    const address = 'Ae2tdPwUPEZ46CWnexxkBpEM4Y1Y2QQxz8zDE9TtFK6PjM7xsizBAPShHVV';
    const req = {
      action: OPARATION_NAME.SHOW_ADDRESS,
      params: { hdPath, address },
      source: null
    };

    this.props.setCurrentOparationName(OPARATION_NAME.SHOW_ADDRESS);
    const resp = await this.props.executeActionWithCustomRequest(this.state.selectedDevice, req);
    console.debug(`onLogDeriveAddress: ${JSON.stringify(resp, null, 2)}`);
  }

  /**
   * Test deriveAddress
   */
  onLogDeriveAddress = async () => {
    const hdPath = CUtils.str_to_path("44'/1815'/0'/0/0");
    const req = {
      action: OPARATION_NAME.DERIVE_ADDRESS,
      params: { hdPath },
      source: null
    };

    this.props.setCurrentOparationName(OPARATION_NAME.DERIVE_ADDRESS);
    const resp = await this.props.executeActionWithCustomRequest(this.state.selectedDevice, req);
    console.debug(`onLogDeriveAddress: ${JSON.stringify(resp, null, 2)}`);
  }
}
