// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';

const messages = defineMessages({
  text: {
    id: 'suspence.fallbackText',
    defaultMessage: '!!!Loading...',
  },
});

type Props = {||};

@observer
export default class SuspenseFallback extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const { intl } = this.context;
    return (
      <div>{intl.formatMessage(messages.text)}</div>
    );
  }
}
