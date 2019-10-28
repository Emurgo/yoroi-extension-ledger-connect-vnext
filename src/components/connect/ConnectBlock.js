// @flow //
import React from 'react';
import { observer } from 'mobx-react';

import type {
  VerifyAddressInfoType,
} from '../../types/cmn';
import type {
  DeviceCodeType,
  ProgressStateType,
  OperationNameType,
} from '../../types/enum';
import { PROGRESS_STATE } from '../../types/enum';
import type {
  executeActionFunc,
  setDeviceCodeFunc,
} from '../../types/func';
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
  executeAction: executeActionFunc,
  deviceCode: DeviceCodeType,
  setDeviceCode: setDeviceCodeFunc,
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
            currentOperationName={currentOperationName}
            knownDeviceCode={deviceCode}
            setDeviceCode={setDeviceCode}
            executeAction={executeAction}
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
