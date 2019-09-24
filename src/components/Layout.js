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
  children: Node,
|};

@observer
export default class Layout extends React.Component<Props> {
  render() {
    const {
      executeActionWithCustomRequest,
      isDevelopment,
      appVersion,
      transportId,
      children,
    } = this.props;

    return (
      <div className={styles.component}>
        {children}
        {isDevelopment && (
          <TestBlock executeActionWithCustomRequest={executeActionWithCustomRequest} />
        )}
        <Footer
          appVersion={appVersion}
          transportId={transportId}
        />
      </div>
    );
  }
}
