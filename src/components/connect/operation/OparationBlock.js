// @flow
import React from 'react';
import { observer } from 'mobx-react';

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

    const component = (
      <div className={styles.component}>
        <Connect deviceType="LedgerNanoS" />
      </div>
    );

    return component;
  }
}
