// @flow
import React from 'react';
import type { Node } from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import styles from './OparationBase.scss';

const message = defineMessages({
  topInfo: {
    id: 'oparation.top.ledgerDeviceInfo',
    defaultMessage: '!!!Perform the following actions on your Ledger device'
  },
});

type Props = {|
  LeftBlock: Node,
  RightBlock: Node,
|};

@observer
export default class OparationBase extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const {
      LeftBlock,
      RightBlock
    } = this.props;

    const component = (
      <div className={styles.component}>
        <div className={styles.left}>
          <div className={styles.innerBlock}>
            <div className={styles.topInfo}>
              {intl.formatMessage(message.topInfo)}
            </div>
            {LeftBlock}
          </div>
        </div>
        <div className={styles.right}>
          {RightBlock}
        </div>
      </div>
    );

    return component;
  }
}
