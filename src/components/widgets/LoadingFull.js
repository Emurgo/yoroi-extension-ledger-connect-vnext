// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';

import imgLoading from '../../assets/img/loading-full.gif';
import styles from './LoadingFull.scss';

const messages = defineMessages({
  text: {
    id: 'suspence.fallbackText',
    defaultMessage: '!!!Loading...',
  },
});

type Props = {||};

@observer
export default class LoadingFull extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const { intl } = this.context;
    return (
      <div className={styles.component}>
        <div className={styles.wrapper}>
          <img
            className={styles.loadingImage}
            src={imgLoading}
            alt="Loading"
          />
          <div className={styles.text}>
            {intl.formatMessage(messages.text)}
          </div>
        </div>
      </div>
    );
  }
}
