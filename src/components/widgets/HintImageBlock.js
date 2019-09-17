// @flow
import React from 'react';
import { observer } from 'mobx-react';

import styles from './HintImageBlock.scss';

type Props = {|
  imagePath: string
|};

@observer
export default class HintImageBlock extends React.Component<Props> {

  render() {
    const { imagePath } = this.props;

    // TODO: Fix Image scaling problem
    return (
      <div className={styles.component}>
        <img
          className={styles.image}
          src={imagePath}
          alt="HintImage"
        />
      </div>
    );
  }
}
