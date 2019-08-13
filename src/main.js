// @flow

import YoroiLedgerBridge from './yoroi-ledger-bridge';
import { version } from '../package.json';

let bridge;

const get_param = window.location.search.substr(1);

const init = async () => {
  console.info(`[YOROI-LB] Version: ${version}`);
  try {
    let transportGenerator;
    if (get_param === 'u2f') {
      console.info(`[YOROI-LB] Transport: u2f`);
      const TransportU2F = require('@ledgerhq/hw-transport-u2f').default;
      transportGenerator = () => TransportU2F;
    } else {
      console.info(`[YOROI-LB] Transport: webauthn`);
      const TransportWebAuthn = require('@ledgerhq/hw-transport-webauthn').default;
      transportGenerator = () => TransportWebAuthn;
    }
    bridge = new YoroiLedgerBridge(transportGenerator);

    // Test Events
    window.onload = function(e) {
      const buttonLog = document.getElementById("versionButton");
      if (!buttonLog) {
        return;
      }

      buttonLog.addEventListener('click', async () => logConnectedDeviceVersion());
    }
    
    if (bridge) {
      onSuccess(bridge);
    } else {
      throw new Error('Something unexpected happened');
    }
  } catch(error) {
    onError(error);
  }
}

const onSuccess = async (bridge) => {
  console.info('[YOROI-LB] initialized...');
}

const onError = (error) => {
  console.error(`[YOROI-LB] ERROR: initialization failed!!!\n${JSON.stringify(error, null, 2)}`);
}

/**
 * Test Ledger connection : Console Log Connected Device Version
 */
const logConnectedDeviceVersion = async () => {
  try {
    const result = await bridge.getConnectedDeviceVersion();
    console.info('[YOROI-LB] Connected Ledger device version: '
      + JSON.stringify(result, null , 2));
  } catch (error) {
    console.error(error);
    console.info('[YOROI-LB] '
      + 'Is your Ledger Nano S device connected to your system\'s USB port?');
  }
}

init();
