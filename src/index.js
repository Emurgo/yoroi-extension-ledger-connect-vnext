// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';

import App from './containers/App';
import RootStore from './stores';

// Run MobX in strict mode
configure({ enforceActions: 'always' });

const root = document.querySelector('#root');
if (root !== null) {
  console.debug('[YLC] Loading React...');
  ReactDOM.render(<App rootStore={new RootStore()} />, root);
} else {
  console.error('[YLC] could not find React inject tag');
}
