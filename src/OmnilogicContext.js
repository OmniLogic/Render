import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const OmnilogicContext = React.createContext({
  client: {}
});

export class OmnilogicProvider extends Component {
  render() {
    return (
      <OmnilogicContext.Provider value={this.props.client}>
        {this.props.children}
      </OmnilogicContext.Provider>
    );
  }
}

OmnilogicProvider.propTypes = {
  client: PropTypes.object.isRequired
};
