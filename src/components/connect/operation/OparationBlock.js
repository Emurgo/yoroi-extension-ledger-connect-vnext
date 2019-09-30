// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import type {
  DeviceCodeType,
  OparationNameType,
  ProgressStateType,
  VerifyAddressInfoType,
}  from '../../../types/cmn';
import {
  OPARATION_NAME,
} from '../../../types/cmn';
import ConnectLedgerHintBlock from './ConnectLedgerHintBlock';
import SendTxHintBlock from './SendTxHintBlock';
import VerifyAddressHintBlock from './VerifyAddressHintBlock';

import styles from './OparationBlock.scss';

const message = defineMessages({
  topInfo: {
    id: 'oparation.top.ledgerDeviceInfo',
    defaultMessage: '!!!Perform the following actions on your Ledger device'
  },
});

type Props = {|
  deviceName: DeviceCodeType,
  currentOparationName: OparationNameType,
  progressState: ProgressStateType,
  verifyAddressInfo: VerifyAddressInfoType,
|};

@observer
export default class OparationBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const { intl } = this.context;
    const {
      deviceName,
      currentOparationName,
      progressState,
      verifyAddressInfo
    } = this.props;

    let OperationHintBlock;
    switch (currentOparationName) {
      case OPARATION_NAME.GET_EXTENDED_PUBLIC_KEY:
        OperationHintBlock = (
          <ConnectLedgerHintBlock
            deviceCode={deviceName}
            progressState={progressState}
          />
        );
        break;
      case OPARATION_NAME.SIGN_TX:
        OperationHintBlock = (
          <SendTxHintBlock
            deviceCode={deviceName}
            progressState={progressState}
          />
        );
        break;
      case OPARATION_NAME.SHOW_ADDRESS:
        OperationHintBlock = (
          <VerifyAddressHintBlock
            deviceCode={deviceName}
            progressState={progressState}
            verifyAddressInfo={verifyAddressInfo}
          />
        );
        break;
      default:
        // FOR NOW NO-OPERATION
        break;
    }

    const component = (
      <div className={styles.component}>
        <div className={styles.performActionText}>
          {intl.formatMessage(message.topInfo)}
        </div>
        {OperationHintBlock}
      </div>
    );

    return component;
  }
}
