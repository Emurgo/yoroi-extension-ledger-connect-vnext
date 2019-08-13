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
      transportGenerator = () => TransportU2F.create();
    } else {
      console.info(`[YOROI-LB] Transport: webauthn`);
      const TransportWebAuthn = require('@ledgerhq/hw-transport-webauthn').default;
      transportGenerator = () => TransportWebAuthn.create();
    }
    bridge = new YoroiLedgerBridge(transportGenerator);

    // Test Events
    window.onload = function(e) {
      const buttonGetVersion = document.getElementById("getVersionButton");
      if (!buttonGetVersion) {
        return;
      }
      const buttonGetExtendedPublicKey = document.getElementById("getExtendedPublicKeyButton");
      if (!buttonGetExtendedPublicKey) {
        return;
      }

      buttonGetVersion.addEventListener('click', async () => logConnectedDeviceVersion());
      buttonGetExtendedPublicKey.addEventListener('click', async () => logGetExtendedPublicKey());
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
 * Test Ledger connection : Console Log getVersion
 */
const logConnectedDeviceVersion = async () => {
  try {
    const result = await bridge.getVersion(null, '');
    console.info('[YOROI-LB] getVersion: '
      + JSON.stringify(result, null , 2));
  } catch (error) {
    console.error(error);
    console.info('[YOROI-LB] '
      + 'Is your Ledger Nano S device connected to your system\'s USB port?');
  }
}

/**
 * Test Ledger connection : Console Log getExtendedPublicKey
 */
const logGetExtendedPublicKey = async () => {
  try {
    const result = await bridge.getExtendedPublicKey(null, '', [2147483692, 2147485463, 2147483648]);
    console.info('[YOROI-LB] getExtendedPublicKey: '
      + JSON.stringify(result, null , 2));
  } catch (error) {
    console.error(error);
    console.info('[YOROI-LB] '
      + 'Is your Ledger Nano S device connected to your system\'s USB port?');
  }
}

init();
