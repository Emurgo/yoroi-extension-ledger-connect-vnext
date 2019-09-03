// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';

import styles from './OperationHintBlock.scss';

type Props = {|
  number: number,
  text: MessageDescriptor,
  imagePath: string
|};

@observer
export default class OperationHintBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    return (
      <div className={styles.component}>OperationHintBlock</div>
    );
  }
}
