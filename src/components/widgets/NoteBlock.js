// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';

import styles from './NoteBlock.scss';

type Props = {|
  // text: MessageDescriptor,
|};

@observer
export default class NoteBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const intl = this.contextTypes;
    const { text } = this.props;

    return (
      <div className={styles.component}>
        WebAuthn Note Block
      </div>
    );
  }
}
