import React from 'react';
import type { Node } from 'react';
import { observer } from 'mobx-react';

import TestBlock from './manual-test/TestBlock';
import styles from './Layout.scss';

type Props = {|
  isDevelopment: boolean,
  getVersion: Function,
  getExtendedPublicKey: Function,
  signTransaction: Function,
  deriveAddress: Function,
  showAddress: Function,
  children: Node,
  isWebAuthn: boolean
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
      isWebAuthn,
      children,
    } = this.props;

    return (
      <div className={styles.component}>
        {isWebAuthn && (
          <div className={styles.webAuthnTopGap} />
        )}
        {isDevelopment && (
          <TestBlock
            getVersion={getVersion}
            getExtendedPublicKey={getExtendedPublicKey}
            signTransaction={signTransaction}
            deriveAddress={deriveAddress}
            showAddress={showAddress}
          />
        )}
        {children}
      </div>
    );
  }
}
