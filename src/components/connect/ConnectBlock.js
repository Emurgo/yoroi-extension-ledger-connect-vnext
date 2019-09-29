// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type {
  DeviceNameType,
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
  progressState: ProgressStateType,
  currentOparationName: OparationNameType,
  executeAction: Function,
  deviceName: ?DeviceNameType,
  verifyAddressInfo: VerifyAddressInfoType,
|};

@observer
export default class ConnectBlock extends React.Component<Props> {
  render() {
    const {
      isWebAuthn,
      progressState,
      currentOparationName,
      executeAction,
      deviceName,
      verifyAddressInfo
    } = this.props;

    const content = deviceName ?
      <OparationBlock
        deviceName={deviceName}
        currentOparationName={currentOparationName}
        progressState={progressState}
        verifyAddressInfo={verifyAddressInfo}
      /> :
      <DeviceSelectionBlock executeAction={executeAction} />;

    const showWebAuthnTop = isWebAuthn && deviceName;

    return (
      <div className={styles.component}>
        { showWebAuthnTop && <WebAuthnTopBlock />}
        <TitleBlock currentOparationName={currentOparationName} />
        {content}
      </div>
    );
  }
}
