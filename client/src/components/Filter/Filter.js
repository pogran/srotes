import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {filterProduct, searchProduct} from "../../actions/actions";
import debounce from 'debounce';

class Filter extends Component {
    static propTypes = {
        filterProduct: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        this.search = debounce(event => {
            const {searchProduct} = this.props;
            const target = event.target;
            searchProduct(target.value);
        }, 500);
    }

    handleInputChange = event => {
        event.persist();
        this.search(event);
    }

    render() {
        return (<div className='mb-3'>
            <input onChange={this.handleInputChange} placeholder="Product search" id="product-search" name="name" className="form-control" type="text" />
        </div>);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        filterProduct: (name) => dispatch(filterProduct(name)),
        searchProduct: (name) => dispatch(searchProduct(name))
    }
}

export default connect(null,mapDispatchToProps)(Filter);