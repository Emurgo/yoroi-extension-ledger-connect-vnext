// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import type {
  DeviceCodeType,
  OperationNameType,
  ProgressStateType,
  VerifyAddressInfoType,
}  from '../../../types/cmn';
import {
  OPERATION_NAME,
  PROGRESS_STATE,
} from '../../../types/cmn';
import CommonHintBlock from './common/CommonHintBlock';
import ConnectLedgerHintBlock from './connect/ConnectLedgerHintBlock';
import SendTxHintBlock from './send/SendTxHintBlock';
import VerifyAddressHintBlock from './verify/VerifyAddressHintBlock';

import styles from './OperationBlock.scss';

const message = defineMessages({
  topInfo: {
    id: 'operation.top.ledgerDeviceInfo',
    defaultMessage: '!!!Perform the following actions on your Ledger device'
  },
});

type Props = {|
  deviceCode: DeviceCodeType,
  currentOperationName: OperationNameType,
  progressState: ProgressStateType,
  verifyAddressInfo: VerifyAddressInfoType,
|};

@observer
export default class OperationBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const { intl } = this.context;
    const {
      deviceCode,
      currentOperationName,
      progressState,
      verifyAddressInfo
    } = this.props;

    let content;
    switch (progressState) {
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
              <ConnectLedgerHintBlock deviceCode={deviceCode} />
            );
            break;
          case OPERATION_NAME.SIGN_TX:
            content = (
              <SendTxHintBlock deviceCode={deviceCode} />
            );
            break;
          case OPERATION_NAME.SHOW_ADDRESS:
            content = (
              <VerifyAddressHintBlock
                deviceCode={deviceCode}
                verifyAddressInfo={verifyAddressInfo}
              />
            );
            break;
          default:
            // FOR NOW NO-OPERATION
            break;
        }
        break;
      default:
        return (null);
    }

    return (
      <div className={styles.component}>
        <div className={styles.performActionText}>
          {intl.formatMessage(message.topInfo)}
        </div>
        {content}
      </div>
    );
  }
}
