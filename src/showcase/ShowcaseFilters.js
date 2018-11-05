import React, { Component } from 'react';

class ShowcaseFilters extends Component {
  render() {
    const { customParams, onChange, recommendationIdx } = this.props;
    return (
      <div className="oppuz-filters">
        {customParams
          .filter(customParam => customParam.type === 'select')
          .map((slct, index) => (
            <label key={slct.field} className="oppuz-filter-title">
              {slct.fieldName}:
              <select
                value={slct.selectedVariation}
                onChange={event =>
                  onChange(event, slct.field, recommendationIdx)
                }
              >
                {slct.variations.map(opt => (
                  <option key={opt} value={opt}>
                    {' '}
                    {opt}{' '}
                  </option>
                ))}
              </select>
            </label>
          ))}
      </div>
    );
  }
}

export default ShowcaseFilters;
