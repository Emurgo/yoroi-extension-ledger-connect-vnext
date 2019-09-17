// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import backArrowSVG from '../../assets/img/back-arrow.svg';
import styles from './WebAuthnTopBlock.scss';

const messages = defineMessages({
  noteText: {
    id: 'webauthn.note',
    defaultMessage: '!!!A CANCEL button will appear here. Do not press it.',
  }
});

type Props = {||}

@observer
export default class WebAuthnTopBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;

    return (
      <div className={styles.component}>
        <div className={styles.dialogShadow}>
          <div className={styles.textBlock}>
            {/* TODO: Use correct arrow asset */}
            <img
              className={styles.arrow}
              src={backArrowSVG}
              alt="Back arrow"
            />
            <span className={styles.text}>
              {intl.formatMessage(messages.noteText)}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
