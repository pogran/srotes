import React, { Component } from 'react';
import logo from './logo.svg';
//import logo from './header_logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Story from "../Story/Story";
import config from "../../../../config/config";
import PropTypes from 'prop-types';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    }
  }

  componentDidMount() {
    this.props.loadStores();
    fetch(`${config.SERVER_API}/stories`)
      .then(res => res.json())
      .then(stories => this.setState({ stories }));
  }

  render() {
    const {stories} = this.state;

    const StoryList = stories.map((story, index) => {
      return <Story products={story.products} key={index}  />
    });

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="main">
          <div className="row justify-content-md-center">
            <div className="col-md-4 mt-sm-5">
              <div className="card stores">
                <div className="card-header">
                  Stories
                </div>
                {(stories.length && StoryList) || ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.PropTypes = {
    loadStores: PropTypes.func.isRequired
};

export default App;
