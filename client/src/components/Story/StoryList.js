import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Story from "./Story";

class StoryList extends Component {
  static propTypes = {
    stores: PropTypes.array.isRequired,
    filterName: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.stores.length !== this.props.stores.length || nextProps.filterName !== this.props.filterName;
  }

  render() {
    console.log('render stores list');
    return this.props.stores.map((story) => {
        return <Story filterName={this.props.filterName} id={story.id} key={story.id}  />
    });
  }
}

const mapStateToProps = state => {
  return {
    stores: state.store.stores,
    filterName: state.store.filterName
  }
};

export default connect(mapStateToProps, null)(StoryList);
