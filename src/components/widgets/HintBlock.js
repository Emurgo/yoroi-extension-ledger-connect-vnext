// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';
import classNames from 'classnames';

import styles from './HintBlock.scss';

type Props = {|
  number: number,
  text: MessageDescriptor,
  secondaryText?: MessageDescriptor,
  imagePath: string,
|};

@observer
export default class HintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };
  static defaultProps = { secondaryText: null }

  render() {
    const { intl } = this.context;
    const {
      number,
      text,
      secondaryText,
      imagePath,
    } = this.props;

    return (
      <div className={styles.component}>
        <div className={styles.textBlock}>
          <div className={styles.numberCircle}>
            <div className={styles.number}>
              {number}
            </div>
          </div>
          <div className={styles.text}>
            {intl.formatMessage(text)}
          </div>
          {secondaryText && (
            <div className={styles.secondaryText}>
              {intl.formatMessage(secondaryText)}
            </div>
          )}
        </div>
        <div className={styles.imageBlock}>
          <img
            className={styles.image}
            src={imagePath}
            alt="HintImage"
          />
        </div>
      </div>
    );
  }
}
