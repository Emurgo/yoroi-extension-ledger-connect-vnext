// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';

import type { OparationNameType } from '../../types/cmn';
import { OPARATION_NAME } from '../../types/cmn';

import styles from './TitleBlock.scss';

const messages = defineMessages({
  titleDefault: {
    id: 'title.default',
    defaultMessage: '!!!Yoroi Ledger Connector',
  },
  titleConnect: {
    id: 'title.connect',
    defaultMessage: '!!!Connect To Ledger Hardware Wallet',
  },
  titleSenTx: {
    id: 'title.sendTx',
    defaultMessage: '!!!Send Transaction Using Ledger Hardware Wallet',
  },
  titleVerifyAddress: {
    id: 'title.verifyAddress',
    defaultMessage: '!!!Verify Address on Ledger Hardware Wallet',
  },
});

type Props = {|
  currentOparationName: OparationNameType,
|};

@observer
export default class TitleBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const { currentOparationName } = this.props;

    let title;
    switch (currentOparationName) {
      case OPARATION_NAME.GET_EXTENDED_PUBLIC_KEY:
        title = messages.titleConnect;
        break;
      case OPARATION_NAME.SIGN_TX:
        title = messages.titleSenTx;
        break;
      case OPARATION_NAME.SHOW_ADDRESS:
        title = messages.titleVerifyAddress;
        break;
      default:
        // FOR NOW NO-OPERATION
        title = messages.titleDefault;
        break;
    }

    return (
      <div className={styles.component}>
        <div className={styles.title}>{intl.formatMessage(title)}</div>
      </div>
    );
  }
}
