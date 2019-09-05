// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';

import ExclamationMark from '../../assets/img/exclamation-mark-green.svg';
import styles from './NoteBlock.scss';

const messages = defineMessages({
  noteText: {
    id: 'note.text',
    defaultMessage: '!!!Note:',
  }
});

type Props = {|
  content: MessageDescriptor,
|};

@observer
export default class NoteBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const { content } = this.props;

    return (
      <div className={styles.component}>
        <div className={styles.header}>
          <ExclamationMark />
          <span>{intl.formatMessage(messages.noteText)}</span>
        </div>
        <div>{intl.formatMessage(content)}</div>
      </div>
    );
  }
}
