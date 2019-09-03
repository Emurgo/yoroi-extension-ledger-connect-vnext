import React from 'react';
import { observer } from 'mobx-react';
import { intlShape } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';

import styles from './CommonHintBlock.scss';

type Props = {||};

@observer
export default class CommonHintBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    return (
      <div className={styles.component}>CommonHintBlock</div>
    );
  }
}
