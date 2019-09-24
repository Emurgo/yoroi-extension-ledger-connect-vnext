// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import OparationBase from './base/OparationBase';
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
import HintImageBlock from '../../widgets/HintImageBlock';

import nanoSCommon1GIF from '../../../assets/img/hint-common-1.gif';
import nanoSCommon2GIF from '../../../assets/img/hint-common-2.gif';
import nanoSConnect1GIF from '../../../assets/img/hint-connect-1.gif';
import nanoSConnect2GIF from '../../../assets/img/hint-connect-2.gif';
import styles from './ConnectLedgerHintBlock.scss';

const message = defineMessages({
  nanoSPinCode: {
    id: 'hint.nanoS.common.pinCode',
    defaultMessage: '!!!Enter your PIN on your Ledger device, using the right and left buttons to select each number and then both buttons to confirm.'
  },
  nanoSCardanoApp: {
    id: 'hint.nanoS.common.CardanoApp',
    defaultMessage: '!!!Enter your PIN on your Ledger device, using the right and left buttons to select each number and then both buttons to confirm.'
  },
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
  changeStep: Function,
  selectedStep: number
|};

@observer
export default class ConnectLedgerHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };
  assetNanoS: Array<string>;

  constructor() {
    super();
    this.assetNanoS = [];
    this.assetNanoS[1] = nanoSCommon1GIF;
    this.assetNanoS[2] = nanoSCommon2GIF;
    this.assetNanoS[3] = nanoSConnect1GIF;
    this.assetNanoS[4] = nanoSConnect2GIF;
  }

  render() {
    const {
      deviceType,
      changeStep,
      selectedStep
    } = this.props;

    let LeftBlock = null;
    let RightBlock = null;

    switch (deviceType) {
      case DEVICE_NAME.NANO_S:
        LeftBlock = (
          <div>
            <HintBlock
              number={1}
              text={message.nanoSPinCode}
              imagePath={this.assetNanoS[selectedStep]}
            />
          </div>
        );

        RightBlock = (
          <HintImageBlock imagePath={this.assetNanoS[selectedStep]} />
        );
        break;
      case DEVICE_NAME.NANO_X:
        break;
      default:
        return (null);
    }

    return (
      <div>
        {LeftBlock}
      </div>
    );
  }
}
