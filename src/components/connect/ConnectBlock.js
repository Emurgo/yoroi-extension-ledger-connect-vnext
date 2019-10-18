// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type {
  DeviceCodeType,
  ProgressStateType,
  OperationNameType,
  VerifyAddressInfoType,
} from '../../types/cmn';
import { PROGRESS_STATE } from '../../types/cmn';
import LoadingSpinner from '../widgets/LoadingSpinner';
import WebAuthnTopBlock from './webauthn-top/WebAuthnTopBlock';
import TitleBlock from './title/TitleBlock';
import DeviceSelectionBlock from './device-selection/DeviceSelectionBlock';
import OperationBlock from './operation/OperationBlock';

import styles from './ConnectBlock.scss';

type Props = {|
  isWebAuthn: boolean,
  isFirefox: boolean,
  progressState: ProgressStateType,
  currentOperationName: OperationNameType,
  executeAction: Function,
  deviceCode: DeviceCodeType,
  setDeviceCode: Function,
  verifyAddressInfo: VerifyAddressInfoType,
  wasDeviceLocked: boolean,
|};

@observer
export default class ConnectBlock extends React.Component<Props> {
  // Yoroi styled loading spinner
  loadingSpinner: ?LoadingSpinner;

  render() {
    const {
      isWebAuthn,
      isFirefox,
      progressState,
      currentOperationName,
      executeAction,
      setDeviceCode,
      deviceCode,
      verifyAddressInfo,
      wasDeviceLocked
    } = this.props;

    let content;
    let showWebAuthnTop: boolean = false;

    switch (progressState) {
      case PROGRESS_STATE.LOADING:
        content = (
          <LoadingSpinner
            ref={(component) => { this.loadingSpinner = component; }}
            showText
          />
        );
        break;
      case PROGRESS_STATE.DEVICE_TYPE_SELECTION:
        content = (
          <DeviceSelectionBlock
            executeAction={executeAction}
            knownDeviceCode={deviceCode}
            setDeviceCode={setDeviceCode}
          />
        );
        break;
      default:
        showWebAuthnTop = isWebAuthn;
        content = (
          <OperationBlock
            deviceCode={deviceCode}
            currentOperationName={currentOperationName}
            progressState={progressState}
            verifyAddressInfo={verifyAddressInfo}
            wasDeviceLocked={wasDeviceLocked}
          />
        );
    }

    return (
      <div className={styles.component}>
        <WebAuthnTopBlock
          showWebAuthnTop={showWebAuthnTop}
          isFirefox={isFirefox}
        />
        <TitleBlock currentOperationName={currentOperationName} />
        {content}
      </div>
    );
  }
}
