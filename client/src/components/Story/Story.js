import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Product from "./Product/Product";
import AddProduct from "./Product/AddProduct";

class Story extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: props.products
    };

    this.addProduct = this.addProduct.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.products.length !== this.state.products.length;
  }

  addProduct = (data) => {
    data.id = this.state.products.length + 1;

    this.setState({...this.state,
    products: [...this.state.products, data]
    })
  };

  updateProduct = (data) => {
    let index = this.state.products.findIndex(x=> x.id === data.id);
    if (index === -1) {
      // handle error
    } else {
      this.setState({...this.state,
        products: [
          ...this.state.products.slice(0, index),
          {...this.state.products[index], count: data.count},
          ...this.state.products.slice(index + 1)
        ]});
    }
  }

  render() {
    console.log('re-render story', this.state);

    const {products} = this.state;

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

Story.PropTypes = {
  products: PropTypes.array.isRequired
}

export default Story;
