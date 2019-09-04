// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';

import type { ProgressStateType } from '../../types/cmn';
import { ProgressState } from '../../types/cmn';
import NoteBlock from '../widgets/NoteBlock';
import CommonHintBlock from './CommonHintBlock';
import OperationHintBlock from './OperationHintBlock';
import styles from './ConnectBlock.scss';

const messages = defineMessages({
  load: {
    id: 'loading.screen.loading',
    defaultMessage: '!!!Loading',
  }
});

type Props = {|
  progressState: ProgressStateType,
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
    const showCommonHint = (progressState !== ProgressState.DEVICE_FOUND);
    const showOparationHint = (progressState === ProgressState.DEVICE_FOUND);

    const TitleBlock = (
      <div>Operation Title Block</div>
    );

    return (
      <div className={styles.component}>
        { isWebAuthn && <NoteBlock />}
        {TitleBlock}
        {showCommonHint && <CommonHintBlock />}
        {/* {showOparationHint && <OperationHintBlock />} */}
        {<OperationHintBlock />}
      </div>
    );
  }
}
