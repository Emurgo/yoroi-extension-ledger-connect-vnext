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
import Connect from './nano-s/ConnectYoroiHintBlock';
import styles from './OparationBlock.scss';

type Props = {|
  deviceType: DeviceNameType,
  currentOparationName: OparationNameType,
  progressState: ProgressStateType,
|};

@observer
export default class OparationBlock extends React.Component<Props> {

  render() {

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
        <Connect deviceType="LedgerNanoS" />
      </div>
    );

    return component;
  }
}
