import React, { Component } from 'react';
import { OmnilogicContext } from '../OmnilogicContext';

import Showcase from './Showcase';

class ShowcaseContainer extends Component {
  render() {
    return (
      <OmnilogicContext.Consumer>
        {client => <Showcase client={client} {...this.props} />}
      </OmnilogicContext.Consumer>
    );
  }
}

export default ShowcaseContainer;
