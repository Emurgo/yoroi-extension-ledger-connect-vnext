// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import HintBlock from '../../widgets/HintBlock';
import hintConnect1GIF from '../../../assets/img/hint-connect-1.gif';
import hintConnect2GIF from '../../../assets/img/hint-connect-2.gif';
import styles from './ConnectYoroiHintBlock.scss';

const message = defineMessages({
  exportPublicKey: {
    id: 'hint.connect.exportPublicKey',
    defaultMessage: '!!!Press BOTH.'
  },
  confirmExportPublicKey: {
    id: 'hint.common.confirmExportPublicKey',
    defaultMessage: '!!!Press RIGHT.'
  },
});

type Props = {||};
@observer
export default class ConnectYoroiHintBlock extends React.Component<Props> {
  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const component = (
      <div className={styles.component}>
        <HintBlock
          number={1}
          text={message.exportPublicKey}
          imagePath={hintConnect1GIF}
        />
        <div className={styles.gap} />
        <HintBlock
          number={2}
          text={message.confirmExportPublicKey}
          imagePath={hintConnect2GIF}
        />
      </div>
    );

    return component;
  }
}
