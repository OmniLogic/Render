import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BaseOffer from './BaseOffer';

class ShowcaseGrid extends Component {
  render() {
    const { offers, offerTemplate } = this.props;
    return (
      <div className="oppuz-grid">
        {offers.map(offer => (
          <BaseOffer
            key={offer.id}
            offer={offer}
            offerTemplate={offerTemplate}
          />
        ))}
      </div>
    );
  }
}

ShowcaseGrid.propTypes = {
  numCols: PropTypes.number.isRequired,
  numRows: PropTypes.number.isRequired,
  offerTemplate: PropTypes.object.isRequired,
  offers: PropTypes.array.isRequired
};

export default ShowcaseGrid;
