// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { defineMessages } from 'react-intl';

import type {
  ProgressStateType,
  OparationNameType,
} from '../../types/cmn';
import {
  PROGRESS_STATE,
  OPARATION_NAME,
} from '../../types/cmn';
import WebAuthnTopBlock from './WebAuthnTopBlock';
import TitleBlock from './TitleBlock';
import CommonHintBlock from './CommonHintBlock';
import ConnectYoroiHintBlock from './operation/ConnectYoroiHintBlock';
import SendTxHintBlock from './operation/SendTxHintBlock';
import VerifyAddressHintBlock from './operation/VerifyAddressHintBlock';

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

    const showCommonHint = (progressState !== PROGRESS_STATE.DEVICE_FOUND);
    const showOparationHint = (progressState === PROGRESS_STATE.DEVICE_FOUND);

    let operationHintBlock;
    switch (currentOparationName) {
      case OPARATION_NAME.GET_EXTENDED_PUBLIC_KEY:
        operationHintBlock = <ConnectYoroiHintBlock />;
        break;
      case OPARATION_NAME.SIGN_TX:
        operationHintBlock = <SendTxHintBlock />;
        break;
      case OPARATION_NAME.SHOW_ADDRESS:
        operationHintBlock = <VerifyAddressHintBlock />;
        break;
      default:
        // FOR NOW NO-OPERATION
        break;
    }

    return (
      <div className={styles.component}>
        { isWebAuthn && <WebAuthnTopBlock />}
        {<TitleBlock currentOparationName={currentOparationName} />}
        {showCommonHint && <CommonHintBlock />}
        {showOparationHint && operationHintBlock}
      </div>
    );
  }
}
