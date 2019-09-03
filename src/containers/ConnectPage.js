// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type { InjectedContainerProps } from '../types';
import { ENV } from '../const';
import Layout from '../components/Layout';
import ConnectBlock from '../components/connect/ConnectBlock';

type Props = InjectedContainerProps

@observer
export default class ConnectPage extends React.Component<Props> {
  render() {
    const { connectStore } = this.props.rootStore;
    const {
      getVersion,
      getExtendedPublicKey,
      signTransaction,
      deriveAddress,
      showAddress,
      isTransportWebAuthn,
      progressState
    } = connectStore;

    const component = (
      <Layout
        isDevelopment={ENV.isDevelopment}
        getVersion={getVersion}
        getExtendedPublicKey={getExtendedPublicKey}
        signTransaction={signTransaction}
        deriveAddress={deriveAddress}
        showAddress={showAddress}
        isWebAuthn={isTransportWebAuthn}
      >
        <ConnectBlock
          progressState={progressState}
        />
      </Layout>
    );
    return component;
  }
}
