// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import type {
  DeviceCodeType,
  ProgressStateType
}  from '../../../types/cmn';
import { PROGRESS_STATE } from '../../../types/cmn';
import CommonHintBlock from './CommonHintBlock';
import HintBlock from '../../widgets/HintBlock';

import styles from './SendTxHintBlock.scss';

const message = defineMessages({
  sStartNewTx: {
    id: 'hint.sendTx.startNewTx',
    defaultMessage: '!!!Press RIGHT.'
  },
  sConfirmValue: {
    id: 'hint.sendTx.confirmValue',
    defaultMessage: '!!!Press BOTH.'
  },
  sConfirmAddress: {
    id: 'hint.sendTx.confirmAddress',
    defaultMessage: '!!!Press BOTH.'
  },
  sConfirmFee: {
    id: 'hint.sendTx.confirmFee',
    defaultMessage: '!!!Press BOTH.'
  },
  sConfirmTx: {
    id: 'hint.sendTx.confirmTx',
    defaultMessage: '!!!Press RIGHT.'
  },
  xStartNewTx: {
    id: 'hint.sendTx.startNewTx',
    defaultMessage: '!!!Press RIGHT.'
  },
  xConfirmValue: {
    id: 'hint.sendTx.confirmValue',
    defaultMessage: '!!!Press BOTH.'
  },
  xConfirmAddress: {
    id: 'hint.sendTx.confirmAddress',
    defaultMessage: '!!!Press BOTH.'
  },
  xConfirmFee: {
    id: 'hint.sendTx.confirmFee',
    defaultMessage: '!!!Press BOTH.'
  },
  xConfirmTx: {
    id: 'hint.sendTx.confirmTx',
    defaultMessage: '!!!Press RIGHT.'
  },
});

type Props = {|
  deviceCode: DeviceCodeType,
  progressState: ProgressStateType,
|};

@observer
export default class SendTxHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const {
      deviceCode,
      progressState
    } = this.props;

    let content = null;
    if (progressState !== PROGRESS_STATE.DEVICE_FOUND) {
      content = (
        <CommonHintBlock
          deviceCode={deviceCode}
          progressState={progressState}
        />
      );
    } else {
      const imgSend1 = require(`../../../assets/img/nano-${deviceCode}/hint-send-1.png`);
      const imgSend2 = require(`../../../assets/img/nano-${deviceCode}/hint-send-2.png`);
      const imgSend3 = require(`../../../assets/img/nano-${deviceCode}/hint-send-3.png`);
      const imgSend4 = require(`../../../assets/img/nano-${deviceCode}/hint-send-4.png`);
      const imgSend5 = require(`../../../assets/img/nano-${deviceCode}/hint-send-5.png`);

      content = (
        <div className={styles.stepsGrid}>
          <div className={styles.item1}>
            <HintBlock
              number={1}
              text={message[`${deviceCode}StartNewTx`]}
              imagePath={imgSend1}
            />
          </div>
          <div className={styles.gap1} />
          <div className={styles.item2}>
            <HintBlock
              number={2}
              text={message[`${deviceCode}ConfirmValue`]}
              imagePath={imgSend2}
            />
          </div>
          <div className={styles.gap2} />
          <div className={styles.item3}>
            <HintBlock
              number={3}
              text={message[`${deviceCode}ConfirmAddress`]}
              imagePath={imgSend3}
            />
          </div>
          <div className={styles.item4}>
            <HintBlock
              number={4}
              text={message[`${deviceCode}ConfirmFee`]}
              imagePath={imgSend4}
            />
          </div>
          <div className={styles.gap3} />
          <div className={styles.item5}>
            <HintBlock
              number={5}
              text={message[`${deviceCode}ConfirmTx`]}
              imagePath={imgSend5}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={styles.component}>
        {content}
      </div>
    );
  }
}
