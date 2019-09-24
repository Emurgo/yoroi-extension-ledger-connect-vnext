// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type {
  ProgressStateType,
  OparationNameType,
} from '../../types/cmn';
import WebAuthnTopBlock from './WebAuthnTopBlock';
import TitleBlock from './TitleBlock';
import DeviceSelectionBlock from './DeviceSelectionBlock';

import styles from './ConnectBlock.scss';

type Props = {|
  isWebAuthn: boolean,
  progressState: ProgressStateType,
  currentOparationName: OparationNameType,
  executeAction: Function,
|};

@observer
export default class ConnectBlock extends React.Component<Props> {
  render() {
    const {
      isWebAuthn,
      progressState,
      currentOparationName,
      executeAction,
    } = this.props;

    return (
      <div className={styles.component}>
        {/* { isWebAuthn && <WebAuthnTopBlock />} */}
        <TitleBlock currentOparationName={currentOparationName} />
        <DeviceSelectionBlock executeAction={executeAction} />
      </div>
    );
  }
}
