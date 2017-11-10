import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Product from "../Product/Product";
import AddProduct from "../Product/AddProduct";
import _ from 'lodash';
import {addProduct, updateProductData} from "../../actions/actions";

class Story extends Component {
  static propTypes = {
      products: PropTypes.object.isRequired,
      id: PropTypes.number.isRequired,
      updateProductData: PropTypes.func.isRequired,
      filterName: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.addProduct = this.addProduct.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    //return nextProps.products.length !== this.props.products.length || nextProps.filterName !== this.props.filterName;
  }

  addProduct = (data) => {
    this.props.addProduct(this.props.id, data);
  };

  updateProduct = product => {
    const {updateProductData, id} = this.props;
    updateProductData(id, product);
  }

  render() {
    console.log('re-render story', this.props.products);

    const {products, filterName} = this.props;

    const listProducts = _.values(products)
        .filter(product => product.name.indexOf(filterName) !== -1)
        .map(data => {
          return <Product updateProduct={data => this.updateProduct(data)}
                          data={data}
                          key={data.id}
          />
      });

    if(!listProducts.length && filterName) {
      return null;
    }

    return (
      <div className="card-block store p-3">
        <AddProduct addProduct={data => this.addProduct(data)} />
        <div className="card">
          <div className="card-block p-4">
            {!listProducts.length && <p>Products not found</p>}
            {(listProducts.length && listProducts) || ''}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let index = _.findIndex(state.store.stores, value => value.id === ownProps.id);
  return {
    products: index !== -1 ? state.store.stores[index].products : []
  };
};

const mapDispatchToProps = dispatch => {
  return {
      updateProductData: (storeId, data) => dispatch(updateProductData(storeId, data)),
      addProduct: (storeId, data) => dispatch(addProduct(storeId, data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Story);
