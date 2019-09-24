// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type {
  DeviceNameType,
  ProgressStateType,
  OparationNameType,
} from '../../types/cmn';
import WebAuthnTopBlock from './WebAuthnTopBlock';
import TitleBlock from './TitleBlock';
import DeviceSelectionBlock from './DeviceSelectionBlock';
import OparationBlock from './operation/OparationBlock';

import styles from './ConnectBlock.scss';

type Props = {|
  isWebAuthn: boolean,
  progressState: ProgressStateType,
  currentOparationName: OparationNameType,
  executeAction: Function,
  deviceName: ?DeviceNameType,
|};

@observer
export default class ConnectBlock extends React.Component<Props> {
  render() {
    const {
      isWebAuthn,
      progressState,
      currentOparationName,
      executeAction,
      deviceName,
    } = this.props;

    const content = deviceName ?
      <OparationBlock
        deviceName={deviceName}
        currentOparationName={currentOparationName}
        progressState={progressState}
      /> :
      <DeviceSelectionBlock executeAction={executeAction} />;

    const showWebAuthnTop = isWebAuthn && deviceName;

    return (
      <div className={styles.component}>
        { showWebAuthnTop && <WebAuthnTopBlock />}
        <TitleBlock currentOparationName={currentOparationName} />
        {content}
      </div>
    );
  }
}
