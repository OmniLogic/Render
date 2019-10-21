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
  next(null, input != undefined ? `${input}${suffix}` : '');
});

jsont.use('prefix', function(input, preffix, next) {
  if (input != undefined)
    next(null, input != undefined ? `${preffix}${input}` : '');
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

// jsont.use('setDate', function(input, format, next) {
//   console.log(input);
//   console.log(format);
//   // const date = dayjs(input);
//   // let timezoneOffset = new Date(date).getTimezoneOffset();
//   // next(
//   //   null,
//   //   dayjs(date)
//   //     .add(timezoneOffset, 'minutes')
//   //     .format(format)
//   // );
// });

jsont.use('toTittle', function(input, next) {
  let title = '';
  switch (input) {
    case 'dynamic_package':
      title = 'Passagem aérea + Hotel';
      break;
    default:
      title = '';
      break;
  }
  next(null, title);
});

jsont.use('RoundTripIndicator', function(roundTrip, next) {
  if (roundTrip != undefined)
    next(null, roundTrip ? 'Ida e volta' : 'Somente Ida');
  else next(null, '');
});

class BaseOffer extends Component {
  state = {
    offer: null
  };

  constructor(props) {
    super(props);
    const { offerTemplate, offer } = this.props;
    jsont.render(offerTemplate.fields, offer, (err, out) => {
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
    // console.log(prevProps);
    // console.log(prevState);
    // console.log(this.props);
    if (
      !deepEqual(prevProps.offerTemplate, this.props.offerTemplate) //||
      // !deepEqual(prevProps.offer.category_name, this.props.offer.category_name)
    )
      console.log('update') || this.formatOffer();
  }

  formatOffer = () => {
    const { offerTemplate, offer } = this.props;
    jsont.render(offerTemplate.fields, offer, (err, out) => {
      if (err) console.error(err);
      this.setState({ offer: { ...out } });
    });
  };

  renderOffer = (offerTemplate, offer) => {
    const { type, template } = offerTemplate;
    switch (type) {
      case 'default':
        return <DefaultOffer key={offer.id} template={template} {...offer} />;
      case 'commented_showcase':
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
