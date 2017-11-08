import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Story from "../Story/Story";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: []
    }
  }

  componentDidMount() {
    fetch('/stories')
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

export default App;
