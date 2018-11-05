import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DefaultOffer extends Component {
  render() {
    return (
      <div className="oppuz-box-products">
        <div className="oppuz-inner-box-products">
          <a
            href={this.props.url}
            className="oppuz-link-destino"
            target="_blank"
          >
            <div className="oppuz-product-img">
              <img
                src={this.props.img}
                alt={this.props.name}
                title={this.props.name}
              />
            </div>

            <div className="oppuz-showcase-infos">
              <div className={'oppuz-tag ' + this.props.category} />
              <div className="oppuz-showcase-info-name">
                <span className="oppuz-name">{this.props.name}</span>
              </div>

              {this.props.menus && (
                <div className="oppuz-showcase-info-description">
                  <ul className="oppuz-itens">
                    {this.props.menus
                      .filter(menu => menu)
                      // .flat()
                      .map((menu, index) => <li key={index}>{menu}</li>)}
                  </ul>
                </div>
              )}
              {this.props.listPrice && (
                <div className="oppuz-price-info">
                  <div className="oppuz-a-partir">
                    <span>{this.props.listPriceText}</span>
                  </div>
                  <div className="oppuz-div-price">
                    <span className="oppuz-rs">
                      {this.props.currency}{' '}
                      <span className="oppuz-price">
                        {this.props.listPrice}
                      </span>
                    </span>
                  </div>
                </div>
              )}
              <div className="oppuz-price-info">
                <div className="oppuz-a-partir">
                  <span>{this.props.priceText}</span>
                </div>
                <div className="oppuz-div-price">
                  <span className="oppuz-rs">
                    {this.props.currency}{' '}
                    <span className="oppuz-price">{this.props.price}</span>
                  </span>
                </div>
              </div>
              <div className="oppuz-installments">
                <span>
                  {this.props.installmentsText}{' '}
                  <span>{this.props.installments}</span>
                </span>
              </div>
              <div className="oppuz-bt-ver-detalhes">
                {this.props.buttonText}
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

DefaultOffer.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
  // installments: PropTypes.number
};

export default DefaultOffer;
