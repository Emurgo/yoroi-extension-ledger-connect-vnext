// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import HintTextBlock from '../../../widgets/HintTextBlock';
import hintSendTx1GIF from '../../../../assets/img/hint-send-tx-1.gif';
import hintSendTx2GIF from '../../../../assets/img/hint-send-tx-2.gif';
import hintSendTx3GIF from '../../../../assets/img/hint-send-tx-3.gif';
import hintSendTx4GIF from '../../../../assets/img/hint-send-tx-4.gif';
import hintSendTx5GIF from '../../../../assets/img/hint-send-tx-5.gif';
import styles from './SendTxHintBlock.scss';

const message = defineMessages({
  startNewTx: {
    id: 'hint.sendTx.startNewTx',
    defaultMessage: '!!!Press RIGHT.'
  },
  confirmValue: {
    id: 'hint.sendTx.confirmValue',
    defaultMessage: '!!!Press BOTH.'
  },
  confirmAddress: {
    id: 'hint.sendTx.confirmAddress',
    defaultMessage: '!!!Press BOTH.'
  },
  confirmFee: {
    id: 'hint.sendTx.confirmFee',
    defaultMessage: '!!!Press BOTH.'
  },
  confirmTx: {
    id: 'hint.sendTx.confirmTx',
    defaultMessage: '!!!Press RIGHT.'
  },
});

type Props = {||};
@observer
export default class SendTxHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const component = (
      <div className={styles.component}>
        <HintTextBlock
          number={1}
          text={message.startNewTx}
          imagePath={hintSendTx1GIF}
        />
        <div className={styles.gap} />
        <HintTextBlock
          number={2}
          text={message.confirmValue}
          imagePath={hintSendTx2GIF}
        />
        <div className={styles.gap} />
        <HintTextBlock
          number={3}
          text={message.confirmAddress}
          imagePath={hintSendTx3GIF}
        />
        <div className={styles.gap} />
        <HintTextBlock
          number={4}
          text={message.confirmFee}
          imagePath={hintSendTx4GIF}
        />
        <div className={styles.gap} />
        <HintTextBlock
          number={5}
          text={message.confirmTx}
          imagePath={hintSendTx5GIF}
        />
      </div>
    );

    return component;
  }
}
