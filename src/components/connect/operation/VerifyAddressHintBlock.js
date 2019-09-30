// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import type {
  DeviceCodeType,
  ProgressStateType,
  VerifyAddressInfoType,
}  from '../../../types/cmn';
import { PROGRESS_STATE } from '../../../types/cmn';
import HintBlock from '../../widgets/HintBlock';
import CommonHintBlock from './CommonHintBlock';

import styles from './VerifyAddressHintBlock.scss';

const message = defineMessages({
  sInfo: {
    id: 'hint.verifyAddress.info',
    defaultMessage: '!!!Press BOTH.'
  },
  sPath: {
    id: 'hint.verifyAddress.path',
    defaultMessage: '!!!Press BOTH.'
  },
  sAddress: {
    id: 'hint.verifyAddress.address',
    defaultMessage: '!!!Press BOTH.'
  },
  xInfo: {
    id: 'hint.verifyAddress.info',
    defaultMessage: '!!!Press BOTH.'
  },
  xPath: {
    id: 'hint.verifyAddress.path',
    defaultMessage: '!!!Press BOTH.'
  },
  xAddress: {
    id: 'hint.verifyAddress.address',
    defaultMessage: '!!!Press BOTH.'
  },
});

type Props = {|
  deviceCode: DeviceCodeType,
  progressState: ProgressStateType,
  verifyAddressInfo: VerifyAddressInfoType,
|};

@observer
export default class VerifyAddressHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const {
      deviceCode,
      progressState,
      verifyAddressInfo
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
      const imgVerify1 = require(`../../../assets/img/nano-${deviceCode}/hint-verify-1.png`);
      const imgVerify2 = require(`../../../assets/img/nano-${deviceCode}/hint-verify-2.png`);
      const imgVerify3 = require(`../../../assets/img/nano-${deviceCode}/hint-verify-3.png`);

      content = (
        <div className={styles.stepsRowOne}>
          <HintBlock
            number={1}
            text={message[`${deviceCode}Info`]}
            imagePath={imgVerify1}
          />
          <div className={styles.gap} />
          <HintBlock
            number={2}
            text={message[`${deviceCode}Path`]}
            imagePath={imgVerify2}
            secondaryText={verifyAddressInfo.hdPath}
          />
          <div className={styles.gap} />
          <HintBlock
            number={3}
            text={message[`${deviceCode}Address`]}
            imagePath={imgVerify3}
            secondaryText={verifyAddressInfo.address}
          />
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
