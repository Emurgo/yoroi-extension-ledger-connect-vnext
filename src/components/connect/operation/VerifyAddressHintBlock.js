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
import HintBlock from '../../widgets/HintBlock';
import CommonHintBlock from './CommonHintBlock';
import imgNanoSVerify1 from '../../../assets/img/nano-s/hint-verify-1.png';
import imgNanoSVerify2 from '../../../assets/img/nano-s/hint-verify-2.png';
import imgNanoSVerify3 from '../../../assets/img/nano-s/hint-verify-3.png';
import imgNanoXVerify1 from '../../../assets/img/nano-x/hint-verify-1.png';
import imgNanoXVerify2 from '../../../assets/img/nano-x/hint-verify-2.png';
import imgNanoXVerify3 from '../../../assets/img/nano-x/hint-verify-3.png';
import styles from './VerifyAddressHintBlock.scss';

const message = defineMessages({
  nanoSInfo: {
    id: 'hint.nanoS.verifyAddress.info',
    defaultMessage: '!!!Press BOTH.'
  },
  nanoSPath: {
    id: 'hint.nanoS.verifyAddress.path',
    defaultMessage: '!!!Press BOTH.'
  },
  nanoSAddress: {
    id: 'hint.nanoS.verifyAddress.address',
    defaultMessage: '!!!Press BOTH.'
  },
});

type Props = {|
  deviceType: DeviceNameType,
  progressState: ProgressStateType,
  changeStep: Function,
  selectedStep: number,
  verifyAddressInfo: VerifyAddressInfoType,
|};

@observer
export default class VerifyAddressHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const {
      deviceType,
      progressState,
      verifyAddressInfo
    } = this.props;

    let content = null;
    switch (deviceType) {
      case DEVICE_NAME.NANO_S:
        content =  (progressState === PROGRESS_STATE.DEVICE_FOUND) ? (
          <div className={styles.stepsRowOne}>
            <HintBlock
              number={1}
              text={message.nanoSInfo}
              imagePath={imgNanoSVerify1}
            />
            <div className={styles.gap} />
            <HintBlock
              number={2}
              text={message.nanoSPath}
              secondaryText={verifyAddressInfo.hdPath}
              imagePath={imgNanoSVerify2}
            />
            <div className={styles.gap} />
            <HintBlock
              number={3}
              text={message.nanoSAddress}
              secondaryText={verifyAddressInfo.address}
              imagePath={imgNanoSVerify3}
            />
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
          <div className={styles.stepsRowOne}>
            <HintBlock
              number={1}
              text={message.nanoSInfo}
              imagePath={imgNanoXVerify1}
            />
            <div className={styles.gap} />
            <HintBlock
              number={2}
              text={message.nanoSPath}
              imagePath={imgNanoXVerify2}
            />
            <div className={styles.gap} />
            <HintBlock
              number={3}
              text={message.nanoSAddress}
              imagePath={imgNanoXVerify3}
            />
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
