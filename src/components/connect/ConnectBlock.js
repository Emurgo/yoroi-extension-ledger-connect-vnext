// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type {
  ProgressStateType,
  OparationNameType,
} from '../../types/cmn';
import WebAuthnTopBlock from './WebAuthnTopBlock';
import TitleBlock from './TitleBlock';
import NavigationBlock from './NavigationBlock';

import styles from './ConnectBlock.scss';

type Props = {|
  isWebAuthn: boolean,
  progressState: ProgressStateType,
  currentOparationName: OparationNameType,
|};

@observer
export default class ConnectBlock extends React.Component<Props> {
  render() {
    const {
      isWebAuthn,
      progressState,
      currentOparationName,
    } = this.props;

    return (
      <div className={styles.component}>
        {/* { isWebAuthn && <WebAuthnTopBlock />} */}
        <TitleBlock currentOparationName={currentOparationName} />
        <NavigationBlock
          currentOparationName={currentOparationName}
          progressState={progressState}
        />
      </div>
    );
  }
}
