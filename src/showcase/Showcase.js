import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ShowcaseGrid from './ShowcaseGrid';
import ShowcaseTabs from './ShowcaseTabs';
import ShowcaseFilters from './ShowcaseFilters';

class Showcase extends Component {
  constructor(props) {
    super(props);

    const { client, name } = this.props;

    this.state = {
      data: client.cache ? client.cache[name] : null,
      recommendationId: null,
      queryVariations: {}
    };
  }

  componentDidMount() {
    const { client, name } = this.props;
    const { data } = this.state;

    if (!data || Object.keys(data).length === 0) {
      let params = {
        showcaseName: name
      };

      client.fetchClient(params).then(resp => this.cacheData(resp.data, name));
    }
  }

  handleChange = (event, variationSelected, recommendationIdx) => {
    const { client, name } = this.props;
    let value = event.target.value;
    this.setState(({ recommendationId, queryVariations }) => {
      queryVariations[variationSelected] = value;

      let params = {
        recommendationId: recommendationIdx,
        queryVariations,
        showcaseName: name
      };

      client.fetchClient(params).then(resp => this.cacheData(resp.data, name));

      return {
        recommendationId: recommendationIdx,
        queryVariations
      };
    });
  };

  handleClick = (customParams, idx) => {
    const { client, name } = this.props;
    this.setState(({ recommendationId, queryVariations }) => {
      let params = {
        recommendationId: idx,
        queryVariations: {},
        showcaseName: name
      };

      client.fetchClient(params).then(resp => this.cacheData(resp.data, name));

      return {
        recommendationId: idx,
        queryVariations: {}
      };
    });
  };

  cacheData = (data, name) => {
    this.setState({ data: data[name] });
  };

  render() {
    const { data } = this.state;
    const { name } = this.props;

    if (!data || !name) return null;

    const {
      showcaseConfig: { type, options, recommendations, offerTemplate },
      offers,
      recommendationIdx
    } = data;
    const { customParams } = recommendations[recommendationIdx];
    return (
      <div>
        <div className="oppuz-showcase-options">
          {recommendations && recommendations.length > 1 && (
            <ShowcaseTabs
              {...options}
              recommendations={recommendations}
              selectedRecommendation={recommendationIdx}
              onClick={this.handleClick}
            />
          )}
          {customParams && (
            <ShowcaseFilters
              {...options}
              customParams={customParams}
              onChange={this.handleChange}
              recommendationIdx={recommendationIdx}
            />
          )}
        </div>

        {type === 'grid' && (
          <ShowcaseGrid
            {...options}
            offerTemplate={offerTemplate}
            offers={offers}
          />
        )}
      </div>
    );
  }
}

Showcase.propTypes = {
  data: PropTypes.object
};

export default Showcase;
