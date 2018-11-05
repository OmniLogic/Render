import React from 'react';
import ReactDOM from 'react-dom';

import { OmnilogicClient, OmnilogicContext, ShowcaseContainer } from '../dist';

const client = new OmnilogicClient({
  token: process.env.TOKEN,
  cache: window.__OMNI_STATE__
});

class App extends React.Component {
  render() {
    return (
      <OmnilogicContext.Provider value={client}>
        <ShowcaseContainer name={process.env.SHOWCASE} />
      </OmnilogicContext.Provider>
    );
  }
}

var mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
