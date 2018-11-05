import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DefaultOffer from './DefaultOffer';
import dayjs from 'dayjs';

const deepEqual = require('deep-equal');
const jsont = require('jsont')();

jsont.use('currency', (input, separator, next) => {
  next(null, input.toLocaleString('pt-BR'));
});

jsont.use('split', function(input, separator, next) {
  next(null, input ? input.split(separator) : input);
});

jsont.use('list', function(input, next) {
  next(null, typeof input === 'string' ? [input] : input);
});

jsont.use('suffix', (input, suffix, next) => {
  next(null, `${input}${suffix}`);
});

jsont.use('preffix', function(input, preffix, next) {
  next(null, `${preffix}${input}`);
});

jsont.use('toDate', function(input, format, next) {
  const date = dayjs(input);
  let timezoneOffset = new Date(date).getTimezoneOffset();
  next(
    null,
    dayjs(date)
      .add(timezoneOffset, 'minutes')
      .format(format)
  );
});

class BaseOffer extends Component {
  state = {
    offer: null
  };

  constructor(props) {
    super(props);
    const { offerTemplate, offer } = this.props;
    jsont.render(offerTemplate.template, offer, (err, out) => {
      if (err) console.error(err);
      this.state = {
        offer: {
          ...out
        }
      };
    });
  }

  componentDidMount() {
    this.formatOffer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!deepEqual(prevProps.offerTemplate, this.props.offerTemplate))
      console.log('update') || this.formatOffer();
  }

  formatOffer = () => {
    const { offerTemplate, offer } = this.props;
    jsont.render(offerTemplate.template, offer, (err, out) => {
      if (err) console.error(err);
      this.setState({ offer: { ...out } });
    });
  };

  renderOffer = (offerTemplate, offer) => {
    const { type, template } = offerTemplate;
    switch (type) {
      case 'default':
        return <DefaultOffer key={offer.id} template={template} {...offer} />;
      default:
        return null;
    }
  };

  render() {
    const { offerTemplate } = this.props;
    const { offer } = this.state;
    if (!offer) return null;

    return this.renderOffer(offerTemplate, offer);
  }
}

export default BaseOffer;
