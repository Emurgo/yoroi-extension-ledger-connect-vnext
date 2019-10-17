// @flow
import React from 'react';
import type { Node } from 'react';
import { observer } from 'mobx-react';

import TestBlock from './manual-test/TestBlock';
import Footer from './footer/Footer';

import styles from './Layout.scss';

type Props = {|
  isDevelopment: boolean,
  appVersion: string,
  transportId: string,
  children: Node,
|};

@observer
export default class Layout extends React.Component<Props> {
  render() {
    const {
      isDevelopment,
      appVersion,
      transportId,
      children,
    } = this.props;

    return (
      <div className={styles.component}>
        {/* TestBlock will only be visible in Development mode */}
        {isDevelopment && (
          <TestBlock />
        )}
        {/* Development mode block end */}

        {children}
        <Footer
          appVersion={appVersion}
          transportId={transportId}
        />
      </div>
    );
  }
}
