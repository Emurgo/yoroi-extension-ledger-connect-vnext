import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class App extends Component {
  render() {
    return (
      <div>
        <p>Yoroi Connect</p>
      </div>
    );
  }
}

export default App;
