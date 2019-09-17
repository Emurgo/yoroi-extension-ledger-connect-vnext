// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';
import classNames from 'classnames';

import type {
  DeviceNameType,
  ProgressStateType,
  OparationNameType
}  from '../../types/cmn';
import { DEVICE_NAME } from '../../types/cmn';
import OparationBlock from './operation/OparationBlock';
import styles from './NavigationBlock.scss';

const message = defineMessages({
  titleLedgerNanoS: {
    id: 'wallet.title.ledgerNanoS',
    defaultMessage: '!!!Ledger Nano S'
  },
  titleLedgerNanoX: {
    id: 'wallet.title.ledgerNanoX',
    defaultMessage: '!!!Ledger Nano X'
  },
});

type Props = {|
  progressState: ProgressStateType,
  currentOparationName: OparationNameType,
|};
type State = {
  selectedDeviceType: DeviceNameType
}

@observer
export default class NavigationBlock extends React.Component<Props, State> {
  static contextTypes = { intl: intlShape.isRequired };

  constructor() {
    super();
    this.state = {
      selectedDeviceType: DEVICE_NAME.NANO_S
    };
  }

  changeNavigation = (deviceName: DeviceNameType) => {
    if (deviceName !== this.state.selectedDeviceType) {
      this.setState({
        selectedDeviceType: deviceName
      });
    }
  }

  render() {
    const { intl } = this.context;
    const {
      currentOparationName,
      progressState
    } = this.props;

    const styleNanoS = classNames([
      styles.wallet,
      (this.state.selectedDeviceType === DEVICE_NAME.NANO_S) ? styles.selected : null
    ]);
    const styleNanoX = classNames([
      styles.wallet,
      (this.state.selectedDeviceType === DEVICE_NAME.NANO_X) ? styles.selected : null
    ]);

    return (
      <div className={styles.component}>
        <div className={styles.navigator}>
          <button
            className={styleNanoS}
            type="button"
            onClick={this.changeNavigation.bind(null, DEVICE_NAME.NANO_S)}
          >
            <div className={styles.text}>
              {intl.formatMessage(message.titleLedgerNanoS)}
            </div>
          </button>
          <button
            className={styleNanoX}
            type="button"
            onClick={this.changeNavigation.bind(null, DEVICE_NAME.NANO_X)}
          >
            <div className={styles.text}>
              {intl.formatMessage(message.titleLedgerNanoX)}
            </div>
          </button>
        </div>
        <div className={styles.targets}>
          <OparationBlock
            deviceType={this.state.selectedDeviceType}
            currentOparationName={currentOparationName}
            progressState={progressState}
          />
        </div>
      </div>
    );
  }
}
