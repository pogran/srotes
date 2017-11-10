import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Product from "../Product/Product";
import AddProduct from "../Product/AddProduct";
import _ from 'lodash';
import {addProduct, updateProductData} from "../../actions/actions";

class Story extends Component {
  constructor(props) {
    super(props);

    this.addProduct = this.addProduct.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    //return nextProps.products.length !== this.props.products.length;
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

    const {products} = this.props;

    const listProducts = products.map(data => {
      return <Product updateProduct={data => this.updateProduct(data)}
                      data={data}
                      key={data.id}
      />
    });

    return (
      <div className="card-block store p-3">
        <AddProduct addProduct={data => this.addProduct(data)} />
        <div className="card">
          <div className="card-block p-4">
            {!products.length && <p>Products not found</p>}
            {(products.length && listProducts) || ''}
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

Story.PropTypes = {
  products: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  updateProductData: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Story);
