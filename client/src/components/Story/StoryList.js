import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Story from "./Story";

class StoryList extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextState, nextProps) {
    return nextProps.stores.length !== this.props.stores
  }

  render() {
    console.log('render stores list');
    return this.props.stores.map((story, index) => {
        return <Story products={story.products} key={index}  />
    });
  }
}

StoryList.PropTypes = {
  stores: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    stores: state.store.stores
  }
};

export default connect(mapStateToProps, null)(StoryList);
