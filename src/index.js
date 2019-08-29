// @flow
// import 'babel-polyfill';
import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import RootStore from './stores';

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.render(
    <Provider rootStore={new RootStore()}>
      <App />
    </Provider>,
    root
  );
}
