import React from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';

import type { ProgressStateType } from '../../types';
import { ProgressState } from '../../types';
import styles from './ConnectBlock.scss';

const messages = defineMessages({
  load: {
    id: 'loading.screen.loading',
    defaultMessage: '!!!Loading',
  }
});

type Props = {|
  progressState: ProgressStateType
|};

@observer
export default class ConnectBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { progressState } = this.props;
    const showCommonHint = (progressState !== ProgressState.DEVICE_FOUND);
    const showOparationHint = (progressState === ProgressState.DEVICE_FOUND);

    const WebAuthnNoteBlock = (
      <div>WebAuthn Note Block</div>
    );
    const TitleBlock = (
      <div>Operation Title Block</div>
    );
    const CommonHint = (
      <div>Common Hint Block</div>
    );
    const OparationHint = (
      <div>Operation Hint Block</div>
    );

    return (
      <div className={styles.component}>
        {WebAuthnNoteBlock}
        {TitleBlock}
        {showCommonHint && CommonHint}
        {showOparationHint && OparationHint}
      </div>
    );
  }
}
