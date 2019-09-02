// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';

import TestBlock from './manual-test/TestBlock';
import styles from './Layout.scss';

const messages = defineMessages({
  load: {
    id: 'loading.screen.loading',
    defaultMessage: '!!!Loading',
  }
});

type Props = {|
  getVersion: Function,
  getExtendedPublicKey: Function,
  signTransaction: Function,
  deriveAddress: Function,
  showAddress: Function,
  isDevelopment: boolean
|};

@observer
export default class Layout extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const {
      getVersion,
      getExtendedPublicKey,
      signTransaction,
      deriveAddress,
      showAddress,
      isDevelopment
    } = this.props;

    return (
      <div className={styles.component}>
        <p>{intl.formatMessage(messages.load)}</p>
        <p>{JSON.stringify(process.env.NODE_ENV, null, 2)}</p>
        <p>V-10</p>
        {isDevelopment && (
          <TestBlock
            getVersion={getVersion}
            getExtendedPublicKey={getExtendedPublicKey}
            signTransaction={signTransaction}
            deriveAddress={deriveAddress}
            showAddress={showAddress}
          />
        )}
      </div>
    );
  }
}
