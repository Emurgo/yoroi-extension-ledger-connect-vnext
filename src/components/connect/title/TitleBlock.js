// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';

import type { OperationNameType } from '../../../types/cmn';
import { OPERATION_NAME } from '../../../types/cmn';

import styles from './TitleBlock.scss';

const messages = defineMessages({
  titleConnect: {
    id: 'title.connect',
    defaultMessage: '!!!Connect to ledger hardware wallet',
  },
  titleSenTx: {
    id: 'title.sendTx',
    defaultMessage: '!!!Send Transaction Using ledger',
  },
  titleVerifyAddress: {
    id: 'title.verifyAddress',
    defaultMessage: '!!!Verify address on ledger',
  },
  titleLedgerVersion: {
    id: 'title.ledgerVersion',
    defaultMessage: '!!!Fetch ledger device version',
  },
  titleDeriveAddress: {
    id: 'title.deriveAddress',
    defaultMessage: '!!!Derive Address',
  },
});

type Props = {|
  currentOperationName: OperationNameType,
|};

@observer
export default class TitleBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const { intl } = this.context;
    const { currentOperationName } = this.props;

    let title;
    switch (currentOperationName) {
      case OPERATION_NAME.GET_EXTENDED_PUBLIC_KEY:
        title = messages.titleConnect;
        break;
      case OPERATION_NAME.SIGN_TX:
        title = messages.titleSenTx;
        break;
      case OPERATION_NAME.SHOW_ADDRESS:
        title = messages.titleVerifyAddress;
        break;
      case OPERATION_NAME.GET_LEDGER_VERSION:
        title = messages.titleLedgerVersion;
        break;
      case OPERATION_NAME.DERIVE_ADDRESS:
        title = messages.titleDeriveAddress;
        break;
      default:
        return (null);
    }

    return (
      <div className={styles.component}>
        <div className={styles.title}>{intl.formatMessage(title)}</div>
      </div>
    );
  }
}
