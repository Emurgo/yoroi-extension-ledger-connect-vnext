// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import type { DeviceCodeType }  from '../../../../types/cmn';
import HintBlock from '../../../widgets/HintBlock';

import styles from './ConnectLedgerHintBlock.scss';

const message = defineMessages({
  sExportPublicKey: {
    id: 'hint.connect.exportPublicKey',
    defaultMessage: '!!!Check your Ledger screen, then press both buttons.'
  },
  sConfirmExportPublicKey: {
    id: 'hint.connect.confirmExportPublicKey',
    defaultMessage: '!!!Confirm exporting the public key by pressing both buttons.'
  },
  xExportPublicKey: {
    id: 'hint.connect.exportPublicKey',
    defaultMessage: '!!!Check your Ledger screen, then press both buttons.'
  },
  xConfirmExportPublicKey: {
    id: 'hint.connect.confirmExportPublicKey',
    defaultMessage: '!!!Confirm exporting the public key by pressing both buttons.'
  },
});

type Props = {|
  deviceCode: DeviceCodeType,
|};

@observer
export default class ConnectLedgerHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const { deviceCode } = this.props;

    const imgConnect1 = require(`../../../../assets/img/nano-${deviceCode}/hint-connect-1.png`);
    const imgConnect2 = require(`../../../../assets/img/nano-${deviceCode}/hint-connect-2.png`);
    const content = (
      <div className={styles.stepsRowOne}>
        <HintBlock
          number={1}
          text={message[`${deviceCode}ExportPublicKey`]}
          imagePath={imgConnect1}
        />
        <div className={styles.gap} />
        <HintBlock
          number={2}
          text={message[`${deviceCode}ConfirmExportPublicKey`]}
          imagePath={imgConnect2}
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
