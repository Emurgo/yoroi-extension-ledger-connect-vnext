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
  PROGRESS_STATE,
  OPARATION_NAME,
} from '../../../types/cmn';
import ConnectLedgerHintBlock from './connect/ConnectLedgerHintBlock';
import SendTxHintBlock from './send/SendTxHintBlock';
import VerifyAddressHintBlock from './verify/VerifyAddressHintBlock';

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

type State = {
  timeoutIn: number,
  timerStarted: boolean
}

@observer
export default class OparationBlock extends React.Component<Props, State> {
  static contextTypes = { intl: intlShape.isRequired };

  constructor() {
    super();
    this.state = {
      timeoutIn: 30,
      timerStarted: false
    };
  }

  startTimer = () => {
    if (!this.state.timerStarted) {
      this.setState({
        timeoutIn: 30,
        timerStarted: true
      });
      const timerId = setInterval(() => {
        this.setState((prevState) => ({
          timeoutIn: prevState.timeoutIn - 1
        }), () => {
          console.debug(`[YLC] Timeout In: ${this.state.timeoutIn}`);
          if (this.state.timeoutIn === 0) {
            clearInterval(timerId);
          }
        });
      }, 1000);
    }
  }

  render() {
    const { intl } = this.context;
    const {
      deviceName,
      currentOparationName,
      progressState,
      verifyAddressInfo
    } = this.props;

    if (this.props.progressState === PROGRESS_STATE.DEVICE_FOUND) {
      this.startTimer();
    }

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
          <div className={styles.leftBlock} />
          <div className={styles.centerBlock}>
            {intl.formatMessage(message.topInfo)}
          </div>
          <div className={styles.rightBlock}>
            {this.state.timerStarted && (this.state.timeoutIn + 's')}
          </div>
        </div>
        {OperationHintBlock}
      </div>
    );

    return component;
  }
}
