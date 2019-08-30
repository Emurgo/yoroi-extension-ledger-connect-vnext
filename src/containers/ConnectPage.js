// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type { InjectedContainerProps } from '../types';
import Layout from '../components/Layout';

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
      showAddress
    } = connectStore;

    const component = (
      <Layout
        getVersion={getVersion}
        getExtendedPublicKey={getExtendedPublicKey}
        signTransaction={signTransaction}
        deriveAddress={deriveAddress}
        showAddress={showAddress}
      />
    );
    return component;
  }
}
