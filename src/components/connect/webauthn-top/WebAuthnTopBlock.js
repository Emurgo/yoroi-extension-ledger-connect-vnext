// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages, FormattedHTMLMessage } from 'react-intl';

import imgBackArrow from '../../../assets/img/back-arrow.svg';
import styles from './WebAuthnTopBlock.scss';

const messages = defineMessages({
  noteText: {
    id: 'webauthn.note',
    defaultMessage: '!!!Do not press the <strong>Cancel</strong> button',
  }
});

type Props = {||}

@observer
export default class WebAuthnTopBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    return (
      <div className={styles.component}>
        <div className={styles.dialogShadow}>
          <div className={styles.textBlock}>
            <img
              className={styles.arrow}
              src={imgBackArrow}
              alt="Back arrow"
            />
            <span className={styles.text}>
              {<FormattedHTMLMessage {...messages.noteText} />}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
