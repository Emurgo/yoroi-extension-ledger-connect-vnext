import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer('store')
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
