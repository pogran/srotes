import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
  constructor(props) {
    super(props);

    this.handleClickMinus = this.handleClickMinus.bind(this);
    this.handleClickPlus = this.handleClickPlus.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  }

  handleClickPlus = () => {
    if(this.props.data.count >= 99) {
      return;
    }

    this.sendProductData(this.props.data.count + 1);
  }

  handleClickMinus = () => {
    if(this.props.data.count <= 0) {
      return;
    }

    this.sendProductData(this.props.data.count - 1);
  }

  sendProductData = (count) => {
    this.props.updateProduct({...this.props.data,
        count
    });
  }

  render() {
    const {count, name} = this.props.data;

    console.log('re-render product', this.props.data);

    return (
      <div className="form-inline mb-2 row">
        <label htmlFor="test" className="col-md-6 col-form-label">{name}</label>
        <div className="row col-md-6 form-group">
          <button onClick={this.handleClickMinus} type="button" className="btn btn-outline-danger">
            <i className="fa fa-minus" aria-hidden="true"/>
          </button>
          <span className="mr-2 ml-2 col-md-4">{count}</span>
          <button onClick={this.handleClickPlus} type="button" className="btn btn-outline-success">
            <i className="fa fa-plus" aria-hidden="true"/>
          </button>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  updateProduct: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default Product;
