// @flow
import React from 'react';
import { observer } from 'mobx-react';

// import ConnectYoroiHintBlock from './operation/ConnectYoroiHintBlock';
// import SendTxHintBlock from './operation/SendTxHintBlock';
// import VerifyAddressHintBlock from './operation/VerifyAddressHintBlock';
// import {
//   PROGRESS_STATE,
//   OPARATION_NAME,
// } from '../../types/cmn';
import type {
  DeviceNameType,
  OparationNameType,
  ProgressStateType
}  from '../../../types/cmn';
import ConnectLedgerHintBlock from './nano-s/ConnectLedgerHintBlock';
import styles from './OparationBlock.scss';

type Props = {|
  deviceType: DeviceNameType,
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
      deviceType,
      currentOparationName,
      progressState,
    } = this.props;

    // const showCommonHint = (progressState !== PROGRESS_STATE.DEVICE_FOUND);
    // const showOparationHint = (progressState === PROGRESS_STATE.DEVICE_FOUND);

    // let operationHintBlock;
    // switch (currentOparationName) {
    //   case OPARATION_NAME.GET_EXTENDED_PUBLIC_KEY:
    //     operationHintBlock = <ConnectYoroiHintBlock />;
    //     break;
    //   case OPARATION_NAME.SIGN_TX:
    //     operationHintBlock = <SendTxHintBlock />;
    //     break;
    //   case OPARATION_NAME.SHOW_ADDRESS:
    //     operationHintBlock = <VerifyAddressHintBlock />;
    //     break;
    //   default:
    //     // FOR NOW NO-OPERATION
    //     break;
    // }

    const component = (
      <div className={styles.component}>
        <ConnectLedgerHintBlock
          deviceType={deviceType}
          progressState={progressState}
          changeStep={this.changeStep}
          selectedStep={this.state.selectedStep}
        />
      </div>
    );

    return component;
  }
}
