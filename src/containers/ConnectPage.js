// @flow
import React from 'react';
import { observer } from 'mobx-react';

import type { InjectedContainerProps } from '../types/injected-props';
import { ENV } from '../const';
import Layout from '../components/Layout';
import ConnectBlock from '../components/connect/ConnectBlock';

type Props = InjectedContainerProps

@observer
export default class ConnectPage extends React.Component<Props> {
  render() {
    const {
      connectStore,
      profileStore
    } = this.props.rootStore;
    const {
      isTransportWebAuthn,
      transportId,
      progressState,
      currentOperationName,
      executeAction,
      deviceCode,
      verifyAddressInfo,
      wasDeviceLocked,
    } = connectStore;
    const { appVersion } = profileStore;

    return (
      <Layout
        isDevelopment={ENV.isDevelopment}
        appVersion={appVersion}
        transportId={transportId}
      >
        <ConnectBlock
          isWebAuthn={isTransportWebAuthn}
          isFirefox={ENV.isFirefox}
          progressState={progressState}
          currentOperationName={currentOperationName}
          executeAction={executeAction}
          deviceCode={deviceCode}
          verifyAddressInfo={verifyAddressInfo}
          wasDeviceLocked={wasDeviceLocked}
        />
      </Layout>
    );
  }
}
