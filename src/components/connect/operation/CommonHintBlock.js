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
  OPARATION_NAME,
  DEVICE_NAME
} from '../../../types/cmn';
import HintBlock from '../../widgets/HintBlock';
import imgNanoSCommon1 from '../../../assets/img/nano-s/hint-common-1.png';
import imgNanoSCommon2 from '../../../assets/img/nano-s/hint-common-2.png';
import imgNanoXCommon1 from '../../../assets/img/nano-x/hint-common-1.png';
import imgNanoXCommon2 from '../../../assets/img/nano-x/hint-common-2.png';
import styles from './CommonHintBlock.scss';

const message = defineMessages({
  nanoSPinCode: {
    id: 'hint.nanoS.common.pinCode',
    defaultMessage: '!!!Enter your PIN on your Ledger device, using the right and left buttons to select each number and then both buttons to confirm.'
  },
  nanoSCardanoApp: {
    id: 'hint.nanoS.common.CardanoApp',
    defaultMessage: '!!!Enter your PIN on your Ledger device, using the right and left buttons to select each number and then both buttons to confirm.'
  },
});

type Props = {|
  deviceType: DeviceNameType,
  progressState: ProgressStateType,
|};

@observer
export default class CommonHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const {
      deviceType,
    } = this.props;

    let content = null;
    switch (deviceType) {
      case DEVICE_NAME.NANO_S:
        content = (
          <div className={styles.stepsRowOne}>
            <HintBlock
              number={1}
              text={message.nanoSPinCode}
              imagePath={imgNanoSCommon1}
            />
            <div className={styles.gap} />
            <HintBlock
              number={2}
              text={message.nanoSCardanoApp}
              imagePath={imgNanoSCommon2}
            />
          </div>
        );
        break;
      case DEVICE_NAME.NANO_X:
        content = (
          <div className={styles.stepsRowOne}>
            <HintBlock
              number={1}
              text={message.nanoSPinCode}
              imagePath={imgNanoXCommon1}
            />
            <div className={styles.gap} />
            <HintBlock
              number={2}
              text={message.nanoSCardanoApp}
              imagePath={imgNanoXCommon2}
            />
          </div>
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
