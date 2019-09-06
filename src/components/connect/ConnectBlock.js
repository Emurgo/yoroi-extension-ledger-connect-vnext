// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';

import type {
  ProgressStateType,
  OparationNameType,
} from '../../types/cmn';
import {
  PROGRESS_STATE,
  OPARATION_NAME,
} from '../../types/cmn';
import NoteBlock from '../widgets/NoteBlock';
import CommonHintBlock from './CommonHintBlock';
import ConnectYoroiHintBlock from './operation/ConnectYoroiHintBlock';
import SendTxHintBlock from './operation/SendTxHintBlock';
import VerifyAddressHintBlock from './operation/VerifyAddressHintBlock';

import styles from './ConnectBlock.scss';

const messages = defineMessages({
  webAuthnNote: {
    id: 'note.webauthn',
    defaultMessage: '!!!You will see a popup message about a security key above. This appears because Yoroi uses the WebAuthn API. Please disregard the message and DO NOT INTERACT with the above window.',
  },
  titleDefault: {
    id: 'title.default',
    defaultMessage: '!!!Yoroi Ledger Connector',
  },
  titleConnect: {
    id: 'title.connect',
    defaultMessage: '!!!Connect To Ledger Hardware Wallet',
  },
  titleSenTx: {
    id: 'title.sendTx',
    defaultMessage: '!!!Send Transaction Using Ledger Hardware Wallet',
  },
  titleVerifyAddress: {
    id: 'title.verifyAddress',
    defaultMessage: '!!!Verify Address on Ledger Hardware Wallet',
  },
});

type Props = {|
  isWebAuthn: boolean,
  progressState: ProgressStateType,
  currentOparationName: OparationNameType,
|};

@observer
export default class ConnectBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;
    const {
      isWebAuthn,
      progressState,
      currentOparationName,
    } = this.props;

    const showCommonHint = (progressState !== PROGRESS_STATE.DEVICE_FOUND);
    const showOparationHint = (progressState === PROGRESS_STATE.DEVICE_FOUND);

    let operationHintBlock;
    let title;
    switch (currentOparationName) {
      case OPARATION_NAME.GET_EXTENDED_PUBLIC_KEY:
        operationHintBlock = <ConnectYoroiHintBlock />;
        title = messages.titleConnect;
        break;
      case OPARATION_NAME.SIGN_TX:
        operationHintBlock = <SendTxHintBlock />;
        title = messages.titleSenTx;
        break;
      case OPARATION_NAME.SHOW_ADDRESS:
        operationHintBlock = <VerifyAddressHintBlock />;
        title = messages.titleVerifyAddress;
        break;
      default:
        // FOR NOW NO-OPERATION
        title = messages.default;
        break;
    }
    const TitleBlock = (
      <div className={styles.title}>{intl.formatMessage(title)}</div>
    );

    return (
      <div className={styles.component}>
        { isWebAuthn && <NoteBlock content={messages.webAuthnNote} />}
        {TitleBlock}
        {showCommonHint && <CommonHintBlock />}
        {showOparationHint && operationHintBlock}
        {<ConnectYoroiHintBlock />}
      </div>
    );
  }
}
