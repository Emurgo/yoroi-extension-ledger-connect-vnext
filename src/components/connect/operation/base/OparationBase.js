// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import type { DeviceNameType }  from '../../../../types/cmn';
import styles from './OparationBase.scss';

const message = defineMessages({
  topInfo: {
    id: 'oparation.top.ledgerDeviceInfo',
    defaultMessage: '!!!Perform the following actions on your Ledger device'
  },
});

type Props = {|
  deviceType: DeviceNameType
|};

@observer
export default class OparationBase extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const { intl } = this.context;

    const component = (
      <div className={styles.component}>
        <div>{intl.formatMessage(message.topInfo)}</div>
      </div>
    );

    return component;
  }
}
