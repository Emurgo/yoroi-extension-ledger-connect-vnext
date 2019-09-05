// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';

import type {
  ProgressStateType,
  OparationNameType
} from '../../types/cmn';
import { PROGRESS_STATE } from '../../types/cmn';
import NoteBlock from '../widgets/NoteBlock';
import CommonHintBlock from './CommonHintBlock';
import ConnectYoroiHintBlock from './operation/ConnectYoroiHintBlock';
import SendTxHintBlock from './operation/SendTxHintBlock';
import VerifyAddressHintBlock from './operation/VerifyAddressHintBlock';
import styles from './ConnectBlock.scss';

const messages = defineMessages({
  load: {
    id: 'loading.screen.loading',
    defaultMessage: '!!!Loading',
  }
});

type Props = {|
  progressState: ProgressStateType,
  currentOparationName: OparationNameType,
  isWebAuthn: boolean,
|};

@observer
export default class ConnectBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const {
      progressState,
      isWebAuthn
    } = this.props;
    const showCommonHint = (progressState !== PROGRESS_STATE.DEVICE_FOUND);
    const showOparationHint = (progressState === PROGRESS_STATE.DEVICE_FOUND);

    const TitleBlock = (
      <div>Operation Title Block</div>
    );

    return (
      <div className={styles.component}>
        { isWebAuthn && <NoteBlock />}
        {TitleBlock}
        {showCommonHint && <CommonHintBlock />}
        {/* {showOparationHint && <OperationHintBlock />} */}
        {<ConnectYoroiHintBlock />}
        {<SendTxHintBlock />}
        {<VerifyAddressHintBlock />}
      </div>
    );
  }
}
