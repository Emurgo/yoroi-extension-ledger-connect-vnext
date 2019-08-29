// @flow
import React, { Component, Suspense, lazy } from 'react';
import { observer, inject } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import { ENV } from '../utils';

// https://reactjs.org/docs/code-splitting.html#reactlazy
const TestBlock = lazy(() => import('../components/manual-test/TestBlock'));

const messages = defineMessages({
  load: {
    id: 'loading.screen.loading',
    defaultMessage: '!!!Loading',
  }
});

@observer
export default class Layout extends Component<void> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    return (
      <div>
        <p>{intl.formatMessage(messages.load)}</p>
        <p>{JSON.stringify(process.env.NODE_ENV, null, 2)}</p>
        <p>V-9</p>
        {ENV.isDevelopment && (
          <Suspense fallback={<div>Loading...</div>}>
            <TestBlock />
          </Suspense>
        )}
      </div>
    );
  }
}
