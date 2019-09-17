// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import { DEVICE_NAME } from '../../types/cmn';
import styles from './NavigationBlock.scss';

const message = defineMessages({
  titleLedgerNanoS: {
    id: 'wallet.title.ledgerNanoS',
    defaultMessage: '!!!Ledger Nano S'
  },
  titleLedgerNanoX: {
    id: 'wallet.title.ledgerNanoX',
    defaultMessage: '!!!Ledger Nano X'
  },
});

type Props = {||};

@observer
export default class NavigationBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  changeNavigation = (type: string) => {
    console.log(type);
  }

  render() {
    const { intl } = this.context;

    return (
      <div className={styles.component}>
        <div className={styles.navigator}>
          <button
            className={styles.wallet}
            type="button"
            onClick={this.changeNavigation.bind(null, DEVICE_NAME.NANO_S)}
          >
            <div className={styles.text}>
              {intl.formatMessage(message.titleLedgerNanoS)}
            </div>
          </button>
          <button
            className={styles.wallet}
            type="button"
            onClick={this.changeNavigation.bind(null, DEVICE_NAME.NANO_X)}
          >
            <div className={styles.text}>
              {intl.formatMessage(message.titleLedgerNanoX)}
            </div>
          </button>
        </div>
        <div className={styles.targets}>
          CHILD
        </div>
      </div>
    );
  }
}
