// @flow
import React from 'react';
import type { Node } from 'react';
import { observer } from 'mobx-react';

import TestBlock from './manual-test/TestBlock';
import Footer from './Footer';
import styles from './Layout.scss';

type Props = {|
  isDevelopment: boolean,
  getVersion: Function,
  getExtendedPublicKey: Function,
  signTransaction: Function,
  deriveAddress: Function,
  showAddress: Function,
  appVersion: string,
  transportId: string,
  children: Node,
|};

@observer
export default class Layout extends React.Component<Props> {
  render() {
    const {
      getVersion,
      getExtendedPublicKey,
      signTransaction,
      deriveAddress,
      showAddress,
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
            getVersion={getVersion}
            getExtendedPublicKey={getExtendedPublicKey}
            signTransaction={signTransaction}
            deriveAddress={deriveAddress}
            showAddress={showAddress}
          />
        )}
        <Footer
          appVersion={appVersion}
          transportId={transportId}
        />
      </div>
    );
  }
}
