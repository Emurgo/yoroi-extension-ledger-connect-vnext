// @flow //
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import type { DeriveAddressRequest } from '../../../../types/cmn';
import type { DeviceCodeType } from '../../../../types/enum';
import HintBlock from '../../../widgets/hint/HintBlock';
import HintGap from '../../../widgets/hint/HintGap';
import {
  pathToString,
} from '../../../../utils/cmn';
import { AddressTypeNibbles } from '@cardano-foundation/ledgerjs-hw-app-cardano';

import styles from './DeriveAddressHintBlock.scss';

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
  sWarning: {
    id: 'hint.warning',
    defaultMessage: '!!!Accept the warning by pressing <strong>both</strong> buttons.'
  },
  sHash: {
    id: 'hint.hash',
    defaultMessage: '!!!Make sure the hash shown on your Ledger is the same as the one shown below, then press <strong>both</strong> buttons.'
  },
  sPointer: {
    id: 'hint.pointer',
    defaultMessage: '!!!Make sure the pointer shown on your Ledger is the same as the one shown below, then press <strong>both</strong> buttons.'
  },
  sExport: {
    id: 'hint.export',
    defaultMessage: '!!!Confirm exporting the address by pressing the <strong>right</strong> button.'
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
  xWarning: {
    id: 'hint.warning',
    defaultMessage: '!!!Accept the warning by pressing <strong>both</strong> buttons.'
  },
  xHash: {
    id: 'hint.hash',
    defaultMessage: '!!!Make sure the hash shown on your Ledger is the same as the one shown below, then press <strong>both</strong> buttons.'
  },
  xPointer: {
    id: 'hint.pointer',
    defaultMessage: '!!!Make sure the pointer shown on your Ledger is the same as the one shown below, then press <strong>both</strong> buttons.'
  },
  xExport: {
    id: 'hint.export',
    defaultMessage: '!!!Confirm exporting the address by pressing the <strong>right</strong> button.'
  },
});

type Props = {|
  deviceCode: DeviceCodeType,
  deriveAddressInfo: DeriveAddressRequest,
  wasDeviceLocked: boolean
|};

@observer
export default class DeriveAddressHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const {
      deviceCode,
      deriveAddressInfo,
      wasDeviceLocked
    } = this.props;

    const stepStartNumber: number = wasDeviceLocked ? 2 : 0; // 2 = count of common step
    const imgExport1 = require(`../../../../assets/img/nano-${deviceCode}/hint-export-address.png`);
    const imgExport2 = require(`../../../../assets/img/nano-${deviceCode}/hint-export-address-confirm.png`);
    const stakingKey = require(`../../../../assets/img/nano-${deviceCode}/hint-staking-key.png`);
    const byronWarning = require(`../../../../assets/img/nano-${deviceCode}/hint-byron-warning.png`);
    const enterpriseWarning = require(`../../../../assets/img/nano-${deviceCode}/hint-enterprise-warning.png`);
    const rewardWarning = require(`../../../../assets/img/nano-${deviceCode}/hint-reward-warning.png`);
    const keyHash = require(`../../../../assets/img/nano-${deviceCode}/hint-keyhash.png`);
    const pointer = require(`../../../../assets/img/nano-${deviceCode}/hint-pointer.png`);

    let stepNumber = stepStartNumber;
    const content = (
      <div className={styles.stepsRow}>
        <HintBlock
          number={++stepNumber}
          text={message[`${deviceCode}Info`]}
          imagePath={imgExport1}
        />
        <HintGap />
        {deriveAddressInfo.addressTypeNibble === AddressTypeNibbles.BYRON && (
          <>
            <HintBlock
              number={++stepNumber}
              text={message[`${deviceCode}Warning`]}
              imagePath={byronWarning}
            />
            <HintGap />
          </>
        )}
        {deriveAddressInfo.addressTypeNibble === AddressTypeNibbles.ENTERPRISE && (
          <>
            <HintBlock
              number={++stepNumber}
              text={message[`${deviceCode}Warning`]}
              imagePath={enterpriseWarning}
            />
            <HintGap />
          </>
        )}
        {deriveAddressInfo.addressTypeNibble === AddressTypeNibbles.REWARD && (
          <>
            <HintBlock
              number={++stepNumber}
              text={message[`${deviceCode}Warning`]}
              imagePath={rewardWarning}
            />
            <HintGap />
          </>
        )}
        {deriveAddressInfo.stakingPath != null && (
          <>
            <HintBlock
              number={++stepNumber}
              text={message[`${deviceCode}Path`]}
              imagePath={stakingKey}
              secondaryText={pathToString(deriveAddressInfo.stakingPath)}
            />
            <HintGap />
          </>
        )}
        {deriveAddressInfo.stakingKeyHashHex != null && (
          <>
            <HintBlock
              number={++stepNumber}
              text={message[`${deviceCode}Hash`]}
              imagePath={keyHash}
              secondaryText={deriveAddressInfo.stakingKeyHashHex}
            />
            <HintGap />
          </>
        )}
        {deriveAddressInfo.stakingBlockchainPointer != null && (
          <>
            <HintBlock
              number={++stepNumber}
              text={message[`${deviceCode}Pointer`]}
              imagePath={pointer}
              secondaryText={
                `(${deriveAddressInfo.stakingBlockchainPointer.blockIndex}, ${deriveAddressInfo.stakingBlockchainPointer.txIndex}, ${deriveAddressInfo.stakingBlockchainPointer.certificateIndex})`
              }
            />
            <HintGap />
          </>
        )}
        <HintBlock
          number={++stepNumber}
          text={message[`${deviceCode}Export`]}
          imagePath={imgExport2}
        />
        <HintGap />
      </div>
    );

    return (
      <div className={styles.component}>
        {content}
      </div>
    );
  }
}
