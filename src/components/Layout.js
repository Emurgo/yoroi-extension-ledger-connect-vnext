// @flow
import React from 'react';
import type { Node } from 'react';
import { observer } from 'mobx-react';

import TestBlock from './manual-test/TestBlock';
import Footer from './Footer';
import styles from './Layout.scss';

type Props = {|
  executeActionWithCustomRequest: Function,
  isDevelopment: boolean,
  appVersion: string,
  transportId: string,
  setCurrentOparationName: Function,
  children: Node,
|};

@observer
export default class Layout extends React.Component<Props> {
  render() {
    const {
      executeActionWithCustomRequest,
      setCurrentOparationName,
      isDevelopment,
      appVersion,
      transportId,
      children,
    } = this.props;

    return (
      <div className={styles.component}>
        {children}
        {isDevelopment && (
          <TestBlock
            executeActionWithCustomRequest={executeActionWithCustomRequest}
            setCurrentOparationName={setCurrentOparationName}
          />
        )}
      </div>
    );
  }
}
