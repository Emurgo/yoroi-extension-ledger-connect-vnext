// @flow
import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import stores from './stores';

const root = document.getElementById('root');
if (root !== null) {
  ReactDOM.render(
    <Provider store={stores}>
      <App />
    </Provider>,
    root
  );
}
