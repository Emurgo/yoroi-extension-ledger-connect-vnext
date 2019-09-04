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
    const { intl } = this.context;
    const {
      number,
      text,
      imagePath
    } = this.props;

    return (
      <div className={styles.component}>
        <div className={styles.topWrapper}>
          <div className={styles.number}>
            <div className={styles.numberCircle}>
              {number}
            </div>
          </div>
          <div className={styles.text}>{intl.formatMessage(text)}</div>
        </div>
        <div>
          <img className={styles.image} src={imagePath} alt="HintBlock" />
        </div>
      </div>
    );
  }
}
