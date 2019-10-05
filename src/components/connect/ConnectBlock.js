// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type {
  DeviceCodeType,
  ProgressStateType,
  OparationNameType,
  VerifyAddressInfoType,
} from '../../types/cmn';
import WebAuthnTopBlock from './webauthn-top/WebAuthnTopBlock';
import TitleBlock from './title/TitleBlock';
import DeviceSelectionBlock from './device-selection/DeviceSelectionBlock';
import OparationBlock from './operation/OparationBlock';

import styles from './ConnectBlock.scss';

type Props = {|
  isWebAuthn: boolean,
  isFirefox: boolean,
  progressState: ProgressStateType,
  currentOparationName: OparationNameType,
  executeAction: Function,
  deviceName: ?DeviceCodeType,
  verifyAddressInfo: VerifyAddressInfoType,
|};

@observer
export default class ConnectBlock extends React.Component<Props> {
  render() {
    const {
      isWebAuthn,
      isFirefox,
      progressState,
      currentOparationName,
      executeAction,
      deviceName,
      verifyAddressInfo
    } = this.props;

    const content = !deviceName ?
      <DeviceSelectionBlock executeAction={executeAction} /> :
      <OparationBlock
        deviceName={deviceName}
        currentOparationName={currentOparationName}
        progressState={progressState}
        verifyAddressInfo={verifyAddressInfo}
      />;

    let showWebAuthnTop: boolean = false;
    if (isWebAuthn && deviceName) {
      showWebAuthnTop = true;
    }

    return (
      <div className={styles.component}>
        <WebAuthnTopBlock
          showWebAuthnTop={showWebAuthnTop}
          isFirefox={isFirefox}
        />
        <TitleBlock currentOparationName={currentOparationName} />
        {content}
      </div>
    );
  }
}
