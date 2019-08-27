// @flow
import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import stores from './stores';

ReactDOM.render(
  <Provider store={stores}>
    <App />
  </Provider>,
  document.getElementById('root')
);
