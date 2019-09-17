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
  selected?: boolean,
  onClicked: Function
|};

@observer
export default class HintTextBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };
  static defaultProps = { selected: false }

  onClicked = (stepIndex: number) => {
    this.props.onClicked(stepIndex);
  }

  render() {
    const { intl } = this.context;
    const {
      number,
      text,
      selected
    } = this.props;

    const styleTopWrapper = classNames([
      styles.topWrapper,
      selected ? styles.selected : null
    ]);

    // TODO: add on hover effect
    return (
      <div className={styles.component}>
        <button
          className={styleTopWrapper}
          onClick={this.onClicked.bind(null, number)}
          type="button"
        >
          <div className={styles.number}>
            <div className={styles.numberCircle}>
              {number}
            </div>
          </div>
          <div className={styles.text}>{intl.formatMessage(text)}</div>
        </button>
      </div>
    );
  }
}
