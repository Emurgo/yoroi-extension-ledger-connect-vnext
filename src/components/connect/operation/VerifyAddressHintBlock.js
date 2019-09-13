// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import HintBlock from '../../widgets/HintBlock';
import hintVefifyAddress1GIF from '../../../assets/img/hint-verify-address-1.gif';
import hintVefifyAddress2GIF from '../../../assets/img/hint-verify-address-2.gif';
import hintVefifyAddress3GIF from '../../../assets/img/hint-verify-address-3.gif';
import styles from './VerifyAddressHintBlock.scss';

const message = defineMessages({
  info: {
    id: 'hint.verifyAddress.info',
    defaultMessage: '!!!Press BOTH.'
  },
  path: {
    id: 'hint.verifyAddress.path',
    defaultMessage: '!!!Press BOTH.'
  },
  address: {
    id: 'hint.verifyAddress.address',
    defaultMessage: '!!!Press BOTH.'
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
          text={message.info}
          imagePath={hintVefifyAddress1GIF}
        />
        <div className={styles.gap} />
        <HintBlock
          number={2}
          text={message.path}
          imagePath={hintVefifyAddress2GIF}
        />
        <div className={styles.gap} />
        <HintBlock
          number={3}
          text={message.address}
          imagePath={hintVefifyAddress3GIF}
        />
      </div>
    );

    return component;
  }
}