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

type Props = {|
  showWebAuthnTop: boolean,
  isFirefox: boolean
|}

@observer
export default class WebAuthnTopBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const {
      showWebAuthnTop,
      isFirefox
    } = this.props;

    if (!showWebAuthnTop) {
      // Do not show this component
      return (null);
    }

    const styleComponent = isFirefox ? styles.componentFirefox : styles.componentChrome;

    return (
      <div className={styleComponent}>
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
