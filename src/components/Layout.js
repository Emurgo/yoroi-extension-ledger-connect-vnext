// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import { ENV } from '../const';

import TestBlock from './manual-test/TestBlock';

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
      showAddress
    } = this.props;

    return (
      <div>
        <p>{intl.formatMessage(messages.load)}</p>
        <p>{JSON.stringify(process.env.NODE_ENV, null, 2)}</p>
        <p>V-10</p>
        {ENV.isDevelopment && (
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
