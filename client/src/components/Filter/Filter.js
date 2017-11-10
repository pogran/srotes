import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {filterProduct} from "../../actions/actions";

class Filter extends Component {
    static propTypes = {
        filterProduct: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        this.props.filterProduct(target.value);
    }

    render() {
        return (<div className='mb-3'>
            <input onChange={this.handleInputChange} placeholder="Product search" id="product-search" name="name" className="form-control" type="text" />
        </div>);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        filterProduct: (name) => dispatch(filterProduct(name))
    }
}

export default connect(null,mapDispatchToProps)(Filter);