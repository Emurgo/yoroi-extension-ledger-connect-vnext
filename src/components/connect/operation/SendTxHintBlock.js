// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import type {
  DeviceNameType,
  ProgressStateType
}  from '../../../types/cmn';
import HintTextBlock from '../../widgets/HintTextBlock';
import hintSendTx1GIF from '../../../assets/img/hint-send-tx-1.gif';
import hintSendTx2GIF from '../../../assets/img/hint-send-tx-2.gif';
import hintSendTx3GIF from '../../../assets/img/hint-send-tx-3.gif';
import hintSendTx4GIF from '../../../assets/img/hint-send-tx-4.gif';
import hintSendTx5GIF from '../../../assets/img/hint-send-tx-5.gif';
import styles from './SendTxHintBlock.scss';

const message = defineMessages({
  startNewTx: {
    id: 'hint.nanoS.sendTx.startNewTx',
    defaultMessage: '!!!Press RIGHT.'
  },
  confirmValue: {
    id: 'hint.nanoS.sendTx.confirmValue',
    defaultMessage: '!!!Press BOTH.'
  },
  confirmAddress: {
    id: 'hint.nanoS.sendTx.confirmAddress',
    defaultMessage: '!!!Press BOTH.'
  },
  confirmFee: {
    id: 'hint.nanoS.sendTx.confirmFee',
    defaultMessage: '!!!Press BOTH.'
  },
  confirmTx: {
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
    const component = (
      <div className={styles.component} />
    );

    return component;
  }
}
