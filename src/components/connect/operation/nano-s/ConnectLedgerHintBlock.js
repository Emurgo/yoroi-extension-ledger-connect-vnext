// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import OparationBase from '../base/OparationBase';
import type {
  DeviceNameType,
  ProgressStateType
}  from '../../../../types/cmn';
import {
  PROGRESS_STATE,
  OPARATION_NAME,
  DEVICE_NAME
} from '../../../../types/cmn';

import HintTextBlock from '../../../widgets/HintTextBlock';
import HintImageBlock from '../../../widgets/HintImageBlock';
import hintConnect1GIF from '../../../../assets/img/hint-connect-1.gif';
import hintConnect2GIF from '../../../../assets/img/hint-connect-2.gif';
import styles from './ConnectYoroiHintBlock.scss';

const message = defineMessages({
  nanoSPinCode: {
    id: 'hint.nanoS.common.pinCode',
    defaultMessage: '!!!Enter your PIN on your Ledger device, using the right and left buttons to select each number and then both buttons to confirm.'
  },
  nanoSCardanoApp: {
    id: 'hint.nanoS.common.CardanoApp',
    defaultMessage: '!!!Enter your PIN on your Ledger device, using the right and left buttons to select each number and then both buttons to confirm.'
  },  
  exportPublicKey: {
    id: 'hint.connect.exportPublicKey',
    defaultMessage: '!!!Press BOTH.'
  },
  confirmExportPublicKey: {
    id: 'hint.common.confirmExportPublicKey',
    defaultMessage: '!!!Press RIGHT.'
  },
});

type Props = {|
  deviceType: DeviceNameType,
  progressState: ProgressStateType,
|};

@observer
export default class ConnectYoroiHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const { deviceType } = this.props;
    let LeftBlock = null;
    let RightBlock = null;

    switch (deviceType) {
      case DEVICE_NAME.NANO_S:
        LeftBlock = (
          <div>
            <HintTextBlock
              number={1}
              text={message.nanoSPinCode}
            />
            <HintTextBlock
              number={2}
              text={message.nanoSCardanoApp}
            />
          </div>
        );

        RightBlock = (
          <HintImageBlock imagePath={hintConnect1GIF} />
        );
        break;
      case DEVICE_NAME.NANO_X:
        break;
      default:
        return (null);
    }

    return (
      <OparationBase
        LeftBlock={LeftBlock}
        RightBlock={RightBlock}
      />
    );
  }
}
