// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';

import HintBlock from '../widgets/HintBlock';
import hintCommon1GIF from '../../assets/img/hint-common-1.gif';
import hintCommon2GIF from '../../assets/img/hint-common-2.gif';
import styles from './CommonHintBlock.scss';

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
export default class CommonHintBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    return (
      <div className={styles.component}>
        <HintBlock
          number={1}
          text={message.hintCommon1}
          imagePath={hintCommon1GIF}
        />
        <div className={styles.gap} />
        <HintBlock
          number={2}
          text={message.hintCommon2}
          imagePath={hintCommon2GIF}
        />
      </div>
    );
  }
}
