import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CButton } from '../src/index';

const App = () => {
  return (
    <div>
      <CButton>cuong</CButton>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
