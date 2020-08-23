// @flow //
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import type {
  SignTransactionRequest,
  VerifyAddressInfoType,
  DeriveAddressRequest,
}  from '../../../types/cmn';
import type {
  DeviceCodeType,
  OperationNameType,
  ProgressStateType,
}  from '../../../types/enum';
import {
  OPERATION_NAME,
  PROGRESS_STATE,
} from '../../../types/enum';
import LoadingSpinner from '../../widgets/LoadingSpinner';
import CommonHintBlock from './common/CommonHintBlock';
import ConnectLedgerHintBlock from './connect/ConnectLedgerHintBlock';
import SendTxHintBlock from './send/SendTxHintBlock';
import VerifyAddressHintBlock from './verify/VerifyAddressHintBlock';
import DeriveAddressHintBlock from './derive/DeriveAddressHintBlock';

import styles from './OperationBlock.scss';

const message = defineMessages({
  topInfo: {
    id: 'operation.top.ledgerDeviceInfo',
    defaultMessage: '!!!Perform the following actions on your Ledger'
  },
});

type Props = {|
  deviceCode: DeviceCodeType,
  currentOperationName: OperationNameType,
  progressState: ProgressStateType,
  signTxInfo: SignTransactionRequest,
  verifyAddressInfo: VerifyAddressInfoType,
  deriveAddressInfo: DeriveAddressRequest,
  wasDeviceLocked: boolean,
  showPerformActionText?: boolean,
|};

@observer
export default class OperationBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };
  static defaultProps = { showPerformActionText: false }
  // Yoroi styled loading spinner
  loadingSpinner: ?LoadingSpinner;

  render() {
    const { intl } = this.context;
    const {
      deviceCode,
      currentOperationName,
      progressState,
      signTxInfo,
      verifyAddressInfo,
      deriveAddressInfo,
      wasDeviceLocked,
      showPerformActionText,
    } = this.props;

    let content;
    switch (progressState) {
      case PROGRESS_STATE.DEVICE_TYPE_SELECTED:
        content = (
          <LoadingSpinner ref={(component) => { this.loadingSpinner = component; }} />
        );
        break;
      case PROGRESS_STATE.DETECTING_DEVICE:
        content = (
          <CommonHintBlock
            deviceCode={deviceCode}
            progressState={progressState}
          />
        );
        break;
      case PROGRESS_STATE.DEVICE_FOUND:
        // Select hint by operation
        switch (currentOperationName) {
          case OPERATION_NAME.GET_EXTENDED_PUBLIC_KEY:
            content = (
              <ConnectLedgerHintBlock
                deviceCode={deviceCode}
                wasDeviceLocked={wasDeviceLocked}
              />
            );
            break;
          case OPERATION_NAME.SIGN_TX:
            content = (
              <SendTxHintBlock
                deviceCode={deviceCode}
                signTxInfo={signTxInfo}
                wasDeviceLocked={wasDeviceLocked}
              />
            );
            break;
          case OPERATION_NAME.SHOW_ADDRESS:
            content = (
              <VerifyAddressHintBlock
                deviceCode={deviceCode}
                verifyAddressInfo={verifyAddressInfo}
                wasDeviceLocked={wasDeviceLocked}
              />
            );
            break;
          case OPERATION_NAME.DERIVE_ADDRESS:
            content = (
              <DeriveAddressHintBlock
                deviceCode={deviceCode}
                deriveAddressInfo={deriveAddressInfo}
                wasDeviceLocked={wasDeviceLocked}
              />
            );
            break;
          default:
            console.error(`[YLC] Unexpected operation: ${currentOperationName}`);
            return (null);
        }
        break;
      default:
        console.error(`[YLC] Unexpected progress state: ${progressState}`);
        return (null);
    }

    // By default performActionText block is hidden
    let performActionText;
    if (showPerformActionText) {
      performActionText = (
        <div className={styles.performActionText}>
          {intl.formatMessage(message.topInfo)}
        </div>
      );
    }

    return (
      <div className={styles.component}>
        {performActionText}
        {content}
      </div>
    );
  }
}
