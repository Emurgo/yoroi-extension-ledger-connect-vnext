// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';

import HintBlock from '../widgets/HintBlock';
import hintConnect1GIF from '../../assets/img/hint-connect-1.gif';
import hintConnect2GIF from '../../assets/img/hint-connect-2.gif';
import hintSendTx1GIF from '../../assets/img/hint-send-tx-1.gif';
import hintSendTx2GIF from '../../assets/img/hint-send-tx-2.gif';
import hintSendTx3GIF from '../../assets/img/hint-send-tx-3.gif';
import hintSendTx4GIF from '../../assets/img/hint-send-tx-4.gif';
import hintSendTx5GIF from '../../assets/img/hint-send-tx-5.gif';
import hintVefifyAddress1GIF from '../../assets/img/hint-verify-address-1.gif';
import hintVefifyAddress2GIF from '../../assets/img/hint-verify-address-2.gif';
import hintVefifyAddress3GIF from '../../assets/img/hint-verify-address-3.gif';
import styles from './OperationHintBlock.scss';

const message = defineMessages({
  hintCommon1: {
    id: 'hint.common.pinCode',
    defaultMessage: '!!!Pin Code'
  },
  hintCommon2: {
    id: 'hint.common.CardanoApp',
    defaultMessage: '!!!Cardano App'
  },
});

type Props = {||};
@observer
export default class OperationHintBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    let component = null;

    const type = 0;
    switch (type) {
      case 0:
        component = (
          <div className={styles.component}>
            <HintBlock
              number={1}
              text={message.hintCommon1}
              imagePath={hintConnect1GIF}
            />
            <div className={styles.gap} />
            <HintBlock
              number={2}
              text={message.hintCommon2}
              imagePath={hintConnect2GIF}
            />
          </div>
        );
        break;
      case 1:
        component = (
          <div className={styles.component}>
            <HintBlock
              number={1}
              text={message.hintCommon1}
              imagePath={hintSendTx1GIF}
            />
            <div className={styles.gap} />
            <HintBlock
              number={2}
              text={message.hintCommon2}
              imagePath={hintSendTx2GIF}
            />
            <div className={styles.gap} />
            <HintBlock
              number={3}
              text={message.hintCommon2}
              imagePath={hintSendTx3GIF}
            />
            <div className={styles.gap} />
            <HintBlock
              number={4}
              text={message.hintCommon2}
              imagePath={hintSendTx4GIF}
            />
            <div className={styles.gap} />
            <HintBlock
              number={5}
              text={message.hintCommon2}
              imagePath={hintSendTx5GIF}
            />
          </div>
        );
        break;
      case 2:
        component = (
          <div className={styles.component}>
            <HintBlock
              number={1}
              text={message.hintCommon1}
              imagePath={hintVefifyAddress1GIF}
            />
            <div className={styles.gap} />
            <HintBlock
              number={2}
              text={message.hintCommon2}
              imagePath={hintVefifyAddress2GIF}
            />
            <div className={styles.gap} />
            <HintBlock
              number={3}
              text={message.hintCommon2}
              imagePath={hintVefifyAddress3GIF}
            />
          </div>
        );
        break;
      default:
        return (null);
    }

    return component;
  }
}
