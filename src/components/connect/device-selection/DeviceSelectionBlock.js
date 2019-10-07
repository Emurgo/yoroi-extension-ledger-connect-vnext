// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';


import type { DeviceCodeType }  from '../../../types/cmn';
import { DEVICE_CODE } from '../../../types/cmn';
import {
  VIDEO_LINK_NANO_S,
  VIDEO_LINK_NANO_X
} from '../../../const';
import imgExternalLink from '../../../assets/img/external-link.svg';

import styles from './DeviceSelectionBlock.scss';

const message = defineMessages({
  titleLedgerNanoS: {
    id: 'wallet.title.ledgerNanoS',
    defaultMessage: '!!!Ledger Nano S'
  },
  titleLedgerNanoX: {
    id: 'wallet.title.ledgerNanoX',
    defaultMessage: '!!!Ledger Nano X'
  },
  chooseDevice: {
    id: 'deviceSelection.chooseDevice',
    defaultMessage: '!!!Choose your device'
  },
  videoLinkPart1: {
    id: 'deviceSelection.videoLink.part1',
    defaultMessage: '!!!You can also check video instuction for '
  },
  videoLinkPart2: {
    id: 'deviceSelection.videoLink.part2',
    defaultMessage: '!!! or '
  },
  videoLinkPart3: {
    id: 'deviceSelection.videoLink.part3',
    defaultMessage: '!!! .'
  },
});

type Props = {|
  executeAction: Function,
|};

@observer
export default @observer class DeviceSelectionBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  onButtonClicked = (deviceName: DeviceCodeType) => {
    this.props.executeAction(deviceName);
  };

  render() {
    const { intl } = this.context;

    return (
      <div className={styles.component}>
        <div className={styles.deviceSelection}>
          <div className={styles.title}>
            {intl.formatMessage(message.chooseDevice)}
          </div>
          <button
            className={styles.device}
            type="button"
            onClick={this.onButtonClicked.bind(null, DEVICE_CODE.NANO_S)}
          >
            <div className={styles.text}>
              {intl.formatMessage(message.titleLedgerNanoS)}
            </div>
          </button>
          <button
            className={styles.device}
            type="button"
            onClick={this.onButtonClicked.bind(null, DEVICE_CODE.NANO_X)}
          >
            <div className={styles.text}>
              {intl.formatMessage(message.titleLedgerNanoX)}
            </div>
          </button>
        </div>
        <div className={styles.videoLink}>
          <span className={styles.videoLinkText}>
            {intl.formatMessage(message.videoLinkPart1)}
          </span>
          {/* TODO: Update correct link  */}
          <a
            href={VIDEO_LINK_NANO_S}
            className={styles.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            {intl.formatMessage(message.titleLedgerNanoS)}
          </a>
          <img
            className={styles.linkIcon}
            src={imgExternalLink}
            alt="External Link"
          />
          <span className={styles.videoLinkText}>
            {intl.formatMessage(message.videoLinkPart2)}
          </span>
          {/* TODO: Update correct link  */}
          <a
            href={VIDEO_LINK_NANO_X}
            className={styles.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            {intl.formatMessage(message.titleLedgerNanoX)}
          </a>
          <img
            className={styles.linkIcon}
            src={imgExternalLink}
            alt="External Link"
          />
          <span className={styles.videoLinkText}>
            {intl.formatMessage(message.videoLinkPart3)}
          </span>
        </div>
      </div>
    );
  }
}
