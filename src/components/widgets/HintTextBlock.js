// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';
import classNames from 'classnames';

import styles from './HintTextBlock.scss';

type Props = {|
  number: number,
  text: MessageDescriptor,
  selected?: boolean
|};

@observer
export default class HintTextBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };
  static defaultProps = { selected: false }

  render() {
    const { intl } = this.context;
    const {
      number,
      text,
      selected
    } = this.props;

    const styleComponent = classNames([
      styles.component,
      selected ? styles.selected : null
    ]);

    // TODO: add on hover effect
    return (
      <div className={styleComponent}>
        <div className={styles.topWrapper}>
          <div className={styles.number}>
            <div className={styles.numberCircle}>
              {number}
            </div>
          </div>
          <div className={styles.text}>{intl.formatMessage(text)}</div>
        </div>
      </div>
    );
  }
}
