import React from 'react';
import ReactDOM from 'react-dom';

import { OmnilogicClient, ShowcaseContainer, OmnilogicProvider } from '../dist';

const client = new OmnilogicClient({
  token: process.env.TOKEN,
  cache: window.__OMNI_STATE__
});

class App extends React.Component {
  render() {
    return (
      <OmnilogicProvider client={client}>
        <ShowcaseContainer name={process.env.SHOWCASE} />
      </OmnilogicProvider>
    );
  }
}

var mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
