import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Story from "./Story";

class StoryList extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.stores.length !== this.props.stores.length;
  }

  render() {
    console.log('render stores list');
    return this.props.stores.map((story) => {
        return <Story id={story.id} key={story.id}  />
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
