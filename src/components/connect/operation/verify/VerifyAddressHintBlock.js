// @flow //
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import type { VerifyAddressInfoType } from '../../../../types/cmn';
import type { DeviceCodeType } from '../../../../types/enum';
import HintBlock from '../../../widgets/hint/HintBlock';
import HintGap from '../../../widgets/hint/HintGap';

import styles from './VerifyAddressHintBlock.scss';

const message = defineMessages({
  sInfo: {
    id: 'hint.verifyAddress.info',
    defaultMessage: '!!!Check your Ledger screen, then press <strong>both</strong> buttons.'
  },
  sPath: {
    id: 'hint.verifyAddress.path',
    defaultMessage: '!!!Make sure the address path shown on your Ledger is the same as the one shown below, then press <strong>both</strong> buttons.'
  },
  sAddress: {
    id: 'hint.verifyAddress.address',
    defaultMessage: '!!!Make sure the address shown on your Ledger is the same as the one shown below, then press <strong>both</strong> buttons.'
  },
  xInfo: {
    id: 'hint.verifyAddress.info',
    defaultMessage: '!!!Check your Ledger screen, then press <strong>both</strong> buttons.'
  },
  xPath: {
    id: 'hint.verifyAddress.path',
    defaultMessage: '!!!Make sure the address path shown on your Ledger is the same as the one shown below, then press <strong>both</strong> buttons.'
  },
  xAddress: {
    id: 'hint.nanoX.verifyAddress.address',
    defaultMessage: '!!!Make sure the address shown on your Ledger is the same as the one shown below. Press the <strong>right</strong> button on your Ledger to scroll to the end of the address, then press <strong>both</strong> buttons.'
  },
});

type Props = {|
  deviceCode: DeviceCodeType,
  verifyAddressInfo: VerifyAddressInfoType,
  wasDeviceLocked: boolean
|};

@observer
export default class VerifyAddressHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const {
      deviceCode,
      verifyAddressInfo,
      wasDeviceLocked
    } = this.props;

    const stepStartNumber: number = wasDeviceLocked ? 2 : 0; // 2 = count of common step
    const imgVerify1 = require(`../../../../assets/img/nano-${deviceCode}/hint-verify-1.png`);
    const imgVerify2 = require(`../../../../assets/img/nano-${deviceCode}/hint-verify-2.png`);
    const imgVerify3 = require(`../../../../assets/img/nano-${deviceCode}/hint-verify-3.png`);

    const content = (
      <div className={styles.stepsRow}>
        <HintBlock
          number={stepStartNumber + 1}
          text={message[`${deviceCode}Info`]}
          imagePath={imgVerify1}
        />
        <HintGap />
        <HintBlock
          number={stepStartNumber + 2}
          text={message[`${deviceCode}Path`]}
          imagePath={imgVerify2}
          secondaryText={verifyAddressInfo.hdPath}
        />
        <HintGap />
        <HintBlock
          number={stepStartNumber + 3}
          text={message[`${deviceCode}Address`]}
          imagePath={imgVerify3}
          secondaryText={verifyAddressInfo.address}
        />
      </div>
    );

    return (
      <div className={styles.component}>
        {content}
      </div>
    );
  }
}
