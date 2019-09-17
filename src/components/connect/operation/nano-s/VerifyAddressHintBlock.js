// @flow
import React from 'react';
import { observer } from 'mobx-react';
import { intlShape, defineMessages } from 'react-intl';

import HintTextBlock from '../../../widgets/HintTextBlock';
import hintVefifyAddress1GIF from '../../../../assets/img/hint-verify-address-1.gif';
import hintVefifyAddress2GIF from '../../../../assets/img/hint-verify-address-2.gif';
import hintVefifyAddress3GIF from '../../../../assets/img/hint-verify-address-3.gif';
import styles from './VerifyAddressHintBlock.scss';

const message = defineMessages({
  info: {
    id: 'hint.nanoS.verifyAddress.info',
    defaultMessage: '!!!Press BOTH.'
  },
  path: {
    id: 'hint.nanoS.verifyAddress.path',
    defaultMessage: '!!!Press BOTH.'
  },
  address: {
    id: 'hint.nanoS.verifyAddress.address',
    defaultMessage: '!!!Press BOTH.'
  },
});

type Props = {||};
@observer
export default class VerifyAddressHintBlock extends React.Component<Props> {
  static contextTypes = { intl: intlShape.isRequired };

  render() {
    const component = (
      <div className={styles.component} />
    );

    return component;
  }
}
