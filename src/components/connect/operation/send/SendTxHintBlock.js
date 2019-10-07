// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import type { DeviceCodeType }  from '../../../../types/cmn';
import HintBlock from '../../../widgets/HintBlock';

import styles from './SendTxHintBlock.scss';

const message = defineMessages({
  sStartNewTx: {
    id: 'hint.sendTx.startNewTx',
    defaultMessage: '!!!Check your Ledger screen, then press <strong>right</strong> button.'
  },
  sConfirmValue: {
    id: 'hint.sendTx.confirmValue',
    defaultMessage: '!!!Confirm the ADA amount by pressing <strong>both</strong> buttons.'
  },
  sConfirmAddress: {
    id: 'hint.sendTx.confirmAddress',
    defaultMessage: "!!!Confirm the receiver's address by pressing <strong>both</strong> buttons."
  },
  sConfirmFee: {
    id: 'hint.sendTx.confirmFee',
    defaultMessage: '!!!Confirm Transaction Fee by pressing <strong>both</strong> buttons.'
  },
  sConfirmTx: {
    id: 'hint.sendTx.confirmTx',
    defaultMessage: '!!!Confirm Transaction Fee by pressing <strong>both</strong> buttons.'
  },
  xStartNewTx: {
    id: 'hint.nanoX.sendTx.startNewTx',
    defaultMessage: '!!!Check your Ledger screen, then press <strong>both</strong> buttons.'
  },
  xConfirmValue: {
    id: 'hint.sendTx.confirmValue',
    defaultMessage: '!!!Confirm the ADA amount by pressing <strong>both</strong> buttons.'
  },
  xConfirmAddress: {
    id: 'hint.nanoX.sendTx.confirmAddress',
    defaultMessage: "!!!Confirm the receiver's address by pressing the <strong>right</strong> button to scroll through the entire address. Then press <strong>both</strong> buttons."
  },
  xConfirmFee: {
    id: 'hint.sendTx.confirmFee',
    defaultMessage: '!!!Confirm Transaction Fee by pressing <strong>both</strong> buttons.'
  },
  xConfirmTx: {
    id: 'hint.sendTx.confirmTx',
    defaultMessage: '!!!Confirm Transaction Fee by pressing <strong>both</strong> buttons.'
  },
});

type Props = {|
  deviceCode: DeviceCodeType,
  wasDeviceLocked: boolean,
|};

@observer
export default class SendTxHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const {
      deviceCode,
      wasDeviceLocked
    } = this.props;

    const stepStartNumber: number = wasDeviceLocked ? 2 : 0; // 2 = count of common step
    const imgSend1 = require(`../../../../assets/img/nano-${deviceCode}/hint-send-1.png`);
    const imgSend2 = require(`../../../../assets/img/nano-${deviceCode}/hint-send-2.png`);
    const imgSend3 = require(`../../../../assets/img/nano-${deviceCode}/hint-send-3.png`);
    const imgSend4 = require(`../../../../assets/img/nano-${deviceCode}/hint-send-4.png`);
    const imgSend5 = require(`../../../../assets/img/nano-${deviceCode}/hint-send-5.png`);

    const content = (
      <div className={styles.stepsGrid}>
        <div className={styles.item1}>
          <HintBlock
            number={stepStartNumber + 1}
            text={message[`${deviceCode}StartNewTx`]}
            imagePath={imgSend1}
          />
        </div>
        <div className={styles.gap1} />
        <div className={styles.item2}>
          <HintBlock
            number={stepStartNumber + 2}
            text={message[`${deviceCode}ConfirmValue`]}
            imagePath={imgSend2}
          />
        </div>
        <div className={styles.gap2} />
        <div className={styles.item3}>
          <HintBlock
            number={stepStartNumber + 3}
            text={message[`${deviceCode}ConfirmAddress`]}
            imagePath={imgSend3}
          />
        </div>
        <div className={styles.item4}>
          <HintBlock
            number={stepStartNumber + 4}
            text={message[`${deviceCode}ConfirmFee`]}
            imagePath={imgSend4}
          />
        </div>
        <div className={styles.gap3} />
        <div className={styles.item5}>
          <HintBlock
            number={stepStartNumber + 5}
            text={message[`${deviceCode}ConfirmTx`]}
            imagePath={imgSend5}
          />
        </div>
      </div>
    );

    return (
      <div className={styles.component}>
        {content}
      </div>
    );
  }
}
