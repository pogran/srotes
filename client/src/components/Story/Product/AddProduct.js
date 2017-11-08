import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      create: false,
      form: {
        name: '',
        count: 0,
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  handleClick = () => {
    this.setState({...this.state,
      create : !this.state.create,
      form: {
        name: '',
        count: 0
      }
    })
  };

  handleInputChange(event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({...this.state,
      form: {...this.state.form,
        [name]: value
      }
    });
  }

  handleCreate = () => {
    const {addProduct} = this.props;

    if(this.state.form.name) {
      addProduct({...this.state.form,
        count: parseInt(this.state.form.count, 10)
      });
    }

    this.handleClick();
  }

  // onKeyUp = (event) => {
  //   console.log('ev', event.key );
  //   console.log('refs',this.refs.number.value);
  //   if(this.refs.number.value > 99) {
  //     this.refs.number.value = this.refs.number.value.slice(0, -1);
  //   }
  // }

  onKeyPress = (event) => {
    let reg = new RegExp('^[0-9]$');
    if(!reg.test(event.key)) {
      event.preventDefault();
      return;
    }

    let number = Number(this.refs.number.value + event.key);
    if(number > 99) {
      event.preventDefault();
    }
  };

  renderForm() {
    return (
      <div className="row pb-2 text-left">
        <div className="col-md-6">
          <input onChange={this.handleInputChange} placeholder="Product name" id="product-name" name="name" className="form-control" type="text" />
        </div>
        <div className="col-md-3">
          <input ref="number"
                 //pattern="^\d+$"
                 onKeyPress={e =>  this.onKeyPress(e)}
                 onChange={this.handleInputChange}
                 placeholder="0"
                 id="product-count"
                 max={99}
                 min={0}
                 name="count"
                 className="form-control"
                 type="number"
          />
        </div>
        <div className="pl-0 text-right">
          <button onClick={this.handleClick} type="button" className="btn btn-danger mr-1">
            <i className="fa fa-times" aria-hidden="true"/>
          </button>
          <button onClick={this.handleCreate} type="button" className="btn btn-success">
            <i className="fa fa-check" aria-hidden="true"/>
          </button>
        </div>
      </div>
    );
  }

  renderButton() {
    return (
      <div className="text-right">
        <button type="button"
                className="btn btn-primary add mr-1"
                onClick={this.handleClick}
        >
          <i className="fa fa-plus" aria-hidden="true"/>
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="card-top-block">
        {this.state.create && this.renderForm()}
        {!this.state.create && this.renderButton()}
      </div>
    );
  }
}

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
};

export default AddProduct;
