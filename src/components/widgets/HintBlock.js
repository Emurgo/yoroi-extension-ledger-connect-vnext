// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';

import styles from './HintBlock.scss';

type Props = {|
  number: number,
  text: MessageDescriptor,
  imagePath: string
|};

@observer
export default class HintBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const intl = this.contextTypes;
    const {
      number,
      text,
      imagePath
    } = this.props;

    return (
      <div className={styles.component}>
        <div>
          <span>{number}</span>
          <span>{intl.formatMessage(text)}</span>
        </div>
        <div>
          <img src={imagePath} alt="HintBlock" />
        </div>
      </div>
    );
  }
}
