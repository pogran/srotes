import React, { Component } from 'react';
import logo from './logo.svg';
//import logo from './header_logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import StoryList from "../Story/StoryList";
import PropTypes from 'prop-types';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    }
  }

  static childContextTypes = {
    user: PropTypes.string.isRequired
  }

  getChildContext() {
    return {
      user: 'Test'
    }
  }

  componentDidMount() {
    const that = this;
    this.props.loadStores()
        .then(() => {})
        .catch(error => {
          that.setState({...that.state, error})
        });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    console.log('render App', this.props.stories);
    const {loading} = this.props;

    const loader = <div className='m-4'>
      <i className="fa fa-spinner fa-spin fa-3x fa-fw"/>
      <span className="sr-only">Loading...</span>
    </div>;

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
                  Stores
                </div>
                {(loading && loader) || ''}
                {this.state.error && <div className="m-4 alert alert-danger" role="alert">
                  <strong>Error!</strong> {this.state.error}
                </div>}
                {(!loading && !this.state.error && <StoryList/>) || ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

App.PropTypes = {
    loadStores: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default App;
