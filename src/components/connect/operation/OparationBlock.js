// @flow
import React from 'react';
import { observer } from 'mobx-react';

import {
  OPARATION_NAME,
} from '../../../types/cmn';

import type {
  DeviceNameType,
  OparationNameType,
  ProgressStateType
}  from '../../../types/cmn';
import ConnectLedgerHintBlock from './ConnectLedgerHintBlock';
import SendTxHintBlock from './SendTxHintBlock';
import VerifyAddressHintBlock from './VerifyAddressHintBlock';

import styles from './OparationBlock.scss';

type Props = {|
  deviceName: DeviceNameType,
  currentOparationName: OparationNameType,
  progressState: ProgressStateType,
|};

type State = {
  selectedStep: number
}

@observer
export default class OparationBlock extends React.Component<Props, State> {

  constructor() {
    super();
    this.state = {
      selectedStep: 1
    };
  }

  changeStep = (stepIndex: number) => {
    if (this.state.selectedStep !== stepIndex) {
      this.setState({
        selectedStep: stepIndex
      });
    }
  }

  render() {

    const {
      deviceName,
      currentOparationName,
      progressState,
    } = this.props;

    let OperationHintBlock;
    switch (currentOparationName) {
      case OPARATION_NAME.GET_EXTENDED_PUBLIC_KEY:
        OperationHintBlock = (
          <ConnectLedgerHintBlock
            deviceType={deviceName}
            progressState={progressState}
            changeStep={this.changeStep}
            selectedStep={this.state.selectedStep}
          />
        );
        break;
      case OPARATION_NAME.SIGN_TX:
        OperationHintBlock = (
          <SendTxHintBlock
            deviceType={deviceName}
            progressState={progressState}
            changeStep={this.changeStep}
            selectedStep={this.state.selectedStep}
          />
        );
        break;
      case OPARATION_NAME.SHOW_ADDRESS:
        OperationHintBlock = (
          <VerifyAddressHintBlock
            deviceType={deviceName}
            progressState={progressState}
            changeStep={this.changeStep}
            selectedStep={this.state.selectedStep}
          />
        );
        break;
      default:
        // FOR NOW NO-OPERATION
        break;
    }

    const component = (
      <div className={styles.component}>
        {OperationHintBlock}
      </div>
    );

    return component;
  }
}
