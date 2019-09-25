// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import CommonHintBlock from './CommonHintBlock';
import type {
  DeviceNameType,
  ProgressStateType
}  from '../../../types/cmn';
import {
  PROGRESS_STATE,
  DEVICE_NAME,
} from '../../../types/cmn';

import HintBlock from '../../widgets/HintBlock';

import imgNanoSConnect1 from '../../../assets/img/hint-connect-1.gif';
import imgNanoSConnect2 from '../../../assets/img/hint-connect-2.gif';
import styles from './ConnectLedgerHintBlock.scss';

const message = defineMessages({
  nanoSExportPublicKey: {
    id: 'hint.nanoS.connect.exportPublicKey',
    defaultMessage: '!!!Check your Ledger screen, then press both buttons.'
  },
  nanoSConfirmExportPublicKey: {
    id: 'hint.nanoS.connect.confirmExportPublicKey',
    defaultMessage: '!!!Confirm exporting the public key by pressing both buttons.'
  },
});

type Props = {|
  deviceType: DeviceNameType,
  progressState: ProgressStateType,
|};

@observer
export default class ConnectLedgerHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const {
      deviceType,
      progressState
    } = this.props;

    let content = null;
    switch (deviceType) {
      case DEVICE_NAME.NANO_X:
      case DEVICE_NAME.NANO_S:
        content =  (progressState === PROGRESS_STATE.DEVICE_FOUND) ? (
          <div className={styles.stepsRowOne}>
            <HintBlock
              number={1}
              text={message.nanoSExportPublicKey}
              imagePath={imgNanoSConnect1}
            />
            <div className={styles.gap} />
            <HintBlock
              number={2}
              text={message.nanoSConfirmExportPublicKey}
              imagePath={imgNanoSConnect2}
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
