import React from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';

import styles from './ConnectBlock.scss';

const messages = defineMessages({
  load: {
    id: 'loading.screen.loading',
    defaultMessage: '!!!Loading',
  }
});

type Props = {|
|};

@observer
export default class ConnectBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const WebAuthnNoteBlock = (
      <div>WebAuthn Note Block</div>
    );

    const TitleBlock = (
      <div>Operation Title Block</div>
    );
    return (
      <div className={styles.component}>
        {WebAuthnNoteBlock}
        {TitleBlock}
      </div>
    );
  }
}
