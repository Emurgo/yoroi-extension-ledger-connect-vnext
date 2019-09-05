// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';

import HintBlock from '../../widgets/HintBlock';
import hintVefifyAddress1GIF from '../../../assets/img/hint-verify-address-1.gif';
import hintVefifyAddress2GIF from '../../../assets/img/hint-verify-address-2.gif';
import hintVefifyAddress3GIF from '../../../assets/img/hint-verify-address-3.gif';
import styles from './VerifyAddressHintBlock.scss';

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
export default class VerifyAddressHintBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const component = (
      <div className={styles.component}>
        <HintBlock
          number={1}
          text={message.hintCommon1}
          imagePath={hintVefifyAddress1GIF}
        />
        <div className={styles.gap} />
        <HintBlock
          number={2}
          text={message.hintCommon2}
          imagePath={hintVefifyAddress2GIF}
        />
        <div className={styles.gap} />
        <HintBlock
          number={3}
          text={message.hintCommon2}
          imagePath={hintVefifyAddress3GIF}
        />
      </div>
    );

    return component;
  }
}
