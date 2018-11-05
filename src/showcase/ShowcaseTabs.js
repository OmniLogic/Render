import React, { Component } from 'react';

class ShowcaseTabs extends Component {
  render() {
    const { recommendations, selectedRecommendation, onClick } = this.props;
    return (
      <div className="oppuz-tabs">
        {recommendations.map((tab, idx) => (
          <span
            key={tab.recommendationName}
            className={
              'oppuz-tab ' +
              tab.recommendationClass +
              (idx === selectedRecommendation ? ' oppuz-tab-active' : '')
            }
            onClick={
              idx !== selectedRecommendation
                ? () => onClick(tab, idx, name)
                : void 0
            }
          >
            <h5>
              <i className="oppuz-icon" />
              <span className="oppuz-tab-text">{tab.recommendationName}</span>
            </h5>
          </span>
        ))}
      </div>
    );
  }
}

export default ShowcaseTabs;
