// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';

import HintBlock from '../../widgets/HintBlock';
import hintConnect1GIF from '../../../assets/img/hint-connect-1.gif';
import hintConnect2GIF from '../../../assets/img/hint-connect-2.gif';
import styles from './ConnectYoroiHintBlock.scss';

const message = defineMessages({
  hintCommon1: {
    id: 'hint.common.pinCode',
    defaultMessage: '!!!Pin Code'
  },
  hintCommon2: {
    id: 'hint.common.CardanoApp',
    defaultMessage: '!!!Cardano App'
  },
});

type Props = {||};
@observer
export default class OperationHintBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const component = (
      <div className={styles.component}>
        <HintBlock
          number={1}
          text={message.hintCommon1}
          imagePath={hintConnect1GIF}
        />
        <div className={styles.gap} />
        <HintBlock
          number={2}
          text={message.hintCommon2}
          imagePath={hintConnect2GIF}
        />
      </div>
    );

    return component;
  }
}
