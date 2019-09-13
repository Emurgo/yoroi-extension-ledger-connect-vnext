// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';

import backArrowSVG from '../../assets/img/back-arrow.svg';
import styles from './WebAuthnTopBlock.scss';

const messages = defineMessages({
  noteText: {
    id: 'webauthn.note',
    defaultMessage: '!!!A CANCEL button will appear here. Do not press it.',
  }
});

@observer
export default class WebAuthnTopBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const { content } = this.props;

    return (
      <div className={styles.component}>
        <div className={styles.header}>
          <img src={backArrowSVG} className={styles.headerSVG} alt="Back arrow" />
          <span className={styles.headerText}>
            {intl.formatMessage(messages.noteText)}
          </span>
        </div>
      </div>
    );
  }
}
