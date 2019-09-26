// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import type {
  DeviceNameType,
  ProgressStateType
}  from '../../../types/cmn';
import {
  PROGRESS_STATE,
  DEVICE_NAME,
} from '../../../types/cmn';
import CommonHintBlock from './CommonHintBlock';
import HintBlock from '../../widgets/HintBlock';
import imgNanoSSendTx1 from '../../../assets/img/nano-s/hint-send-1.png';
import imgNanoSSendTx2 from '../../../assets/img/nano-s/hint-send-2.png';
import imgNanoSSendTx3 from '../../../assets/img/nano-s/hint-send-3.png';
import imgNanoSSendTx4 from '../../../assets/img/nano-s/hint-send-4.png';
import imgNanoSSendTx5 from '../../../assets/img/nano-s/hint-send-5.png';
import imgNanoXSendTx1 from '../../../assets/img/nano-x/hint-send-1.png';
import imgNanoXSendTx2 from '../../../assets/img/nano-x/hint-send-2.png';
import imgNanoXSendTx3 from '../../../assets/img/nano-x/hint-send-3.png';
import imgNanoXSendTx4 from '../../../assets/img/nano-x/hint-send-4.png';
import imgNanoXSendTx5 from '../../../assets/img/nano-x/hint-send-5.png';
import styles from './SendTxHintBlock.scss';

const message = defineMessages({
  nanoSStartNewTx: {
    id: 'hint.nanoS.sendTx.startNewTx',
    defaultMessage: '!!!Press RIGHT.'
  },
  nanoSConfirmValue: {
    id: 'hint.nanoS.sendTx.confirmValue',
    defaultMessage: '!!!Press BOTH.'
  },
  nanoSConfirmAddress: {
    id: 'hint.nanoS.sendTx.confirmAddress',
    defaultMessage: '!!!Press BOTH.'
  },
  nanoSConfirmFee: {
    id: 'hint.nanoS.sendTx.confirmFee',
    defaultMessage: '!!!Press BOTH.'
  },
  nanoSConfirmTx: {
    id: 'hint.nanoS.sendTx.confirmTx',
    defaultMessage: '!!!Press RIGHT.'
  },
});

type Props = {|
  deviceType: DeviceNameType,
  progressState: ProgressStateType,
  changeStep: Function,
  selectedStep: number
|};

@observer
export default class SendTxHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const {
      deviceType,
      progressState
    } = this.props;

    let content = null;
    switch (deviceType) {
      case DEVICE_NAME.NANO_S:
        content =  (progressState === PROGRESS_STATE.DEVICE_FOUND) ? (
          <div>
            <div className={styles.stepsRowOne}>
              <HintBlock
                number={1}
                text={message.nanoSStartNewTx}
                imagePath={imgNanoSSendTx1}
              />
              <div className={styles.gap} />
              <HintBlock
                number={2}
                text={message.nanoSConfirmValue}
                imagePath={imgNanoSSendTx2}
              />
              <div className={styles.gap} />
              <HintBlock
                number={3}
                text={message.nanoSConfirmAddress}
                imagePath={imgNanoSSendTx3}
              />
            </div>
            <div className={styles.stepsRowOne}>
              <HintBlock
                number={4}
                text={message.nanoSConfirmFee}
                imagePath={imgNanoSSendTx4}
              />
              <div className={styles.gap} />
              <HintBlock
                number={5}
                text={message.nanoSConfirmTx}
                imagePath={imgNanoSSendTx5}
              />
            </div>
          </div>
        ) : (
          <CommonHintBlock
            deviceType={deviceType}
            progressState={progressState}
          />
        );
        break;
      case DEVICE_NAME.NANO_X:
        content =  (progressState === PROGRESS_STATE.DEVICE_FOUND) ? (
          <div>
            <div className={styles.stepsRowOne}>
              <HintBlock
                number={1}
                text={message.nanoSStartNewTx}
                imagePath={imgNanoXSendTx1}
              />
              <div className={styles.gap} />
              <HintBlock
                number={2}
                text={message.nanoSConfirmValue}
                imagePath={imgNanoXSendTx2}
              />
              <div className={styles.gap} />
              <HintBlock
                number={3}
                text={message.nanoSConfirmAddress}
                imagePath={imgNanoXSendTx3}
              />
            </div>
            <div className={styles.stepsRowOne}>
              <HintBlock
                number={4}
                text={message.nanoSConfirmFee}
                imagePath={imgNanoXSendTx4}
              />
              <div className={styles.gap} />
              <HintBlock
                number={5}
                text={message.nanoSConfirmTx}
                imagePath={imgNanoXSendTx5}
              />
            </div>
          </div>
        ) : (
          <CommonHintBlock
            deviceType={deviceType}
            progressState={progressState}
          />
        );
        break;
      default:
        return (null);
    }

    return (
      <div className={styles.component}>
        {content}
      </div>
    );
  }
}
